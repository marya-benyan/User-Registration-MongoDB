import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [cookies, setCookie] = useCookies(['token']);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData, {
        withCredentials: true,
      });
      setCookie('token', response.data.token, { path: '/', maxAge: 3600 });
      setMessage('Registration successful! You can now log in.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed');
      console.log('Error registering:', error.response?.data);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;