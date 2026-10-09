# Employee Management System — Backend

A RESTful backend for managing employee records built with **Java 17**, **Spring Boot**, **Spring Data JPA**, **Hibernate**, and **MySQL**.

---

## Features

- Add, view, update, and delete employees
- Search employees by name, employee ID, email, or department
- Filter employees by department
- Input validation with meaningful error messages
- Centralized exception handling
- CORS configured for React frontend integration

## Tech Stack

| Technology       | Purpose               |
| ---------------- | --------------------- |
| Java 17          | Programming language  |
| Spring Boot 3.2  | Application framework |
| Spring Web       | REST APIs             |
| Spring Data JPA  | Database access       |
| Hibernate        | ORM                   |
| MySQL            | Database              |
| Maven            | Build tool            |
| Jakarta Validation | Input validation    |

## Project Structure

```
employee-management-backend/
├── src/main/java/com/example/employeemanagement/
│   ├── EmployeeManagementApplication.java   — Entry point
│   ├── config/
│   │   └── CorsConfig.java                  — CORS configuration
│   ├── controller/
│   │   └── EmployeeController.java          — REST endpoints
│   ├── entity/
│   │   └── Employee.java                    — JPA entity
│   ├── exception/
│   │   ├── DuplicateResourceException.java  — 409 Conflict
│   │   ├── GlobalExceptionHandler.java      — Central error handler
│   │   └── ResourceNotFoundException.java   — 404 Not Found
│   ├── repository/
│   │   └── EmployeeRepository.java          — Data access layer
│   └── service/
│       └── EmployeeService.java             — Business logic
├── src/main/resources/
│   └── application.properties               — App configuration
├── pom.xml
└── README.md
```

---

## MySQL Database Setup

### Step 1 — Install & Start MySQL

Make sure MySQL is installed and the MySQL server is running.

### Step 2 — Create the Database

Open the MySQL CLI or MySQL Workbench and run:

```sql
CREATE DATABASE employee_management_db;
```

### Step 3 — Configure Credentials

Open `src/main/resources/application.properties` and replace the placeholders:

```properties
spring.datasource.username=YOUR_USERNAME   ← your MySQL username (e.g. root)
spring.datasource.password=YOUR_PASSWORD   ← your MySQL password
```

### Step 4 — Start the Application

The `employees` table will be created automatically by Hibernate (`ddl-auto=update`).

---

## How to Run

### Option A — IntelliJ IDEA

1. **Open** the `employee-management-backend` folder as a project in IntelliJ.
2. IntelliJ will detect the Maven project and download dependencies automatically.
3. Open `EmployeeManagementApplication.java`.
4. Click the **green Run button** (▶) next to the `main` method.
5. The server starts at `http://localhost:8080`.

### Option B — Command Prompt / Terminal

```bash
cd employee-management-backend

# Using Maven Wrapper (recommended)
mvnw.cmd spring-boot:run          # Windows
./mvnw spring-boot:run            # macOS / Linux

# Or using a globally installed Maven
mvn spring-boot:run
```

---

## API Endpoints

Base URL: `http://localhost:8080/api/employees`

| Method   | URL                                       | Description              |
| -------- | ----------------------------------------- | ------------------------ |
| `POST`   | `/api/employees`                          | Add a new employee       |
| `GET`    | `/api/employees`                          | Get all employees        |
| `GET`    | `/api/employees/{id}`                     | Get employee by ID       |
| `PUT`    | `/api/employees/{id}`                     | Update employee          |
| `DELETE` | `/api/employees/{id}`                     | Delete employee          |
| `GET`    | `/api/employees/search?keyword=john`      | Search employees         |
| `GET`    | `/api/employees/department/{department}`  | Filter by department     |

### Employee JSON Format

```json
{
  "employeeId": "EMP001",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "department": "IT",
  "designation": "Software Developer",
  "salary": 50000,
  "joiningDate": "2026-10-01"
}
```

### Error Response Format

```json
{
  "message": "Employee not found with id: 99"
}
```

---

## Postman Testing Guide

> **Headers for POST and PUT requests:**
> `Content-Type: application/json`

### 1. Add Employee

| Field          | Value                                               |
| -------------- | --------------------------------------------------- |
| **Method**     | `POST`                                              |
| **URL**        | `http://localhost:8080/api/employees`                |
| **Body (raw JSON)** | See below                                     |
| **Expected Status** | `201 Created`                                  |

```json
{
  "employeeId": "EMP001",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "department": "IT",
  "designation": "Software Developer",
  "salary": 50000,
  "joiningDate": "2026-10-01"
}
```

**Expected Response:** The same employee object with an auto-generated `id` field.

---

### 2. Add a Second Employee (for testing search/filter)

| Field          | Value                                               |
| -------------- | --------------------------------------------------- |
| **Method**     | `POST`                                              |
| **URL**        | `http://localhost:8080/api/employees`                |
| **Expected Status** | `201 Created`                                  |

```json
{
  "employeeId": "EMP002",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "9123456789",
  "department": "HR",
  "designation": "HR Manager",
  "salary": 60000,
  "joiningDate": "2026-09-15"
}
```

---

### 3. Get All Employees

| Field          | Value                                               |
| -------------- | --------------------------------------------------- |
| **Method**     | `GET`                                               |
| **URL**        | `http://localhost:8080/api/employees`                |
| **Body**       | None                                                |
| **Expected Status** | `200 OK`                                       |

**Expected Response:** Array of all employees.

---

### 4. Get Employee By ID

| Field          | Value                                               |
| -------------- | --------------------------------------------------- |
| **Method**     | `GET`                                               |
| **URL**        | `http://localhost:8080/api/employees/1`              |
| **Body**       | None                                                |
| **Expected Status** | `200 OK`                                       |

**Expected Response:** Employee with `id: 1`.

---

### 5. Update Employee

| Field          | Value                                               |
| -------------- | --------------------------------------------------- |
| **Method**     | `PUT`                                               |
| **URL**        | `http://localhost:8080/api/employees/1`              |
| **Expected Status** | `200 OK`                                       |

```json
{
  "employeeId": "EMP001",
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "phone": "9876543210",
  "department": "IT",
  "designation": "Senior Software Developer",
  "salary": 70000,
  "joiningDate": "2026-10-01"
}
```

**Expected Response:** Updated employee object.

---

### 6. Search Employees

| Field          | Value                                               |
| -------------- | --------------------------------------------------- |
| **Method**     | `GET`                                               |
| **URL**        | `http://localhost:8080/api/employees/search?keyword=john` |
| **Body**       | None                                                |
| **Expected Status** | `200 OK`                                       |

**Expected Response:** Employees matching "john" in name, email, employeeId, or department.

---

### 7. Filter By Department

| Field          | Value                                               |
| -------------- | --------------------------------------------------- |
| **Method**     | `GET`                                               |
| **URL**        | `http://localhost:8080/api/employees/department/IT`  |
| **Body**       | None                                                |
| **Expected Status** | `200 OK`                                       |

**Expected Response:** All employees in the "IT" department.

---

### 8. Delete Employee

| Field          | Value                                               |
| -------------- | --------------------------------------------------- |
| **Method**     | `DELETE`                                            |
| **URL**        | `http://localhost:8080/api/employees/1`              |
| **Body**       | None                                                |
| **Expected Status** | `204 No Content`                               |

---

### 9. Test Error Cases

| Test Case                  | Method | URL                                     | Expected Status |
| -------------------------- | ------ | --------------------------------------- | --------------- |
| Duplicate Employee ID      | POST   | `/api/employees` (same employeeId)      | `409 Conflict`  |
| Duplicate Email            | POST   | `/api/employees` (same email)           | `409 Conflict`  |
| Employee Not Found         | GET    | `/api/employees/999`                    | `404 Not Found` |
| Missing Required Fields    | POST   | `/api/employees` (empty body)           | `400 Bad Request` |
| Invalid Email              | POST   | `/api/employees` (email: "not-valid")   | `400 Bad Request` |
| Negative Salary            | POST   | `/api/employees` (salary: -100)         | `400 Bad Request` |

---

## Frontend Integration Information

This section provides everything a React developer needs to connect to this backend.

### Backend Base URL

```
http://localhost:8080
```

### API Endpoints

| Method   | Endpoint                                  | Request Body       | Response                |
| -------- | ----------------------------------------- | ------------------ | ----------------------- |
| `POST`   | `/api/employees`                          | Employee JSON      | Created employee (201)  |
| `GET`    | `/api/employees`                          | —                  | Employee array (200)    |
| `GET`    | `/api/employees/{id}`                     | —                  | Employee object (200)   |
| `PUT`    | `/api/employees/{id}`                     | Employee JSON      | Updated employee (200)  |
| `DELETE` | `/api/employees/{id}`                     | —                  | No content (204)        |
| `GET`    | `/api/employees/search?keyword={keyword}` | —                  | Employee array (200)    |
| `GET`    | `/api/employees/department/{department}`  | —                  | Employee array (200)    |

### Request Body Format (POST / PUT)

```json
{
  "employeeId": "EMP001",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "department": "IT",
  "designation": "Software Developer",
  "salary": 50000,
  "joiningDate": "2026-10-01"
}
```

### Response Format (Single Employee)

```json
{
  "id": 1,
  "employeeId": "EMP001",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "department": "IT",
  "designation": "Software Developer",
  "salary": 50000,
  "joiningDate": "2026-10-01"
}
```

### Error Response Format

```json
{
  "message": "Employee not found with id: 99"
}
```

Validation errors return a field-level map:

```json
{
  "name": "Name is required",
  "email": "Email should be valid"
}
```

### CORS Configuration

- **Allowed Origin:** `http://localhost:3000`
- **Allowed Methods:** GET, POST, PUT, DELETE, OPTIONS
- **Allowed Headers:** All
- **Credentials:** Enabled

> If your React app runs on a different port, update `CorsConfig.java`.

### HTTP Status Codes

| Code  | Meaning              |
| ----- | -------------------- |
| `200` | Success              |
| `201` | Created              |
| `204` | No Content (delete)  |
| `400` | Bad Request          |
| `404` | Not Found            |
| `409` | Conflict (duplicate) |
| `500` | Internal Server Error|
