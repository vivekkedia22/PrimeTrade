# ASSUMPTIONS & TODOs

This document outlines assumptions made during documentation generation and lists follow-up tasks or ambiguities.

## Assumptions Made

1.  **`.env.local.example` and `.env.example` Files**:
    -   **Ambiguity**: The `.env.local.example` and `.env.example` files were filtered by globalignore and could not be directly read or written.
    -   **Assumption**: Content for these files (listed in respective READMEs) was inferred from code usage of `process.env` and `import.meta.env`.
    -   **Action**: These files should be manually created with the provided content if they do not exist.

2.  **`docker-compose.yml` File**:
    -   **Ambiguity**: No `docker-compose.yml` file was found in the repository root.
    -   **Assumption**: A minimal `docker-compose.yml` snippet for running both client and server, along with MongoDB and Redis, was generated based on standard practices and inferred service dependencies.
    -   **Action**: The provided `docker-compose.yml` snippet should be used as a starting point.

3.  **Server Database Connection (`server/src/db.ts`)**:
    -   **Ambiguity**: The content of `server/src/db.ts` was not explicitly provided, but `connectDB` is imported and called in `server/src/server.ts`.
    -   **Assumption**: `server/src/db.ts` contains the logic to connect to MongoDB using `MONGO_URI`.

4.  **Server Middleware Files**:
    -   **Ambiguity**: `server/src/middlewares/logger.middleware.ts`, `server/src/middlewares/error.middleware.ts`, `server/src/middlewares/validation.middleware.ts`, and `server/src/middlewares/cache.middleware.ts` were imported but their contents were not directly read.
    -   **Assumption**: These files contain standard implementations for logging, error handling, validation, and caching middleware respectively.
    -   **Action**: The specifics of these middlewares (e.g., global error response format beyond generic `ApiError`, detailed cache key/TTL management) should be verified by reviewing their code.

5.  **Server Validation Schemas**:
    -   **Ambiguity**: `server/src/validation/user.validation.ts` and `server/src/validation/todo.validation.ts` were imported but their contents were not directly read.
    -   **Assumption**: These files define validation schemas for user and todo operations using `express-validator`.

6.  **Client Styling (Tailwind CSS)**:
    -   **Ambiguity**: `tailwind.config.js` was not explicitly read.
    -   **Assumption**: Tailwind CSS is configured with standard defaults, and customizations would be in `tailwind.config.js` and `client/src/index.css`.

7.  **Server Logout Endpoint**:
    -   **Ambiguity**: The frontend `authService.logout` in `client/src/api/authService.ts` explicitly notes: "Backend does not have an explicit logout route that clears the cookie."
    -   **Assumption**: The server relies on the `httpOnly` cookie expiration or client-side removal for logout functionality.
    -   **Action**: Consider adding a backend `/auth/logout` endpoint to explicitly clear the `authToken` cookie for a more robust logout mechanism.

## TODOs / Follow-ups

-   **Verify all `server/src/middlewares/*.ts` implementations**: Confirm actual behavior for logger, error handling, validation, and caching.
-   **Verify `server/src/validation/*.ts` schemas**: Confirm specific validation rules.
-   **Implement explicit backend logout endpoint**: Add an endpoint to clear the authentication cookie on the server.
-   **Add testing setup**: Configure and document unit/integration tests for both client and server.
-   **Detailed Docker setup**: Expand Docker instructions, especially for production deployments.
-   **Add a Changelog**: Create a `CHANGELOG.md` file in the repository root to track changes.
