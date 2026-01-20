# Server README

This document outlines the setup, usage, and structure of the server-side application.

## Table of Contents
- [Project Name & Summary](#project-name--summary)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Docker](#docker)
- [Testing & Linting](#testing--linting)
- [Troubleshooting](#troubleshooting)
- [Maintenance Notes](#maintenance-notes)
- [Contributing](#contributing)
- [Authors & License](#authors--license)
- [Full List of Endpoints](#full-list-of-endpoints)
- [Authentication](#authentication)
- [Database](#database)
- [Redis / Caching](#redis--caching)
- [Error Handling & Validation](#error-handling--validation)
- [Running Locally](#running-locally)
- [Postman / Swagger](#postman--swagger)
- [Useful Dev Utilities](#useful-dev-utilities)

## Project Name & Summary
**PrimeTrade Server**: An Express.js backend API for managing user authentication and todos.

## Quick Start
Follow these steps to get the server application up and running locally.

1.  **Install Dependencies**: Navigate to the `server/` directory and install the required packages.
    ```bash
    bun install
    # or npm install or yarn install
    ```
2.  **Environment Setup**: Create a `.env` file in the `server/` directory and add the following environment variables.
    ```
    PORT=8000
    MONGO_URI=mongodb://localhost:27017/primetrade
    JWT_SECRET=supersecretjwtkey
    JWT_EXPIRES_IN=7d
    CLIENT_URL=http://localhost:5173
    REDIS_URL=redis://localhost:6379
    ```
3.  **Start the Development Server**:
    ```bash
    bun run dev
    # or npm run dev
    ```

## Environment Variables
The server application uses the following environment variables:

-   `PORT`
    -   Example value: `8000`
    -   Purpose: The port on which the server will listen.
    (defined in `server/src/server.ts`)
-   `MONGO_URI`
    -   Example value: `mongodb://localhost:27017/primetrade`
    -   Purpose: Connection string for the MongoDB database.
    (defined in `server/src/app.ts`, used in `server/src/db.ts` - assumed)
-   `JWT_SECRET`
    -   Example value: `supersecretjwtkey`
    -   Purpose: Secret key used for signing and verifying JWTs.
    (defined in `server/src/app.ts`, used in `server/src/models/user.model.ts`)
-   `JWT_EXPIRES_IN`
    -   Example value: `7d`
    -   Purpose: Defines the expiration time for JWTs.
    (defined in `server/src/app.ts`, used in `server/src/models/user.model.ts`)
-   `CLIENT_URL`
    -   Example value: `http://localhost:5173`
    -   Purpose: The URL of the client application, used for CORS configuration.
    (defined in `server/src/app.ts`)
-   `REDIS_URL`
    -   Example value: `redis://localhost:6379`
    -   Purpose: Connection string for the Redis server.
    (defined in `server/src/utils/redisClient.ts`)

## Scripts
The following `bun` scripts are available in `server/package.json`:

-   `dev`: Starts the development server with `bun --watch src/server.ts` for hot-reloading.
-   `build`: Compiles the TypeScript source code to JavaScript and outputs to the `dist` directory.
-   `start`: Runs the compiled JavaScript application from the `dist` directory.

## Docker
A `Dockerfile` is present in the `server/` directory.

**Build the Docker image**:
```bash
docker build -t primetrade-server ./server
```

**Run the Docker container**:
```bash
docker run -p 8000:8000 --env-file ./server/.env primetrade-server
```

**`docker-compose.yml` snippet (to be added to a top-level `docker-compose.yml`)**:
```yaml
  server:
    build: ./server
    ports:
      - "8000:8000"
    environment:
      MONGO_URI: mongodb://mongodb:27017/primetrade
      JWT_SECRET: supersecretjwtkey
      JWT_EXPIRES_IN: 7d
      CLIENT_URL: http://localhost:5173
      REDIS_URL: redis://redis:6379
    depends_on:
      - mongodb
      - redis
```

## Testing & Linting
-   **Testing**: No explicit testing scripts are configured in `package.json`.
-   **Linting**: No explicit linting scripts are configured in `package.json`.

## Troubleshooting
-   **Port Conflict**: If the server fails to start, port `8000` might be in use. Change the `PORT` in `.env` or kill the conflicting process.
-   **MongoDB Connection Issues**: Ensure your MongoDB instance is running and accessible at the `MONGO_URI` specified in `.env`.
-   **Redis Connection Issues**: Ensure your Redis instance is running and accessible at the `REDIS_URL` specified in `.env`.
-   **JWT Errors**: Verify `JWT_SECRET` and `JWT_EXPIRES_IN` are correctly set in `.env`.
-   **CORS Issues**: Check the `CLIENT_URL` in `.env` matches the origin of your frontend application.
-   **Missing Environment Variables**: The server explicitly checks for `JWT_SECRET`, `MONGO_URI`, and `JWT_EXPIRES_IN` in `server/src/app.ts`. Ensure these are set.
-   **Validation Errors**: The `express-validator` library is used for request body validation. Check the API response for specific validation error messages.

## Maintenance Notes
-   **Base URLs and Ports**: The server runs on the port defined by the `PORT` environment variable (`server/src/server.ts`). The API prefix is `/api/v1` (`server/src/app.ts`).
-   **Adding new routes**: New routes should be defined in `server/src/routes/*.ts` files and then registered in `server/src/app.ts`.
-   **Adding new models**: Mongoose models are defined in `server/src/models/*.ts`.
-   **Adding new controllers/services**: Logic for handling requests and business operations are in `server/src/controllers/*.ts` and `server/src/services/*.ts` respectively.

## Contributing
To contribute, please:
1.  Fork the repository.
2.  Create a new branch for your feature or bugfix (e.g., `feature/add-admin-panel` or `fix/db-connection`).
3.  Ensure your code adheres to the existing code style.
4.  Open a Pull Request with a clear description of your changes.

## Authors & License
-   **Authors**: [Your Name Here / Contributors]
-   **License**: ISC

## Full List of Endpoints

### Auth Group (`/api/v1/auth`)
(defined in `server/src/routes/user.routes.ts`)

-   **POST /auth/register**
    -   **Summary**: Register a new user
    -   **Auth Requirement**: None
    -   **Request Body Shape**:
        ```json
        {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "password": "password123"
        }
        ```
    -   **Response Shape (Success 201)**:
        ```json
        {
            "statusCode": 201,
            "data": {
                "id": "65e9d9b6a1b1a7f7b7e8d7c8",
                "name": "John Doe",
                "email": "john.doe@example.com",
                "role": "USER",
                "createdAt": "2026-01-20T12:00:00.000Z",
                "updatedAt": "2026-01-20T12:00:00.000Z"
            },
            "message": "Registration successful",
            "success": true
        }
        ```
    -   **Example cURL**:
        ```bash
        curl -X POST http://localhost:8000/api/v1/auth/register \
             -H "Content-Type: application/json" \
             -d '{
                   "name": "Test User",
                   "email": "test@example.com",
                   "password": "password123"
                 }'
        ```

-   **POST /auth/login**
    -   **Summary**: Login a user
    -   **Auth Requirement**: None
    -   **Request Body Shape**:
        ```json
        {
            "email": "john.doe@example.com",
            "password": "password123"
        }
        ```
    -   **Response Shape (Success 200)**:
        ```json
        {
            "statusCode": 200,
            "data": {
                "id": "65e9d9b6a1b1a7f7b7e8d7c8",
                "name": "John Doe",
                "email": "john.doe@example.com",
                "role": "USER",
                "createdAt": "2026-01-20T12:00:00.000Z",
                "updatedAt": "2026-01-20T12:00:00.000Z"
            },
            "message": "Login successful",
            "success": true
        }
        ```
    -   **Example cURL**:
        ```bash
        curl -X POST http://localhost:8000/api/v1/auth/login \
             -H "Content-Type: application/json" \
             -d '{
                   "email": "test@example.com",
                   "password": "password123"
                 }' \
             -c cookiejar.txt # Saves the httpOnly cookie
        ```

-   **GET /auth/me**
    -   **Summary**: Get current logged-in user details
    -   **Auth Requirement**: JWT via `authToken` cookie
    -   **Response Shape (Success 200)**:
        ```json
        {
            "statusCode": 200,
            "data": {
                "id": "65e9d9b6a1b1a7f7b7e8d7c8",
                "name": "John Doe",
                "email": "john.doe@example.com",
                "role": "USER",
                "createdAt": "2026-01-20T12:00:00.000Z",
                "updatedAt": "2026-01-20T12:00:00.000Z"
            },
            "message": "User retrieved successfully",
            "success": true
        }
        ```
    -   **Example cURL**:
        ```bash
        curl -X GET http://localhost:8000/api/v1/auth/me \
             -b cookiejar.txt # Sends the httpOnly cookie
        ```

### Todo Group (`/api/v1/todo`)
(defined in `server/src/routes/todo.routes.ts`)

-   **POST /todo**
    -   **Summary**: Create a new todo
    -   **Auth Requirement**: JWT via `authToken` cookie
    -   **Request Body Shape**:
        ```json
        {
            "title": "Buy groceries",
            "description": "Milk, eggs, bread, and fruits"
        }
        ```
    -   **Response Shape (Success 201)**:
        ```json
        {
            "statusCode": 201,
            "data": {
                "id": "65e9d9b6a1b1a7f7b7e8d7c8",
                "title": "Buy groceries",
                "description": "Milk, eggs, bread, and fruits",
                "ownerId": "65e9d9b6a1b1a7f7b7e8d7c7",
                "status": "open",
                "createdAt": "2026-01-20T12:00:00.000Z",
                "updatedAt": "2026-01-20T12:00:00.000Z"
            },
            "message": "Todo created",
            "success": true
        }
        ```
    -   **Example cURL**:
        ```bash
        curl -X POST http://localhost:8000/api/v1/todo \
             -H "Content-Type: application/json" \
             -b cookiejar.txt \
             -d '{
                   "title": "My New Todo",
                   "description": "This is a detailed description of my new todo item."
                 }'
        ```

-   **GET /todo/admin**
    -   **Summary**: Get all todos (Admin only)
    -   **Auth Requirement**: JWT via `authToken` cookie, Admin role
    -   **Query Parameters**: `title` (optional, string) - Filter todos by title
    -   **Response Shape (Success 200)**:
        ```json
        {
            "statusCode": 200,
            "data": [
                {
                    "id": "65e9d9b6a1b1a7f7b7e8d7c8",
                    "title": "Buy groceries",
                    "description": "Milk, eggs, bread, and fruits",
                    "ownerId": "65e9d9b6a1b1a7f7b7e8d7c7",
                    "status": "open",
                    "createdAt": "2026-01-20T12:00:00.000Z",
                    "updatedAt": "2026-01-20T12:00:00.000Z"
                }
            ],
            "message": "All Todos retrieved (Admin)",
            "success": true
        }
        ```
    -   **Example cURL (Admin user)**:
        ```bash
        curl -X GET "http://localhost:8000/api/v1/todo/admin?title=groceries" \
             -b cookiejar.txt
        ```

-   **GET /todo/me**
    -   **Summary**: Get todos for the current user
    -   **Auth Requirement**: JWT via `authToken` cookie
    -   **Response Shape (Success 200)**:
        ```json
        {
            "statusCode": 200,
            "data": [
                {
                    "id": "65e9d9b6a1b1a7f7b7e8d7c8",
                    "title": "Buy groceries",
                    "description": "Milk, eggs, bread, and fruits",
                    "ownerId": "65e9d9b6a1b1a7f7b7e8d7c7",
                    "status": "open",
                    "createdAt": "2026-01-20T12:00:00.000Z",
                    "updatedAt": "2026-01-20T12:00:00.000Z"
                }
            ],
            "message": "My Todos retrieved",
            "success": true
        }
        ```
    -   **Example cURL**:
        ```bash
        curl -X GET http://localhost:8000/api/v1/todo/me \
             -b cookiejar.txt
        ```

-   **GET /todo/{id}**
    -   **Summary**: Get a todo by ID
    -   **Auth Requirement**: JWT via `authToken` cookie
    -   **Path Parameters**: `id` (string, required) - ID of the todo to retrieve
    -   **Response Shape (Success 200)**:
        ```json
        {
            "statusCode": 200,
            "data": {
                "id": "65e9d9b6a1b1a7f7b7e8d7c8",
                "title": "Buy groceries",
                "description": "Milk, eggs, bread, and fruits",
                "ownerId": "65e9d9b6a1b1a7f7b7e8d7c7",
                "status": "open",
                "createdAt": "2026-01-20T12:00:00.000Z",
                "updatedAt": "2026-01-20T12:00:00.000Z"
            },
            "message": "Todo retrieved successfully",
            "success": true
        }
        ```
    -   **Example cURL**:
        ```bash
        curl -X GET http://localhost:8000/api/v1/todo/65e9d9b6a1b1a7f7b7e8d7c8 \
             -b cookiejar.txt
        ```

-   **PATCH /todo/{id}/status**
    -   **Summary**: Update a todo's status
    -   **Auth Requirement**: JWT via `authToken` cookie
    -   **Path Parameters**: `id` (string, required) - ID of the todo to update
    -   **Request Body Shape**:
        ```json
        {
            "status": "completed"
        }
        ```
    -   **Response Shape (Success 200)**:
        ```json
        {
            "statusCode": 200,
            "data": {
                "id": "65e9d9b6a1b1a7f7b7e8d7c8",
                "title": "Buy groceries",
                "description": "Milk, eggs, bread, and fruits",
                "ownerId": "65e9d9b6a1b1a7f7b7e8d7c7",
                "status": "completed",
                "createdAt": "2026-01-20T12:00:00.000Z",
                "updatedAt": "2026-01-20T12:00:00.000Z"
            },
            "message": "Todo status updated",
            "success": true
        }
        ```
    -   **Example cURL**:
        ```bash
        curl -X PATCH http://localhost:8000/api/v1/todo/65e9d9b6a1b1a7f7b7e8d7c8/status \
             -H "Content-Type: application/json" \
             -b cookiejar.txt \
             -d '{
                   "status": "completed"
                 }'
        ```

## Authentication
-   **Scheme**: The server uses JWT for authentication, delivered via `httpOnly` cookies.
-   **Token Issuance**: JWTs are issued upon successful user registration (`server/src/controllers/user.controller.ts`, `register` function) and login (`server/src/controllers/user.controller.ts`, `login` function). The `generateToken` method in `server/src/models/user.model.ts` creates the JWT.
-   **Token Validation**: Tokens are validated by `server/src/middlewares/auth.middleware.ts` through the `authMiddleware` function.
-   **Session / Token Lifetimes**: Token lifetimes are configured via the `JWT_EXPIRES_IN` environment variable (e.g., `7d` for 7 days), defined in `server/src/models/user.model.ts`.

## Database
-   **Database Used**: MongoDB is used as the primary database.
-   **Connection String**: The MongoDB connection string is provided via the `MONGO_URI` environment variable.
-   **Models**: Mongoose models are defined in `server/src/models/todo.model.ts` and `server/src/models/user.model.ts`.
-   **Migrations/Seeding**: No explicit migration or seeding scripts were found.

## Redis / Caching
-   **Redis Usage**: Redis is used for caching, with the client configured in `server/src/utils/redisClient.ts`.
-   **Keys and TTLs**: Caching is implemented via `cache` middleware (`server/src/middlewares/cache.middleware.ts` - assumed existence).
    -   `/todo/admin` endpoint uses `admin:todos` key.
    -   `/todo/me` endpoint uses `todos:user:<userId>` key.
    -   Specific TTLs are not explicitly defined in the provided code, but typically handled within the cache middleware.
-   **Cache Invalidation**: Cache invalidation is not explicitly shown in the provided code for `createTodo` or `updateTodoStatus`. It's assumed that relevant cache keys (e.g., `admin:todos`, `todos:user:<userId>`) would need to be invalidated after a todo is created or updated.

## Error Handling & Validation
-   **Global Error Handler**: A global error handler is set up in `server/src/middlewares/error.middleware.ts` (assumed existence) and applied in `server/src/app.ts`.
-   **Validation Library**: `express-validator` is used for request body validation. Validation schemas are defined in `server/src/validation/user.validation.ts` and `server/src/validation/todo.validation.ts` (assumed existence).
-   **Standard Error Response Format**:
    ```json
    {
        "success": false,
        "message": "Error message",
        "errors": ["Detail 1", "Detail 2"]
    }
    ```

## Running Locally
1.  **Start MongoDB and Redis**: Ensure both services are running (e.g., via Docker or locally installed instances).
2.  **Navigate to Server Directory**: `cd server`
3.  **Install Dependencies**: `bun install`
4.  **Create `.env`**: Create a `.env` file with the variables listed in the [Environment Variables](#environment-variables) section.
5.  **Start Server**: `bun run dev`

**Running with Docker (individual service)**:
1.  **Build image**: `docker build -t primetrade-server ./server`
2.  **Run container**: `docker run -p 8000:8000 --env-file ./server/.env primetrade-server`

## API Documentation

The API is documented using Swagger/OpenAPI, which serves as the source of truth for all backend endpoints, request/response structures, and authentication mechanisms.

-   **Swagger/OpenAPI Specification File**: `server/swagger.yaml`
-   **Swagger UI (Local)**: When the server is running, the interactive API documentation is available at `http://localhost:8000/api-docs`.
-   **Swagger UI (Production)**: `[YOUR_PRODUCTION_URL]/api-docs`

To run Swagger UI locally:
1.  Ensure the server is running (refer to [Quick Start](#quick-start)).
2.  Open your browser and navigate to `http://localhost:8000/api-docs`.

Example cURL command referencing the Swagger schema (for registering a new user):

```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Test User",
           "email": "test@example.com",
           "password": "password123"
         }'
```

## Postman Collection

No Postman collection file was found in the repository. A Postman collection can be generated from the Swagger/OpenAPI specification (`server/swagger.yaml`) if desired.

If a Postman collection were available, the authentication setup would involve:
-   **Method**: JWT via `authToken` httpOnly cookie.
-   **Workflow**:
    1.  Make a POST request to `/api/v1/auth/login` with valid user credentials.
    2.  The server will set an `authToken` httpOnly cookie in the response.
    3.  Subsequent requests to authenticated endpoints will automatically send this cookie (if using a Postman client that manages cookies, or by manually extracting and setting the cookie in the request headers).

Example: How to test login and an authenticated route in Postman (assuming `authToken` cookie is automatically handled):

1.  **Login Request (POST `/api/v1/auth/login`)**:
    -   Body:
        ```json
        {
            "email": "your_email@example.com",
            "password": "your_password"
        }
        ```
    -   After sending, the `authToken` cookie will be set in Postman's cookie jar.

2.  **Authenticated Request (GET `/api/v1/auth/me`)**:
    -   No special headers or body needed if Postman automatically sends cookies.
    -   The `authToken` cookie from the login request will be sent, authenticating the request.

## Useful Dev Utilities
-   `bun --watch src/server.ts`: Provides hot-reloading during development.
-   `dotenv`: For loading environment variables from a `.env` file.
-   `nodemon`: (Assumed from `devDependencies`) Can be used for automatically restarting the server on file changes if `bun --watch` is not preferred.
