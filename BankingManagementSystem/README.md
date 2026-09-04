# 🏦 Banking Management System

A full-stack **Banking Management System** developed as a Capgemini Capstone Project. The application provides secure banking operations such as customer management, account management, and financial transactions using **Spring Boot, Spring Data JPA, MySQL, React.js, and Spring Security with JWT authentication**.

---

## 📌 Project Overview

The Banking Management System is designed to simulate the core operations of a banking application.

The system allows customers to manage their accounts and perform banking transactions, while administrators have additional privileges to manage users and monitor the system.

The project follows a **layered architecture** and uses the **Waterfall Software Development Model** as required for the capstone project.

---

## 🎯 Project Objectives

* Provide secure user registration and login.
* Implement role-based authentication and authorization.
* Allow customers to manage their bank accounts.
* Perform deposits, withdrawals, and fund transfers.
* Maintain transaction records.
* Allow administrators to manage users.
* Provide a simple and responsive frontend.
* Store application data securely using MySQL.
* Implement CRUD operations using Spring Data JPA.

---

## ✨ Features

### 👤 User Management

* User registration
* User login
* Password encryption using BCrypt
* JWT-based authentication
* Role-based authorization
* Customer and Admin roles

### 🏦 Account Management

* Create bank account
* View account details
* Update account information
* Delete/close account
* Check account balance
* Account status management

### 💰 Transaction Management

* Deposit money
* Withdraw money
* Transfer money between accounts
* View transaction history
* Generate unique transaction references
* Validate sufficient balance

### 👨‍💼 Admin Management

Administrators can:

* View all users
* Manage customer accounts
* Monitor transactions
* Perform administrative operations

---

## 🛠️ Technologies Used

### Backend

* Java
* Spring Boot
* Spring Security
* JWT
* Spring Data JPA
* Hibernate
* Maven

### Frontend

* React.js
* JavaScript
* HTML
* CSS
* Bootstrap
* Axios

### Database

* MySQL

### Development Tools

* IntelliJ IDEA
* Visual Studio Code
* MySQL Workbench
* Postman
* Git
* GitHub

---

## 🏗️ System Architecture

The project follows a layered architecture.

```text
                    ┌─────────────────────┐
                    │     React.js UI     │
                    │      Frontend       │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │     Controller      │
                    │       Layer         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       Service       │
                    │       Layer         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     Repository      │
                    │       Layer         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       MySQL         │
                    │      Database       │
                    └─────────────────────┘
```

---

## 🔐 Authentication & Authorization

The application uses **Spring Security and JSON Web Tokens (JWT)** for authentication.

### Authentication Flow

```text
User
 │
 │ Login
 ▼
AuthController
 │
 ▼
AuthenticationManager
 │
 ▼
UserDetailsService
 │
 ▼
Validate Email & Password
 │
 ▼
Generate JWT
 │
 ▼
Return JWT to Client
```

For protected requests:

```text
Client
 │
 │ Authorization: Bearer <JWT>
 ▼
JwtAuthenticationFilter
 │
 ▼
Validate JWT
 │
 ▼
Load User Details
 │
 ▼
Set Authentication
 │
 ▼
Spring Security
 │
 ▼
Controller
```

---

## 👥 User Roles

The application contains two roles:

```text
USER
├── CUSTOMER
└── ADMIN
```

### CUSTOMER

Customers can:

* Login
* View their account
* Check balance
* Deposit money
* Withdraw money
* Transfer money
* View transaction history

### ADMIN

Administrators have additional privileges such as:

* View all users
* Manage users
* Manage accounts
* Monitor transactions

---

## 🗄️ Database Design

The main entities in the application are:

```text
             ┌──────────────┐
             │     User     │
             └──────┬───────┘
                    │
                    │ 1
                    │
                    │ *
             ┌──────▼───────┐
             │   Account   │
             └──────┬───────┘
                    │
                    │ 1
                    │
                    │ *
             ┌──────▼────────────┐
             │   Transaction     │
             └───────────────────┘
```

### User

Stores information about:

* User ID
* Name
* Email
* Password
* Role

### Account

Stores:

* Account ID
* Account Number
* Balance
* Account Type
* Account Status
* Associated User

### Transaction

Stores:

* Transaction ID
* Transaction Reference
* Transaction Type
* Amount
* Sender Account
* Receiver Account
* Transaction Status
* Transaction Date

---

## 🔄 Transaction Types

The system supports three major transaction types:

### Deposit

```text
Account Balance
      +
Deposit Amount
      ↓
Updated Balance
```

### Withdrawal

```text
Account Balance
      -
Withdrawal Amount
      ↓
Updated Balance
```

### Transfer

```text
Sender Account              Receiver Account
      │                            │
      │ - Amount                   │ + Amount
      ▼                            ▼
Updated Balance              Updated Balance
              │
              ▼
       Transaction Record
```

---

## 🔗 REST API Endpoints

### Authentication

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| POST   | `/auth/register` | Register a new customer |
| POST   | `/auth/login`    | Login and receive JWT   |

### Users

| Method | Endpoint      | Description    | Access        |
| ------ | ------------- | -------------- | ------------- |
| GET    | `/users`      | Get all users  | ADMIN         |
| GET    | `/users/{id}` | Get user by ID | Authenticated |
| PUT    | `/users/{id}` | Update user    | Authenticated |
| DELETE | `/users/{id}` | Delete user    | ADMIN         |

### Accounts

| Method | Endpoint         | Description    |
| ------ | ---------------- | -------------- |
| POST   | `/accounts`      | Create account |
| GET    | `/accounts`      | Get accounts   |
| GET    | `/accounts/{id}` | Get account    |
| PUT    | `/accounts/{id}` | Update account |
| DELETE | `/accounts/{id}` | Delete account |

### Transactions

| Method | Endpoint                 | Description          |
| ------ | ------------------------ | -------------------- |
| POST   | `/transactions/deposit`  | Deposit money        |
| POST   | `/transactions/withdraw` | Withdraw money       |
| POST   | `/transactions/transfer` | Transfer money       |
| GET    | `/transactions`          | Get all transactions |
| GET    | `/transactions/{id}`     | Get transaction      |

---

## 🧪 Testing

The REST APIs can be tested using **Postman**.

### Example Login Request

```http
POST /auth/login
```

```json
{
    "email": "admin@gmail.com",
    "password": "secure123"
}
```

The server returns a JWT:

```json
{
    "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

The token is then sent with protected requests:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## ⚙️ Configuration

Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/banking_db
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

jwt.secret=your-secret-key
jwt.expiration=86400000
```


---

## 📋 Capstone Requirements

This project satisfies the required Capgemini Capstone components:

| Requirement                | Implementation                           |
| -------------------------- | ---------------------------------------- |
| CRUD Operations            | User, Account and Transaction management |
| Spring Boot                | Backend REST API                         |
| Frontend                   | React.js                                 |
| JPA/JDBC                   | Spring Data JPA + Hibernate              |
| Architecture/System Design | Layered Architecture                     |
| Development Model          | Waterfall Model                          |
| Authentication             | Spring Security + JWT                    |
| Database                   | MySQL                                    |

---

## 📐 Development Methodology — Waterfall Model

The project follows the **Waterfall Model**.

```text
Requirements Analysis
        ↓
System Design
        ↓
Implementation
        ↓
Testing

```

### 1. Requirements Analysis

Identify banking operations, user roles, account management, transactions, and security requirements.

### 2. System Design

Design the database, application architecture, REST APIs, authentication flow, and frontend structure.

### 3. Implementation

Develop the Spring Boot backend, React frontend, database layer, and security components.

### 4. Testing

Test REST APIs, authentication, authorization, CRUD operations, and transaction functionality using Postman and application testing.


---

## 🔮 Future Enhancements

* Email notifications for transactions
* OTP-based authentication
* PDF bank statements
* Transaction search and filtering
* Monthly transaction reports
* Admin dashboard
* Account statement generation
* Improved frontend dashboard
* Cloud deployment
* Docker containerization
* Automated unit and integration testing

---

## 👨‍💻 Author

**Vishal Shukla**

Capgemini Capstone Project

---

## 📄 License

This project was developed for educational and academic purposes.
