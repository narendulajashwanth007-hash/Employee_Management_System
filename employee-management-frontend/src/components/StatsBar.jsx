import React from 'react';
import './StatsBar.css';

const StatsBar = ({ employees }) => {
  const totalEmployees = employees.length;
  
  const departments = new Set(employees.map(e => e.department)).size;
  
  const totalSalary = employees.reduce((sum, e) => sum + (e.salary || 0), 0);
  const avgSalary = totalEmployees > 0 ? (totalSalary / totalEmployees) : 0;

  return (
    <div className="stats-container animate-slide-up">
      <div className="stat-card glass-panel">
        <div className="stat-icon employees-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        </div>
        <div className="stat-content">
          <h3>Total Employees</h3>
          <p className="stat-value">{totalEmployees}</p>
        </div>
      </div>

      <div className="stat-card glass-panel">
        <div className="stat-icon depts-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
        </div>
        <div className="stat-content">
          <h3>Departments</h3>
          <p className="stat-value">{departments}</p>
        </div>
      </div>

      <div className="stat-card glass-panel">
        <div className="stat-icon salary-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
        </div>
        <div className="stat-content">
          <h3>Average Salary</h3>
          <p className="stat-value">₹{avgSalary.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
