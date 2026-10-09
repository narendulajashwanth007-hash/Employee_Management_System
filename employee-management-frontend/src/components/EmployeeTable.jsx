import React from 'react';
import './EmployeeTable.css';

const EmployeeTable = ({ employees, onEdit, onDelete, isLoading, isAdmin = false }) => {
  if (isLoading) {
    return (
      <div className="table-container glass-panel animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading employees...</p>
        </div>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="table-container glass-panel animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          <h3>No employees found</h3>
          <p>Try adjusting your search or add a new employee.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container glass-panel animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <div className="table-responsive">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Email</th>
              <th>Salary</th>
              {isAdmin && <th className="actions-header">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td><span className="badge badge-outline">{emp.employeeId}</span></td>
                <td>
                  <div className="employee-name">
                    <div className="avatar-small">{emp.name.charAt(0)}</div>
                    <span>{emp.name}</span>
                  </div>
                </td>
                <td><span className="badge badge-dept">{emp.department}</span></td>
                <td>{emp.designation}</td>
                <td>{emp.email}</td>
                <td>₹{(emp.salary || 0).toLocaleString('en-IN')}</td>
                {isAdmin && (
                  <td className="actions-cell">
                    <button className="icon-btn edit-btn" onClick={() => onEdit && onEdit(emp)} title="Edit">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button className="icon-btn delete-btn" onClick={() => onDelete && onDelete(emp)} title="Delete">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
