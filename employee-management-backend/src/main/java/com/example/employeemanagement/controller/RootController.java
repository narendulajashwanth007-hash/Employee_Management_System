package com.example.employeemanagement.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

    @GetMapping("/")
    public String healthCheck() {
        return "Employee Management Backend is running successfully!";
    }
    
    @GetMapping("/api")
    public String apiRoot() {
        return "Employee Management API is alive! Use /api/employees for employee endpoints.";
    }
}
