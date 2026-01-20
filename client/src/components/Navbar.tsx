
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">PrimeTrade</Link>
        <div>
          {user ? (
            <>
              <span className="mr-4">Welcome, {user.name} ({user.role})</span>
              <Link to="/dashboard" className="mr-4 hover:text-gray-300">Dashboard</Link>
              {user.role === 'ADMIN' && (
                <Link to="/admin/todos" className="mr-4 hover:text-gray-300">Admin Todos</Link>
              )}
              <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4 hover:text-gray-300">Login</Link>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
