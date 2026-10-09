import React from 'react';
import './Navbar.css';

const Navbar = ({ onLogout, user = { name: 'Admin', role: 'Admin' } }) => {
  const initial = user.name ? user.name.charAt(0).toUpperCase() : 'A';
  return (
    <nav className="navbar glass-panel">
      <div className="navbar-container">
        <div className="navbar-logo">
          <div className="logo-icon">EM</div>
          <span className="logo-text gradient-text">Employee Portal</span>
        </div>
        <div className="navbar-profile" style={{ cursor: 'pointer' }} onClick={onLogout}>
          <div className="avatar">{initial}</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span>{user.name}</span>
            <span style={{ fontSize: '11px', color: '#8b949e' }}>{user.role}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
