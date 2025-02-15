


import dotenv from 'dotenv';
import Razorpay from "razorpay";
import orderModel from "../models/orderModel.js";

import userModel from "../models/userModel.js";
import crypto from 'crypto';


// Load environment variables from .env file
dotenv.config();

// Log the values to check if the keys are being loaded correctly
console.log('Razorpay Key ID:', process.env.RAZORPAY_KEY_ID);
console.log('Razorpay Key Secret:', process.env.RAZORPAY_KEY_SECRET);
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID ,
  key_secret: process.env.RAZORPAY_KEY_SECRET ,
});

const placeOrder = async (req, res) => {
  const frontend_url = process.env.FRONTEND_URL || "http://localhost:5174" ;

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      payment: false,
      status: "Food Processing", // Explicitly set the initial status
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const totalAmount = Math.round(req.body.amount * 100);

    const options = {
      amount: totalAmount,
      currency: "INR",
      receipt: newOrder._id.toString(),
    };

    const order = await razorpay.orders.create(options);

    newOrder.razorpay = { orderId: order.id };
    await newOrder.save();

    res.json({
      success: true,
      order_id: order.id,
      amount: totalAmount,
      key: razorpay.key_id,
      product_name: "Food Order",
      description: "Food Delivery Payment",
      contact: req.body.address.phone,
      name: req.body.address.name,
      email: req.body.address.email,
      address: req.body.address.address,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Error placing order", error: error.message });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
   // console.log("Received payment details:", req.body);

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", razorpay.key_secret)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      const updatedOrder = await orderModel.findOneAndUpdate(
        { "razorpay.orderId": razorpay_order_id },
        {
          $set: {
            payment: true,
            status: "Paid", // Update status to "Paid" after successful payment
            "razorpay.paymentId": razorpay_payment_id,
          },
        },
        { new: true }
      );

      if (!updatedOrder) {
       // console.error("Order not found for Razorpay Order ID:", razorpay_order_id);
        return res.status(404).json({ success: false, message: "Order not found" });
      }

      return res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature sent!" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, message: "Error verifying payment" });
  }
};

const userOrders = async (req, res) => {
 // console.log("Fetching orders for userId:", req.body.userId);

  try {
    const orders = await orderModel.find({ userId: req.body.userId }).sort({ date: -1 });

    if (orders.length === 0) {
      return res.status(404).json({ success: false, message: "No orders found for this user" });
    }

    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// Listing orders for admin panel all the orders for all the users
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error listing orders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API for updating order status
const updateStatus = async (req, res) => {
  try {
    const updatedOrder = await orderModel.findByIdAndUpdate(
      req.body.orderId,
      { status: req.body.status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, message: "Status Updated", order: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//for clear the cart data 

const clearCart = async (req, res) => {
  try {
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} })
    res.json({ success: true, message: "Cart cleared successfully" })
  } catch (error) {
    console.error("Error clearing cart:", error)
    res.status(500).json({ success: false, message: "Error clearing cart" })
  }
}




export { placeOrder, verifyPayment, userOrders, listOrders, updateStatus ,clearCart};