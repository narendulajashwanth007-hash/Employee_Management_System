@echo off
echo Starting Employee Management System...

echo Starting Backend (Spring Boot)...
start "Employee Backend" cmd /k "cd employee-management-backend && mvn spring-boot:run"

echo Starting Frontend (React/Vite)...
start "Employee Frontend" cmd /k "cd employee-management-frontend && npm run dev"

echo Both servers are starting in separate windows!
