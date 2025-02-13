// import React, { useEffect, useState } from 'react';
// import "./Order.css";
// import {toast } from 'react-toastify';
// import axios from "axios";
// import parcel_icon from "../../assets/parcel_icon.png"


// const Order = ({url}) => {

//   const [orders,setOrders] = useState([]);

//   const fetchAllOrders = async() =>{
//       const response = await axios.get(url+"/api/order/list");
//       if (response.data.success) {
//         setOrders(response.data.data);
//         console.log(response.data.data);
        
//       }
//       else{
//         toast.error("error")
//       }
//   }

// const statusHandler = async(event,orderId)=>{
//     console.log(event,orderId);
//     const response = await axios.post(url+"/api/order/status",{
//         orderId,
//         status: event.target.value
//     })

//     if (response.data.success) {
//       await fetchAllOrders();
//     }
    
// }

//   useEffect(()=>{
//     fetchAllOrders();
//   },[])

//   return (
//     <div className='order add'>
//     <h3>Order Page</h3>
//     <div className='order-list'>
//       {orders.map((order, index) => (
//         <div key={index} className="order-item">
//           <img src={parcel_icon} alt="" />
//           <div>
//             <p className='order-item-food'>
//               {order.items.map((item,index)=>{
//                 if (index === order.items.length -1) {
//                   return item.name + " × " + item.quantity
//                 }
//                 else{
//                    return item.name + " × " + item.quantity + ", "
//                 }
//               })}
//             </p>
//             <p className='order-item-name'>{order.address.name}</p>
//             <div className='order-item-address'>
//               <p >{order.address.address}</p>
//             </div>
           
//               <p className='order-item-phone'>{order.address.phone}</p>
//           </div>
//           <p>Items:{order.items.length}</p>
//           <p>₹ {order.amount}</p>
//           <select onChange={(event)=>statusHandler(event,order._id) } value={order.status}>
//             <option value="Food Processing">Food Processing</option>
//             <option value="Out For Delivery">Out For Delivery</option>
//             <option value="Delivered">Delivered</option>
//           </select>
          
//         </div>
//       ))}
//     </div>
//   </div>
  
//   )
// }

// export default Order

import React, { useEffect, useState } from 'react';
import "./Order.css";
import { toast } from 'react-toastify';
import axios from "axios";
import parcel_icon from "../../assets/parcel_icon.png"

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        throw new Error(response.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError(error.response?.data?.message || error.message || "An error occurred while fetching orders");
      toast.error(error.response?.data?.message || error.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value
      });

      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Order status updated successfully");
      } else {
        throw new Error(response.data.message || "Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error(error.response?.data?.message || error.message || "Error updating order status");
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [url]);

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " × " + item.quantity
                  } else {
                    return item.name + " × " + item.quantity + ", "
                  }
                })}
              </p>
              <p className='order-item-name'>{order.address.name}</p>
              <div className='order-item-address'>
                <p>{order.address.address}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items:{order.items.length}</p>
            <p>₹ {order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order

