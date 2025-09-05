# HMCTS Task Manager

This repository contains the frontend for the brand-new HMCTS Task management system.
It leverages an Express BFF (Backend For Frontend) architecture with Nunjucks components to provide accessible and reusable UI components, interfacing with a Task API to manage CRUD operations.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Repository Structure](#repository-structure)
3. [Request-Based Client Architecture](#request-based-client-architecture)
4. [Quality Assurance](#quality-assurance)

---

## Getting Started

To get started with the project, follow these steps:

1. Install dependencies:
   ```bash
   yarn install
   ```
2. Build application:
   ```bash
   yarn webpack
   ```
3. Set `.env` vars
   ```
   API_URL=http://localhost:4000
   TASK_FRONTEND=http://localhost:3100
   SESSION_SECRET=your-secret-key
   ```
4. Start dev server:
   ```bash
   start:dev
   ```

## Repository Structure

```
hmcts-dev-test-frontend/
├── src/
│   ├── main/
│   │   ├── api/                # API clients for interacting with backend services
│   │   ├── middleware/         # Express middleware (e.g., attachClients)
│   │   ├── modules/            # Custom modules (e.g., Nunjucks setup)
│   │   ├── routes/             # Express route handlers
│   │   ├── app.ts              # Main application entry point
│   │   ├── HttpError.ts        # Custom error handling
│   │   └── public/             # Static assets (e.g., images, CSS, JS)
│   ├── test/
│   │   ├── e2e/                # End-to-end tests using Playwright
│   │   ├── route/              # Route integration test
│   │   └── unit/               # Unit tests for individual components
├── .env                        # Environment variables
├── [playwright.config.ts]
├── [package.json]
└── [README.md]
```

## Request-Based Client Architecture

The application uses a request-based client architecture to interact with backend services. This is implemented in the src/main/api/ directory. Each client is responsible for making HTTP requests to a specific backend service. The architecture ensures that:

- **Token-Based Authentication:** Each client request can leverage Authentication, using Token Provider to retrieve and attach the Bearer Token Auth header in requests and responses.
- **Request Isolation:** Clients are instantiated per request to prevent token leakage between users.
- **Encapsulation/Modularity:** Each client (e.g., LoginClient, TaskClient) encapsulates the logic for interacting with its respective backend service. With common error handling and construction abstracted to the BaseClient.

## Quality Assurance

The repository includes unit tests and end-to-end (E2E) tests to ensure the application works as expected.
This repository also implements `eslint` and pre-commit hooks to maintain coding standards and base integrity during delivery.

#### Unit Tests

- Location: `src/test/unit/`
- Purpose: Test individual components and middleware in isolation.
- Framework: Jest
- Run Command:
  ```bash
  yarn test:unit
  ```

#### Functional End-to-End (E2E) Tests

- Location: `src/test/e2e/`
- Purpose: Test the application’s functionality end-to-end journey from the user’s perspective.
- Framework: Playwright
- Run Command:
  ```bash
  yarn test:functional
  ```

#### Route Integration

- Location: `src/test/route/`
- Purpose: Validate the integration between the route handlers and.
- Framework: N/A
- Run Command:
  ```bash
  yarn test:routes
  ```
