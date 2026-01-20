# Client README

This document outlines the setup, usage, and structure of the client-side application.

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
- [Pages/Routes Tree](#pagesroutes-tree)
- [How Auth is Implemented Client-Side](#how-auth-is-implemented-client-side)
- [Build & Run](#build--run)
- [Third-Party Libs](#third-party-libs)
- [Styling & Components](#styling--components)
- [Accessibility & Responsive Notes](#accessibility--responsive-notes)
- [Frontend-Backend Mapping](#frontend-backend-mapping)

## Project Name & Summary
**PrimeTrade Client**: A React-based frontend application for managing todos, interacting with the PrimeTrade API.

## Quick Start
Follow these steps to get the client application up and running locally.

1.  **Install Dependencies**: Navigate to the `client/` directory and install the required packages.
    ```bash
    npm install
    # or yarn install
    ```
2.  **Environment Setup**: Create a `.env.local` file in the `client/` directory and add the following environment variables.
    ```
    VITE_SERVER_URL=http://localhost:8000/api/v1
    ```
3.  **Start the Development Server**:
    ```bash
    npm run dev
    # or yarn dev
    ```

## Environment Variables
The client application uses the following environment variables:

-   `VITE_SERVER_URL`
    -   Example value: `http://localhost:8000/api/v1`
    -   Purpose: Specifies the base URL for the backend API.
    (defined in `client/src/api/axios.ts`)

## Scripts
The following `npm` scripts are available in `client/package.json`:

-   `dev`: Starts the development server with Vite.
-   `build`: Compiles the TypeScript code and builds the project for production.
-   `lint`: Runs ESLint to check for code style issues.
-   `preview`: Serves the production build locally for previewing.

## Docker
A `Dockerfile` is not present in the `client/` directory. Below is a minimal `Dockerfile` and `docker-compose.yml` snippet to run the client in a Docker container.

**`Dockerfile` snippet (to be placed in `client/Dockerfile`)**:

```dockerfile
# Use an official Node.js runtime as a parent image
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**`docker-compose.yml` snippet (to be added to a top-level `docker-compose.yml`)**:

```yaml
  client:
    build: ./client
    ports:
      - "5173:80"
    depends_on:
      - server
    environment:
      VITE_SERVER_URL: http://server:8000/api/v1
```

## Testing & Linting
-   **Linting**: To run the linter, use:
    ```bash
    npm run lint
    # or yarn lint
    ```
-   **Testing**: No specific testing scripts are configured in `package.json`.

## Troubleshooting
-   **CORS issues**: Ensure `VITE_SERVER_URL` in `.env.local` matches your backend URL, and the backend's CORS configuration allows requests from your client's origin.
-   **API calls failing**: Verify the backend server is running and accessible at the `VITE_SERVER_URL` specified.
-   **"Cannot GET /" after build**: Make sure your web server (e.g., Nginx) is correctly configured to serve the static assets from the `dist` directory.
-   **Missing environment variables**: Double-check that all required environment variables are set in `.env.local`.
-   **Dependency installation failures**: Clear `node_modules` and `package-lock.json` (or `yarn.lock`) and try `npm install` again.
-   **Build errors**: Ensure TypeScript is correctly configured and all dependencies are installed.

## Maintenance Notes
-   **Base URL**: The backend API base URL is configured in `client/src/api/axios.ts`.
-   **Adding new pages/routes**: New routes are defined in `client/src/App.tsx` and typically linked from `client/src/components/Navbar.tsx`.
-   **Shared components**: Reusable UI components are located in `client/src/components/`.

## Contributing
To contribute, please:
1.  Fork the repository.
2.  Create a new branch for your feature or bugfix (e.g., `feature/add-dark-mode` or `fix/login-bug`).
3.  Ensure your code adheres to the existing code style.
4.  Open a Pull Request with a clear description of your changes.

## Authors & License
-   **Authors**: [Your Name Here / Contributors]
-   **License**: ISC

## Pages/Routes Tree
The following are the top-level routes and their corresponding components:

-   `/login`: `client/src/pages/LoginPage.tsx`
-   `/register`: `client/src/pages/RegisterPage.tsx`
-   `/dashboard`: `client/src/pages/DashboardPage.tsx` (Protected)
-   `/create-todo`: `client/src/pages/CreateTodoPage.tsx` (Protected)
-   `/todo/:id`: `client/src/pages/TodoDetailPage.tsx` (Protected)
-   `/admin/todos`: `client/src/pages/AdminTodosPage.tsx` (Admin Protected)
-   `*` (catch-all): `client/src/pages/NotFoundPage.tsx`

## How Auth is Implemented Client-Side
Authentication on the client-side involves the following:
-   **Token Storage**: The backend sends an `authToken` as an `httpOnly` cookie, which is automatically handled by the browser and sent with subsequent requests. The client-side does not directly access or store the JWT.
-   **Axios Configuration**: `client/src/api/axios.ts` is configured with `withCredentials: true` to ensure cookies are sent with cross-origin requests.
-   **Protected Routes**:
    -   `client/src/components/ProtectedRoute.tsx`: This component wraps routes that require a logged-in user. It redirects to `/login` if no user is authenticated.
    -   `client/src/components/AdminRoute.tsx`: This component wraps routes that require an authenticated user with an `ADMIN` role. It redirects to `/dashboard` if the user is not an admin.
-   **Auth Context**: `client/src/context/AuthContext.tsx` manages the user's authentication state, including login and logout actions, and fetches the current user on application load.

## Build & Run
-   **Development**: `npm run dev`
-   **Build for Production**: `npm run build`
-   **Preview Production Build**: `npm run preview`

## Third-Party Libs
Major third-party libraries used in the client:
-   `react`: Core React library.
-   `react-dom`: For rendering React components to the DOM.
-   `react-router-dom`: For client-side routing. Used in `client/src/App.tsx` and various components/pages for navigation.
-   `axios`: HTTP client for making API requests. Configured in `client/src/api/axios.ts`.
-   `tailwindcss`: CSS framework for styling. Configuration in `tailwind.config.js` (implicit, not explicitly read).

## Styling & Components
-   **Shared components**: Reusable UI components are located in `client/src/components/`.
-   **Tailwind CSS**: The project uses Tailwind CSS for styling. Configuration details are not explicitly provided in the read files but assumed to be present.
-   **Customizing theme/colors**: Customizations would typically be done in `tailwind.config.js` and `client/src/index.css` (or `App.css`).

## Accessibility & Responsive Notes
Based on a quick review of the UI code, basic responsiveness is handled by Tailwind CSS utility classes. No explicit accessibility (a11y) features or decisions were discovered in the provided code snippets beyond standard HTML elements.

## Backend API Reference

The frontend application strictly adheres to the API contract defined in the backend's Swagger/OpenAPI specification. This ensures consistent communication and data structures between the client and server.

-   **API Specification**: Refer to `server/swagger.yaml` for the complete backend API reference.
-   **API Testing**: The backend APIs can be tested independently of the frontend using a tool like Postman. While no Postman collection is provided in this repository, one can be generated from the `server/swagger.yaml` file. Authentication for testing purposes typically involves obtaining a JWT token (e.g., via the `/api/v1/auth/login` endpoint) and including it in subsequent requests.
-   **API Base URL Configuration**: The backend API base URL for the frontend is configured in `client/src/api/axios.ts` via the `VITE_SERVER_URL` environment variable.
