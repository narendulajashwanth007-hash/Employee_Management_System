import axios from 'axios';

const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && envUrl.trim()) {
    const trimmed = envUrl.trim().replace(/\/+$/, '');
    return trimmed.endsWith('/api/employees') ? trimmed : `${trimmed}/api/employees`;
  }
  return 'http://localhost:8081/api/employees';
};

const API_BASE_URL = getBaseUrl();

// Use a configured axios instance if needed
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

class EmployeeService {
  getAllEmployees() {
    return api.get('');
  }

  getEmployeeById(employeeId) {
    return api.get(`/${employeeId}`);
  }

  createEmployee(employee) {
    return api.post('', employee);
  }

  updateEmployee(employeeId, employee) {
    return api.put(`/${employeeId}`, employee);
  }

  deleteEmployee(employeeId) {
    return api.delete(`/${employeeId}`);
  }

  searchEmployees(keyword) {
    return api.get(`/search?keyword=${encodeURIComponent(keyword)}`);
  }

  getEmployeesByDepartment(department) {
    return api.get(`/department/${encodeURIComponent(department)}`);
  }
}

export default new EmployeeService();
