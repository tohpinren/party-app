import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('/user/login', { email, password })
      .then(response => {
        const { token, email } = response.data;
        onLogin(token, email);
      })
      .catch(error => {
        console.error(error);
        setErrorMessage('Email or password is incorrect');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} required />
      </div>
      <button type="submit">Login</button>
      <div>
        <p>Don't have an account?</p>
        <Link to="/register">Register</Link>
      </div>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default LoginForm;