// import React, { useEffect, useState, useContext } from 'react';
// import { StoreContext } from '../../context/StoreContext';
// import axios from 'axios';
// import './MyOrder.css';


// const MyOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { url, token } = useContext(StoreContext);
//   console.log("token :" ,token);
  

//   const fetchOrders = async () => {
//     console.log("entering ");
    
//     try {

//       if (!token) {
//         console.log("No token available");
//       }
//       setLoading(true);
      
      
//       const response = await axios.get(`${url}/api/order/userorders`, { 
//         headers: { 
//           token: token,
//           'Content-Type': 'application/json'
//         }
//       });
//       console.log("Fetched Orders:", response.data.data); // Check API response
//       setOrders([...response.data.data]);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       setError('Failed to fetch orders. Please try again.');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       fetchOrders();
//     }
   
//   }, [token, url]);

//   if (loading) return <div>Loading orders...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="my-orders">
//       <h2>My Orders</h2>
//       {orders.length === 0 ? (
//         <p>You haven't placed any orders yet.</p>
//       ) : (
//         <ul>
//           {orders.map((order) => (
//             <li key={order._id} className="order-item">
//               {/* First Row */}
//               <div className="order-row">
//                 <h3>Order ID: {order._id}</h3>
//                 <p className="order-status">
//                   <span className="status-dot"></span>
//                   Status: <span className={`status ${order.status.toLowerCase().replace(' ', '-')}`}>{order.status}</span>
//                 </p>
//               </div>

//               {/* Second Row */}
//               <div className="order-row">
//                 <p>Delivery Address: {order.address.address}</p>
//               </div>

//               {/* Third Row */}
//               <div className="order-items">
//                 <h4>Items:</h4>
//                 <ul>
//                   {order.items.map((item, index) => (
//                     <li key={index} className="order-item-detail">
//                       {item.name} - Quantity: {item.quantity} - Price: ₹{item.price}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Fourth Row */}
//               <div className="order-row">
//                 <p className="order-amount">Total Amount: ₹{order.amount}</p>
//                 <button className="order-button">Track Order</button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default MyOrders;


import React, { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import './MyOrder.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { url, token } = useContext(StoreContext);

  // Prevent token from logging on every render
  useEffect(() => {
    if (token) {
      console.log("Token available:", token); // Log once when token is available
    } else {
      console.log("Token is missing");
    }
  }, [token]);

  const fetchOrders = async () => {
    if (!token) {
      console.log("No token available");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/order/userorders`, { 
        headers: { 
          token: token,
          'Content-Type': 'application/json'
        }
      });
      console.log("Fetched Orders:", response.data.data); // Check API response
      setOrders(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to fetch orders. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();  // Fetch orders if the token is available
    } else {
      setLoading(false);  // Stop loading if no token
    }

    // Poll every 30 seconds to check for updated order status
    const interval = setInterval(() => {
      if (token) {
        fetchOrders();
      }
    }, 30000);  // Adjust the interval time (in milliseconds)

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [token, url]);

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id} className="order-item">
              {/* Order Details */}
              <div className="order-row">
                <h3>Order ID: {order._id}</h3>
                <p className="order-status">
                  <span className="status-dot"></span>
                  Status: <span className={`status ${order.status.toLowerCase().replace(' ', '-')}`}>{order.status}</span>
                </p>
              </div>

              <div className="order-row">
                <p>Delivery Address: {order.address.address}</p>
              </div>

              <div className="order-items">
                <h4>Items:</h4>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index} className="order-item-detail">
                      {item.name} - Quantity: {item.quantity} - Price: ₹{item.price}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="order-row">
                <p className="order-amount">Total Amount: ₹{order.amount}</p>
                <button className="order-button">Track Order</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;


