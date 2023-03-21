import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleConsentChange = (event) => {
    setConsentChecked(event.target.checked);
  };

  const handleRegister = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (!consentChecked) {
      setErrorMessage("Please give your consent to register");
      return;
    }

    axios
      .post("/user/register", { email, password })
      .then((response) => {
        // Handle successful registration
        console.log(response);
        setSuccess(true);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Failed to register user");
      });
  };

  if (success) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <form onSubmit={handleRegister} className="register-form">
        <h1>Register</h1>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </label>
        <label className="consent">
          <input
            type="checkbox"
            checked={consentChecked}
            onChange={handleConsentChange}
            required
          />
          <p>I give my consent to register</p>
        </label>
        <br />
        {errorMessage && <div>{errorMessage}</div>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
