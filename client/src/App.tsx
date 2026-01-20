
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CreateTodoPage from './pages/CreateTodoPage';
import TodoDetailPage from './pages/TodoDetailPage';
import AdminTodosPage from './pages/AdminTodosPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading application...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {user ? (
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          ) : (
            <Route path="/" element={<Navigate to="/login" replace />} />
          )}
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/create-todo" element={<CreateTodoPage />} />
            <Route path="/todo/:id" element={<TodoDetailPage />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/admin/todos" element={<AdminTodosPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
