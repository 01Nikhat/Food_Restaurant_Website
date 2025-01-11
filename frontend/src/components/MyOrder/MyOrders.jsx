import React, { useEffect, useState, useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { url, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/order/userorders`, { 
        headers: { 
          token: token,
          'Content-Type': 'application/json'
        }
      });
      setOrders(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to fetch orders. Please try again.");
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
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
            <li key={order._id}>
              <h3>Order ID: {order._id}</h3>
              <p>Date: {new Date(order.date).toLocaleString()}</p>
              <p>Status: {order.status}</p>
              <p>Total Amount: ₹{order.amount}</p>
              <h4>Items:</h4>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MyOrders

