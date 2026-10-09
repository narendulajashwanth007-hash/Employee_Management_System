import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    // Route to user portal for new registrants
    navigate('/user/dashboard');
  };

  return (
    <div className="auth-content">
      <div className="auth-header">
        <h2>Create Account</h2>
        <p>Join us and manage your team</p>
      </div>

      <form className="auth-form" onSubmit={handleRegister}>
        <div className="form-group input-container">
          <label htmlFor="name">Full Name</label>
          <input 
            type="text" 
            id="name" 
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="auth-input"
          />
        </div>

        <div className="form-group input-container">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-input"
          />
        </div>

        <div className="form-group input-container">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
          />
        </div>

        <div className="form-group input-container">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="auth-input"
          />
        </div>

        <button type="submit" className="auth-button">
          Register
        </button>
      </form>

      <div className="auth-footer">
        <p>Already have an account? <Link to="/signin">Sign in</Link></p>
      </div>
    </div>
  );
};

export default Register;
