import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import StatsBar from '../../components/StatsBar';
import Toolbar from '../../components/Toolbar';
import EmployeeTable from '../../components/EmployeeTable';
import Toast from '../../components/Toast';
import employeeService from '../../services/employeeService';
import '../../App.css'; // Premium custom base styles

function UserDashboard() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Mock logged in user data mimicking the matching employee from DB
  const [userProfile, setUserProfile] = useState({
    name: 'Loading...',
    email: sessionStorage.getItem('userEmail') || '',
    department: '',
    designation: '',
    employeeId: '',
    salary: '',
    joinDate: '',
    role: 'User'
  });

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
      if (response.data && response.data.length > 0) {
        // Try to match the signed-in email with a real employee record
        const loggedInEmail = sessionStorage.getItem('userEmail') || '';
        const matchedEmployee = response.data.find(
          (emp) => emp.email && emp.email.toLowerCase() === loggedInEmail.toLowerCase()
        );
        // Fall back to first employee if no match found
        const profileSource = matchedEmployee || response.data[0];
        setUserProfile({
          name: profileSource.name,
          email: profileSource.email,
          department: profileSource.department,
          designation: profileSource.designation,
          employeeId: profileSource.employeeId || profileSource.id,
          salary: profileSource.salary,
          joinDate: '2023-01-15',
          role: 'User'
        });
      }
    } catch (error) {
      showToast('Backend is not running. Please start the Spring Boot app.', 'error');
      console.error('Failed to load employees:', error);
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

  const handleLogout = () => {
    navigate('/signin');
  };

  const departments = [...new Set(employees.map(e => e.department).filter(Boolean))];

  return (
    <div className="app-container">
      <Navbar onLogout={handleLogout} user={{ name: userProfile.name, role: userProfile.role }} />
      
      <main className="main-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '40px', paddingBottom: '40px', gap: '30px' }}>
        
        {/* Profile Card */}
        <div style={{
          background: 'rgba(22, 27, 34, 0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '40px',
          width: '100%',
          maxWidth: '800px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          <h2 style={{ color: '#fff', fontSize: '28px', marginTop: 0, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
            My Profile
          </h2>

          <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {userProfile.employeeId && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8b949e', fontWeight: 500 }}>Employee ID</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>{userProfile.employeeId}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#8b949e', fontWeight: 500 }}>Full Name</span>
              <span style={{ color: '#fff', fontWeight: 600 }}>{userProfile.name}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#8b949e', fontWeight: 500 }}>Email Address</span>
              <span style={{ color: '#fff', fontWeight: 600 }}>{userProfile.email}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#8b949e', fontWeight: 500 }}>Department</span>
              <span style={{ 
                background: 'rgba(37, 99, 235, 0.2)', 
                color: '#58a6ff', 
                padding: '4px 12px', 
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 600
              }}>
                {userProfile.department || '—'}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#8b949e', fontWeight: 500 }}>Designation</span>
              <span style={{ color: '#fff', fontWeight: 600 }}>{userProfile.designation || '—'}</span>
            </div>

            {userProfile.salary && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8b949e', fontWeight: 500 }}>Salary</span>
                <span style={{ color: '#3fb950', fontWeight: 700 }}>₹{Number(userProfile.salary).toLocaleString('en-IN')}</span>
              </div>
            )}

          </div>

          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <p style={{ color: '#6e7681', fontSize: '13px' }}>If you need to update this information, please contact HR.</p>
          </div>
        </div>

        {/* Directory Section */}
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          <h2 style={{ color: '#fff', fontSize: '24px', marginBottom: '20px' }}>Employee Directory</h2>
          
          <StatsBar employees={employees} />
          
          {/* Omit onAdd so the Add Employee button doesn't show */}
          <Toolbar 
            onSearch={handleSearch} 
            departments={departments}
          />
          
          <EmployeeTable 
            employees={employees} 
            isLoading={isLoading}
            isAdmin={false}
          />
        </div>

      </main>

      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: 'success' })} 
      />
    </div>
  );
}

export default UserDashboard;
