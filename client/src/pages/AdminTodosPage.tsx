
import  { useState, useEffect } from 'react';
import todoService from '../api/todoService';
import type{ Todo } from '../types';
import { getErrorMessage } from '../utils/errorHandler';
import { Link } from 'react-router-dom';

const AdminTodosPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [searchTerm, setSearchTerm] = useState('');
  // const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // useEffect(() => {
  //   const timerId = setTimeout(() => {
  //     setDebouncedSearchTerm(searchTerm);
  //   }, 500);

  //   return () => {
  //     clearTimeout(timerId);
  //   };
  // }, [searchTerm]);

  useEffect(() => {
    const fetchAllTodos = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await todoService.getAllTodosAdmin();
        setTodos(data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchAllTodos();
  }, []);

  if (loading) {
    return <div className="container mx-auto mt-8 text-center">Loading all todos...</div>;
  }

  if (error) {
    return <div className="container mx-auto mt-8 text-center text-red-500">Error: {error}</div>;
  }

  return     <div className="container mx-auto mt-8 p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin All Todos</h2>
      {todos.length === 0 ? (
        <p className="text-center text-gray-600">No todos found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {todos.map((todo) => (
            <div key={todo.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-2">{todo.title}</h3>
              <p className="text-gray-700 mb-4">{todo.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Status: <span className="font-medium text-indigo-600">{todo.status}</span></span>
                <span>Owner Name: {todo.ownerId.name}</span>
                <Link to={`/todo/${todo.id}`} className="text-indigo-600 hover:underline">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

};

export default AdminTodosPage;
