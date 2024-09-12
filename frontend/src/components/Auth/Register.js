import React, { useState } from 'react';
import axios from 'axios';
import Login from './Login';
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showLogin,setShowLogin]=useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        username,
        email,
        password,
      });
      // Handle successful registration, e.g., redirect user, show success message, etc.
      console.log('Registration successful:', response.data);
    } catch (err) {
      setError('Registration failed');
    }
  };
  if(showLogin){
    return <Login/>
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        
      </form>
      <p>Already have an account?<button onClick={() => setShowLogin(true)}>register</button></p>
    </div>
  );
};
export default Register;