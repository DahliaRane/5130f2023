// src/components/LoginComponent.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LoginComponent.css'; // Import your custom styles

const LoginComponent = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = () => {
    // Implement your login logic here
    // Check credentials and call onLogin() if successful
    if (username === 'PulseHR' && password === 'PulseHR') {
      onLogin();
      history.push('/'); // Redirect to the main page
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <button type="button" onClick={handleLogin} className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;
