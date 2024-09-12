import React, { useState } from 'react';
import axios from 'axios';
import Register from './Register';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });
      
      const {username}= response.data
      navigate('/home',{state:{username}})
      //console.log('Login successful:', response.data);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  if (showRegister) {
    return <Register />;
  }
  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
      </form>
      <p>Dont have an account?<button onClick={() => setShowRegister(true)}>register</button></p>
    </div>
  );
};

export default Login;
