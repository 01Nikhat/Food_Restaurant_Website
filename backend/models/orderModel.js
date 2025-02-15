// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   items: { type: Array, required: true },
//   amount: { type: Number, required: true },
//   address: { type: Object, required: true },
//   status: { type: String, default: "Food Processing" },
//   date: { type: Date, default: Date.now() },
//   payment: { type: Boolean, default: false },
  
// });

// const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

// export default orderModel;

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
  },
  status: { type: String, default: "Food Processing" },
  payment: { type: Boolean, default: false },
  razorpay: {
    orderId: { type: String },
    paymentId: { type: String },
  },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
