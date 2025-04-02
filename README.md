# Banking Application - Spring Boot
This is a simple banking application built using Spring Boot. It provides RESTful APIs to perform basic banking operations like account creation, deletion, deposit, and withdrawal.

# Features
Create Account - Add a new bank account.

Delete Account - Remove an existing account.

Deposit Money - Add funds to an account.

Withdraw Money - Deduct funds from an account.

View Account Details - Retrieve account information.

# Technologies Used
Spring Boot - Backend framework

Spring MVC - RESTful API handling

Spring Data JPA - Database interaction

MySQL Database - Storage


# API Endpoints
# Method	      Endpoint	                         Description
   GET	       /accounts	                   Get all account details
   POST	       /accounts	                   Create a new account
   PUT	      /accounts/{id}/deposit	       Deposit money
   PUT	      /accounts/{id}/withdraw	       Withdraw money
  DELETE	    /accounts/{id}/delete	         Delete an account
