// import React, { useContext, useState } from "react";
// import "./PlaceOrder.css";
// import { StoreContext } from "../../Context/StoreContext";
// import axios from "axios";

// const PlaceOrder = () => {
//   const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: ""
//   });

//   const onChangeHandler = (event) => {
//     const { name, value } = event.target;
//     setData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const placeOrder = async (event) => {
//     event.preventDefault();
//     let orderItems = [];
//     food_list.forEach((item) => {
//       if (cartItems[item._id] > 0) {
//         let itemInfo = { ...item, quantity: cartItems[item._id] };
//         orderItems.push(itemInfo);
//       }
//     });

//     let orderData = {
//       address: data,
//       items: orderItems,
//       amount: getTotalCartAmount() + 2
//     };

//     try {
//       // 1. Create the order on your backend
//       const response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
      
//       if (response.data.success) {
//         // 2. Use Razorpay order ID to initiate payment
//         const { order_id } = response.data;

//         const options = {
//           key: "rzp_test_RsuMzhkOoUgPsq", // Replace with your Razorpay key ID
//           amount: (getTotalCartAmount() + 2) * 100, // Amount in paise
//           currency: "INR",
//           name: "Your Store Name",
//           description: "Order Payment",
//           order_id: order_id, // Razorpay Order ID from backend
//           handler: function (response) {
//             // Handle successful payment
//             alert("Payment successful! Thank you for your order.");
//             window.location.replace(response.data.order_url);
//           },
//           prefill: {
//             name: `${data.firstName} ${data.lastName}`,
//             email: data.email,
//             contact: data.phone,
//           },
//           theme: { color: "#3399cc" },
//         };

//         const rzp = new window.Razorpay(options);
//         rzp.open();
//       } else {
//         alert("Error placing the order.");
//       }
//     } catch (error) {
//       console.error("Order placement error:", error);
//       alert("An error occurred while placing the order.");
//     }
//   };

//   return (
//     <form onSubmit={placeOrder} className="place-order">
//       <div className="placeorder-left">
//         <p>Delivery Information</p>
//         <div className="multi-fields">
//           <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" />
//           <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" />
//         </div>
//         <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email Address" />
//         <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
//         <div className="multi-fields">
//           <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
//           <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
//         </div>
//         <div className="multi-fields">
//           <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip Code" />
//           <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
//         </div>
//         <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
//       </div>
//       <div className="placeorder-right">
//         <div className="cart-total">
//           <h2>Cart Total</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>Subtotal</p>
//               <p>₹{getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
//             </div>
//           </div>
//           <button type="submit">PROCEED TO PAYMENT</button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;


import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadRazorpay = async () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    };
    loadRazorpay();
  }, []);

  useEffect(()=>{
    if (!token) {
      navigate("/cart")
    }
    else if(getTotalCartAmount === 0){
        navigate("/cart")
    }
  },[token])
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    if (getTotalCartAmount() === 0) {
      alert("Your cart is empty. Please add items before proceeding.");
      return;
    }

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: `${data.street}, ${data.city}, ${data.state}, ${data.zipcode}, ${data.country}`
      },
      items: orderItems,
      amount: getTotalCartAmount() + 2
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
      
      if (response.data.success) {
        const { order_id, amount, key } = response.data;

        const options = {
          key: key,
          amount: amount,
          currency: "INR",
          name: "Your Store Name",
          description: "Order Payment",
          order_id: order_id,
          handler: async function (response) {
            try {
              const verifyResponse = await axios.post(`${url}/api/order/verify`, response, { headers: { token } });
              if (verifyResponse.data.success) {
                alert("Payment successful! Thank you for your order.");
                navigate('/');
              } else {
                alert("Payment verification failed. Please contact support.");
              }
            } catch (error) {
              console.error("Payment verification error:", error);
              alert("An error occurred while verifying the payment.");
            }
          },
          prefill: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            contact: data.phone,
          },
          theme: { color: "#3399cc" },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        alert("Error placing the order.");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("An error occurred while placing the order.");
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="placeorder-left">
        <p>Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" />
        </div>
        <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email Address" />
        <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip Code" />
          <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
      </div>
      <div className="placeorder-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;





