import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import employeeService from '../../services/employeeService';
import Navbar from '../../components/Navbar';
import StatsBar from '../../components/StatsBar';
import Toolbar from '../../components/Toolbar';
import EmployeeTable from '../../components/EmployeeTable';
import EmployeeModal from '../../components/EmployeeModal';
import ConfirmDialog from '../../components/ConfirmDialog';
import Toast from '../../components/Toast';
import '../../App.css'; // Keep existing styles for dashboard

function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  // Delete confirm states
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  
  // Toast state
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const navigate = useNavigate();

  // Initial load
  useEffect(() => {
    loadEmployees();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const loadEmployees = async () => {
    try {
      setIsLoading(true);
      const response = await employeeService.getAllEmployees();
      setEmployees(response.data);
    } catch (error) {
      showToast('Backend is not running. Please start the Spring Boot app.', 'error');
      console.error('Failed to load employees:', error);
      // For demo purposes if backend isn't running, show empty
      setEmployees([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (keyword) => {
    if (!keyword.trim()) {
      loadEmployees();
      return;
    }
    try {
      setIsLoading(true);
      const response = await employeeService.searchEmployees(keyword);
      setEmployees(response.data);
    } catch (error) {
      showToast('Failed to search employees', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const openAddModal = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleSaveEmployee = async (employeeData) => {
    try {
      if (selectedEmployee) {
        // Update
        await employeeService.updateEmployee(selectedEmployee.id, employeeData);
        showToast('Employee updated successfully');
      } else {
        // Create
        await employeeService.createEmployee(employeeData);
        showToast('Employee added successfully');
      }
      setIsModalOpen(false);
      loadEmployees(); // Reload list
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to save employee. ID or Email might already exist.';
      showToast(errorMsg, 'error');
    }
  };

  const confirmDelete = (employee) => {
    setEmployeeToDelete(employee);
    setIsConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!employeeToDelete) return;
    
    try {
      await employeeService.deleteEmployee(employeeToDelete.id);
      showToast('Employee deleted successfully');
      setIsConfirmOpen(false);
      loadEmployees(); // Reload list
    } catch (error) {
      showToast('Failed to delete employee', 'error');
    }
  };

  const handleLogout = () => {
    // Navigate back to signin for now
    navigate('/signin');
  };

  const departments = [...new Set(employees.map(e => e.department).filter(Boolean))];

  return (
    <div className="app-container">
      <Navbar onLogout={handleLogout} />
      
      <main className="main-content">
        <StatsBar employees={employees} />
        
        <Toolbar 
          onSearch={handleSearch} 
          onAdd={openAddModal} 
          departments={departments}
        />
        
        <EmployeeTable 
          employees={employees} 
          isLoading={isLoading}
          onEdit={openEditModal}
          onDelete={confirmDelete}
          isAdmin={true}
        />
      </main>

      <EmployeeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEmployee}
        employee={selectedEmployee}
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Delete Employee"
        message={`Are you sure you want to delete ${employeeToDelete?.name}? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />

      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: 'success' })} 
      />
    </div>
  );
}

export default AdminDashboard;
