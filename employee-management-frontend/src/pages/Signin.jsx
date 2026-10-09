import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default to user
  const navigate = useNavigate();

  const handleSignin = (e) => {
    e.preventDefault();
    // Save the logged-in email so dashboards can identify the user
    sessionStorage.setItem('userEmail', email);
    sessionStorage.setItem('userRole', role);
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/user/dashboard');
    }
  };

  return (
    <div className="auth-content">
      <div className="auth-header">
        <h2>Welcome Back</h2>
        <p>Sign in to your account</p>
      </div>

      <form className="auth-form" onSubmit={handleSignin}>
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

        <div className="form-group input-container" style={{ marginTop: '10px' }}>
          <label>Login As</label>
          <div style={{ display: 'flex', gap: '20px', marginTop: '10px', color: '#c9d1d9' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'normal', color: role === 'user' ? '#fff' : '#8b949e' }}>
              <input 
                type="radio" 
                name="role" 
                value="user" 
                checked={role === 'user'} 
                onChange={() => setRole('user')} 
                style={{ accentColor: '#7c3aed' }}
              /> User
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'normal', color: role === 'admin' ? '#fff' : '#8b949e' }}>
              <input 
                type="radio" 
                name="role" 
                value="admin" 
                checked={role === 'admin'} 
                onChange={() => setRole('admin')} 
                style={{ accentColor: '#7c3aed' }}
              /> Administrator
            </label>
          </div>
          <div className="forgot-password" style={{ marginTop: '15px' }}>
            <a href="#">Forgot password?</a>
          </div>
        </div>

        <button type="submit" className="auth-button">
          Sign In
        </button>
      </form>

      <div className="auth-footer">
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
};

export default Signin;
