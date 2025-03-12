import { useState } from 'react';
import axios from 'axios';

function OrderForm() {
  const [formData, setFormData] = useState({
    products: [{ name: '', price: 0, quantity: 1 }],
    totalAmount: 0,
  });
  const [message, setMessage] = useState('');

  const handleChange = (index, e) => {
    const newProducts = [...formData.products];
    newProducts[index][e.target.name] = e.target.value;
    setFormData({ ...formData, products: newProducts, totalAmount: calculateTotal(newProducts) });
  };

  const calculateTotal = (products) => {
    return products.reduce((total, product) => total + (product.price * product.quantity), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/orders', formData, {
        withCredentials: true, // Ensure cookies are sent
      });
      setMessage('Order created successfully!');
      console.log('Order response:', response.data);
      setFormData({ products: [{ name: '', price: 0, quantity: 1 }], totalAmount: 0 });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to create order');
      console.log('Error creating order:', error.response?.data, 'Status:', error.response?.status);
    }
  };

  const addProduct = () => {
    setFormData({
      ...formData,
      products: [...formData.products, { name: '', price: 0, quantity: 1 }],
    });
  };

  return (
    <div>
      <h2>Create Order</h2>
      <form onSubmit={handleSubmit}>
        {formData.products.map((product, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={(e) => handleChange(index, e)}
              placeholder="Product Name"
              required
            />
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={(e) => handleChange(index, e)}
              placeholder="Price"
              step="0.01"
              required
            />
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={(e) => handleChange(index, e)}
              placeholder="Quantity"
              min="1"
              required
            />
            {index === formData.products.length - 1 && (
              <button type="button" onClick={addProduct}>Add Product</button>
            )}
          </div>
        ))}
        <p><strong>Total Amount:</strong> ${formData.totalAmount}</p>
        <button type="submit">Create Order</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default OrderForm;