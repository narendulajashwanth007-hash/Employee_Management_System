import React from 'react';
import { Outlet } from 'react-router-dom';
import './Auth.css';

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      {/* Decorative background elements for premium feel */}
      <div className="auth-bg-shape shape-1"></div>
      <div className="auth-bg-shape shape-2"></div>
      
      <div className="auth-container">
        <div className="auth-card">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
