
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import todoService from '../api/todoService';
import type{ Todo } from '../types';
import { TODO_STATUS } from '../utils/constants';
import type { TodoStatusLiteral } from '../types';
// import type { TODO_STATUS as TodoStatusType } from '../types';
import { getErrorMessage } from '../utils/errorHandler';

const TodoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [statusError, setStatusError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodo = async () => {
      if (!id) {
        setError('Todo ID is missing');
        setLoading(false);
        return;
      }
      try {
        const data = await todoService.getTodoById(id);
        setTodo(data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchTodo();
  }, [id]);

  const handleStatusChange = async (newStatus: TodoStatusLiteral) => {
    if (!id || !todo) return;
    setIsUpdatingStatus(true);
    setStatusError(null);
    try {
      const updated = await todoService.updateTodoStatus(id, { status: newStatus });
      setTodo(updated);
    } catch (err) {
      setStatusError(getErrorMessage(err));
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto mt-8 text-center">Loading todo...</div>;
  }

  if (error) {
    return <div className="container mx-auto mt-8 text-center text-red-500">Error: {error}</div>;
  }

  if (!todo) {
    return <div className="container mx-auto mt-8 text-center">Todo not found.</div>;
  }

  return (
    <div className="container mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4">Todo: {todo.title}</h2>
      <p className="text-gray-700 mb-4">{todo.description}</p>
      <p className="text-gray-600 mb-2">Status: <span className="font-semibold text-indigo-600">{todo.status}</span></p>
      <p className="text-gray-600 mb-4">Created At: {new Date(todo.createdAt).toLocaleDateString()}</p>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">Update Status</h3>
        <div className="flex space-x-4">
          {Object.values(TODO_STATUS).map((statusOption) => (
            <button
              key={statusOption}
              onClick={() => handleStatusChange(statusOption as TodoStatusLiteral)}
              disabled={isUpdatingStatus || todo.status === statusOption}
              className={`px-4 py-2 rounded ${todo.status === statusOption ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
            </button>
          ))}
        </div>
        {statusError && <p className="text-red-500 text-sm mt-2">{statusError}</p>}
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-8 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default TodoDetailPage;
