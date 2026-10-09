import React, { useState, useEffect } from 'react';
import './EmployeeModal.css';

const EmployeeModal = ({ isOpen, onClose, onSave, employee }) => {
  const isEdit = !!employee;
  
  const initialFormState = {
    employeeId: '',
    name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    salary: '',
    joiningDate: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (isEdit) {
        setFormData({ ...employee });
      } else {
        setFormData(initialFormState);
      }
      setErrors({});
    }
  }, [isOpen, employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.employeeId) newErrors.employeeId = 'Employee ID is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (formData.salary && formData.salary < 0) {
      newErrors.salary = 'Salary cannot be negative';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay animate-fade-in">
      <div className="modal-content glass-panel animate-slide-up">
        <div className="modal-header">
          <h2>{isEdit ? 'Edit Employee' : 'Add New Employee'}</h2>
          <button className="close-btn" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Employee ID <span className="required">*</span></label>
              <input 
                type="text" 
                name="employeeId" 
                value={formData.employeeId} 
                onChange={handleChange}
                className={errors.employeeId ? 'error' : ''}
              />
              {errors.employeeId && <span className="error-msg">{errors.employeeId}</span>}
            </div>
            <div className="form-group">
              <label>Full Name <span className="required">*</span></label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-msg">{errors.name}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email <span className="required">*</span></label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input 
                type="text" 
                name="phone" 
                value={formData.phone || ''} 
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Department</label>
              <input 
                type="text" 
                name="department" 
                value={formData.department || ''} 
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Designation</label>
              <input 
                type="text" 
                name="designation" 
                value={formData.designation || ''} 
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Salary</label>
              <input 
                type="number" 
                name="salary" 
                value={formData.salary || ''} 
                onChange={handleChange}
                className={errors.salary ? 'error' : ''}
              />
              {errors.salary && <span className="error-msg">{errors.salary}</span>}
            </div>
            <div className="form-group">
              <label>Joining Date</label>
              <input 
                type="date" 
                name="joiningDate" 
                value={formData.joiningDate || ''} 
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? 'Update Employee' : 'Save Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;
