
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import todoService from '../api/todoService';
import type{ Todo } from '../types';
import { getErrorMessage } from '../utils/errorHandler';

const DashboardPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyTodos = async () => {
      try {
        const data = await todoService.getMyTodos();
        setTodos(data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchMyTodos();
  }, []);

  if (loading) {
    return <div className="container mx-auto mt-8 text-center">Loading todos...</div>;
  }

  if (error) {
    return <div className="container mx-auto mt-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">My Dashboard</h2>
      <div className="flex justify-end mb-4">
        <Link to="/create-todo" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Create New Todo</Link>
      </div>
      {todos.length === 0 ? (
        <p className="text-center text-gray-600">No todos found. Start by creating one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {todos.map((todo) => (
            <div key={todo.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-2">{todo.title}</h3>
              <p className="text-gray-700 mb-4">{todo.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Status: <span className="font-medium text-indigo-600">{todo.status}</span></span>
                <Link to={`/todo/${todo.id}`} className="text-indigo-600 hover:underline">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
