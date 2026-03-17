# 📄 Resume Builder Application (Spring Boot + JWT)

A secure and scalable Resume Builder backend application built using **Spring Boot** and **Java**, featuring **JWT Authentication**, **User Management**, and **Email Verification using Brevo**.

---

## 🚀 Features

- 🔐 JWT-based Authentication & Authorization
- 🔑 Secure Password Encryption using BCrypt Password Encoder
- 👤 User Registration & Login
- 📧 Email Verification using Brevo (Sendinblue)
- 🗄️ Database Integration (JPA + Hibernate)
- 📄 Resume Creation & Management APIs
- ⚡ RESTful API Architecture

---

## 🛠️ Tech Stack

- **Backend:** Spring Boot, Java
- **Security:** Spring Security, JWT (JSON Web Token)
- **Database:** MySQL / PostgreSQL (configurable)
- **ORM:** Hibernate, Spring Data JPA
- **Email Service:** Brevo (Sendinblue API)
- **Build Tool:** Maven

---

## 🔐 Authentication Flow

1. User registers with email & password
2. Password is encrypted using BCrypt
3. Verification email is sent via Brevo
4. User verifies email using link/token
5. User logs in → receives JWT token
6. Token is used for accessing secured APIs

---

## ⚙️ Setup & Installation

### 1. Clone the Repository

```bash
