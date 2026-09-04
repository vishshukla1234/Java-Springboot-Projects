# Banking Management System

Spring Boot + Spring Security (JWT) + JPA/MySQL banking API.

## Setup

1. Create/point to a MySQL instance and update `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/bankingms?createDatabaseIfNotExist=true
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   ```
2. Replace `jwt.secret` with your own long random string.
3. `mvn spring-boot:run`

`spring.jpa.hibernate.ddl-auto=create-drop` is set for development — every restart rebuilds a
clean schema matching your entities. Switch to `update` (or Flyway/Liquibase) once your entities
stop changing and you need data to persist across restarts.

## Auth flow

1. `POST /auth/register` — create a user (always created as `CUSTOMER`; no client-supplied roles).
2. `POST /auth/login` — returns a JWT. Send it as `Authorization: Bearer <token>` on every
   other request. Everything except `/auth/**` requires this header.

## Endpoints

### Auth
| Method | Path | Body | Auth |
|---|---|---|---|
| POST | `/auth/register` | `{ "name", "email", "password" }` | none |
| POST | `/auth/login` | `{ "email", "password" }` | none |

### Accounts
| Method | Path | Body | Auth |
|---|---|---|---|
| POST | `/accounts` | `{ "accountType": "SAVINGS" \| "CURRENT" }` | any logged-in user — creates an account for **themselves** |
| GET | `/accounts/{id}` | — | owner or ADMIN only |
| GET | `/accounts/my` | — | any logged-in user — their own accounts |
| GET | `/accounts` | — | ADMIN only — all accounts |

### Transactions
| Method | Path | Body | Auth |
|---|---|---|---|
| GET | `/transactions` | — | any logged-in user |
| GET | `/transactions/{id}` | — | any logged-in user |
| GET | `/transactions/account/{accountId}` | — | any logged-in user |
| POST | `/transactions/deposit` | `{ "accountId", "amount" }` | any logged-in user |
| POST | `/transactions/withdraw` | `{ "accountId", "amount" }` | any logged-in user |
| POST | `/transactions/transfer` | `{ "senderAccountId", "receiverAccountId", "amount" }` | any logged-in user |

### Users (admin)
| Method | Path | Auth |
|---|---|---|
| GET | `/users` | ADMIN only |
| DELETE | `/user/{id}` | ADMIN only |

## What changed from the earlier draft (and why)

- **`Account.accountType`** now correctly uses your `AccountType` enum — the earlier
  `jakarta.persistence.AccessType` mix-up (an unrelated JPA-internal enum) caused the
  "data truncated" MySQL error and the compile error.
- **`Account` now has a real `@ManyToOne User user`** field, so `setUser(...)` actually exists.
- **Passwords never leave the API.** `User.password` is `@JsonIgnore`, and every response
  goes through a DTO (`AccountResponse`, `UserResponse`, `TransactionResponse`) instead of
  returning entities directly, so nested `User` objects can't leak the hash either.
- **`POST /user` (self-service, unauthenticated user creation with a raw entity body) was
  removed.** It bypassed password encoding and let a caller set their own role. Use
  `/auth/register` — the only path that creates users, always as `CUSTOMER`.
- **Account creation no longer accepts `userId` in the request body.** The account is
  created for whoever the JWT identifies (`Authentication.getName()`), so one user can't
  open an account under someone else's ID.
- **`GET /accounts/{id}` now checks ownership.** Only the account's owner or an ADMIN can
  view it.
- **`accountNumber` and `status` are set on creation** (`ACTIVE`, random unique 10-digit
  number) instead of being left `null`.
- **Deposit/withdraw/transfer now take a JSON body**, not `@RequestParam` — consistent with
  the rest of the API and easier to call from Postman.
- **A `GlobalExceptionHandler`** turns "not found", "insufficient balance", bad credentials,
  and access-denied cases into proper HTTP status codes (404 / 400 / 401 / 403) with a
  consistent JSON error shape, instead of raw `RuntimeException` stack traces.
- **Full `SecurityConfig` + `JwtAuthFilter` + `CustomUserDetailsService`** are included —
  these were referenced (`@PreAuthorize`, `AuthenticationManager`, `JwtService`) but never
  shown in the earlier code.

## Postman quick test

1. `POST /auth/register` → `{"name":"Jane","email":"jane@test.com","password":"pass123"}`
2. `POST /auth/login` → same email/password → copy `token`
3. `POST /accounts` with `Authorization: Bearer <token>` → `{"accountType":"SAVINGS"}`
4. `POST /transactions/deposit` with the same header → `{"accountId": 1, "amount": 4000}`

To test ADMIN-only routes, manually set a user's `role` to `ADMIN` in the database
(there's intentionally no public endpoint to self-assign roles).
