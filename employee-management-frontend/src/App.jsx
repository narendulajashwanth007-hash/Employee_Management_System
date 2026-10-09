import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import AuthLayout from './pages/AuthLayout';
import Signin from './pages/Signin';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
      </Route>
      
      <Route path="/admin">
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Route>

      <Route path="/user">
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* Redirect old dashboard link back to signin since we now need a role to determine dashboard */}
      <Route path="/dashboard" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}

export default App;
