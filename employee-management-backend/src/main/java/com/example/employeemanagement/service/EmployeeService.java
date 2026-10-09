package com.example.employeemanagement.service;

import com.example.employeemanagement.entity.Employee;
import com.example.employeemanagement.exception.DuplicateResourceException;
import com.example.employeemanagement.exception.ResourceNotFoundException;
import com.example.employeemanagement.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    // Constructor injection (recommended over @Autowired on field)
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    // Create a new employee
    public Employee createEmployee(Employee employee) {
        // Check for duplicate employee ID
        if (employeeRepository.existsByEmployeeId(employee.getEmployeeId())) {
            throw new DuplicateResourceException(
                    "Employee ID '" + employee.getEmployeeId() + "' already exists");
        }
        // Check for duplicate email
        if (employeeRepository.existsByEmail(employee.getEmail())) {
            throw new DuplicateResourceException(
                    "Email '" + employee.getEmail() + "' already exists");
        }
        return employeeRepository.save(employee);
    }

    // Get all employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Get employee by ID
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Employee not found with id: " + id));
    }

    // Update an existing employee
    public Employee updateEmployee(Long id, Employee updatedEmployee) {
        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Employee not found with id: " + id));

        // Check for duplicate employee ID (belonging to a different record)
        if (employeeRepository.existsByEmployeeIdAndIdNot(updatedEmployee.getEmployeeId(), id)) {
            throw new DuplicateResourceException(
                    "Employee ID '" + updatedEmployee.getEmployeeId() + "' already exists");
        }

        // Check for duplicate email (belonging to a different record)
        if (employeeRepository.existsByEmailAndIdNot(updatedEmployee.getEmail(), id)) {
            throw new DuplicateResourceException(
                    "Email '" + updatedEmployee.getEmail() + "' already exists");
        }

        // Update fields
        existingEmployee.setEmployeeId(updatedEmployee.getEmployeeId());
        existingEmployee.setName(updatedEmployee.getName());
        existingEmployee.setEmail(updatedEmployee.getEmail());
        existingEmployee.setPhone(updatedEmployee.getPhone());
        existingEmployee.setDepartment(updatedEmployee.getDepartment());
        existingEmployee.setDesignation(updatedEmployee.getDesignation());
        existingEmployee.setSalary(updatedEmployee.getSalary());
        existingEmployee.setJoiningDate(updatedEmployee.getJoiningDate());

        return employeeRepository.save(existingEmployee);
    }

    // Delete an employee
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Employee not found with id: " + id));
        employeeRepository.delete(employee);
    }

    // Search employees by keyword (name, employeeId, email, or department)
    public List<Employee> searchEmployees(String keyword) {
        return employeeRepository.searchEmployees(keyword);
    }

    // Get employees by department
    public List<Employee> getEmployeesByDepartment(String department) {
        return employeeRepository.findByDepartmentIgnoreCase(department);
    }
}
