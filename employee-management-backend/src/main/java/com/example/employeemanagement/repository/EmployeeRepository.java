package com.example.employeemanagement.repository;

import com.example.employeemanagement.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // Search employees by keyword across name, employeeId, email, or department
    @Query("SELECT e FROM Employee e WHERE " +
           "LOWER(e.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(e.employeeId) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(e.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(e.department) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Employee> searchEmployees(@Param("keyword") String keyword);

    // Find employees by department (case-insensitive)
    List<Employee> findByDepartmentIgnoreCase(String department);

    // Check if an employee ID already exists
    boolean existsByEmployeeId(String employeeId);

    // Check if an email already exists
    boolean existsByEmail(String email);

    // Check if an employee ID exists for a different employee (used during update)
    boolean existsByEmployeeIdAndIdNot(String employeeId, Long id);

    // Check if an email exists for a different employee (used during update)
    boolean existsByEmailAndIdNot(String email, Long id);
}
