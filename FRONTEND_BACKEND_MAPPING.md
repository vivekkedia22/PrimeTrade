# Frontend-Backend API Mapping

This document provides a mapping of backend API endpoints to the frontend pages and components that consume them.

## Auth Endpoints

| Backend Endpoint (Method, Path) | Frontend Page/Component Consuming It | Source File(s)                                   |
| :------------------------------ | :----------------------------------- | :----------------------------------------------- |
| `POST /api/v1/auth/register`    | Register Page                        | `client/src/pages/RegisterPage.tsx`              |
| `POST /api/v1/auth/login`       | Login Page                           | `client/src/pages/LoginPage.tsx`                 |
| `GET /api/v1/auth/me`           | Auth Context (on app load), Navbar   | `client/src/context/AuthContext.tsx`             |
|                                 |                                      | `client/src/components/Navbar.tsx`               |

## Todo Endpoints

| Backend Endpoint (Method, Path)   | Frontend Page/Component Consuming It | Source File(s)                                   |
| :-------------------------------- | :----------------------------------- | :----------------------------------------------- |
| `POST /api/v1/todo`               | Create Todo Page                     | `client/src/pages/CreateTodoPage.tsx`            |
| `GET /api/v1/todo/admin`          | Admin Todos Page                     | `client/src/pages/AdminTodosPage.tsx`            |
| `GET /api/v1/todo/me`             | Dashboard Page                       | `client/src/pages/DashboardPage.tsx`             |
| `GET /api/v1/todo/{id}`           | Todo Detail Page                     | `client/src/pages/TodoDetailPage.tsx`            |
| `PATCH /api/v1/todo/{id}/status`  | Todo Detail Page                     | `client/src/pages/TodoDetailPage.tsx`            |
