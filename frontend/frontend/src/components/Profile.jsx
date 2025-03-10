import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function Profile() {
  const [user, setUser] = useState(null);
  const [cookies] = useCookies(['token']);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/auth/profile', { // Use proxy path
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        setMessage('Please log in to view profile');
        console.log('Error fetching profile:', error.response?.data?.message); // Debug
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>ID: {user.id}</p>
        </div>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
}

export default Profile;