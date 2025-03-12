import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [cookies] = useCookies(['token']);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfileAndOrders = async () => {
      try {
        console.log('Cookies:', cookies);
        console.log('Fetching profile from:', 'http://localhost:5000/api/auth/profile');
        const profileResponse = await axios.get('http://localhost:5000/api/auth/profile', {
          withCredentials: true,
        });
        console.log('Profile response:', profileResponse.data);
        setUser(profileResponse.data.user);

        console.log('Fetching orders from:', 'http://localhost:5000/api/orders');
        const ordersResponse = await axios.get('http://localhost:5000/api/orders', {
          withCredentials: true,
        });
        console.log('Orders response:', ordersResponse.data);
        setOrders(ordersResponse.data);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Please log in to view profile');
        console.log('Error fetching data:', error.response?.data, 'Status:', error.response?.status);
      }
    };
    fetchProfileAndOrders();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <div>
          <h3>User Information</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>ID:</strong> {user.id}</p>
          <button onClick={async () => {
            await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
            window.location.href = '/login';
          }}>Logout</button>

          <h3>Your Orders</h3>
          {orders.length > 0 ? (
            <ul>
              {orders.map((order) => (
                <li key={order._id}>
                  <p><strong>Order ID:</strong> {order._id}</p>
                  <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
                  <p><strong>Status:</strong> {order.status}</p>
                  <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                  <h4>Products:</h4>
                  <ul>
                    {order.products.map((product, index) => (
                      <li key={index}>
                        {product.name} - ${product.price} x {product.quantity}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders found. <Link to="/order">Create an order</Link>.</p>
          )}
        </div>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
}

export default Profile;