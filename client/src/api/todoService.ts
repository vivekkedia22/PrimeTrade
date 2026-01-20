
import API from './axios';
import type{ Todo, ApiResponse } from '../types';
import type { TodoStatusLiteral } from '../types';

interface CreateTodoPayload {
  title: string;
  description: string;
}

interface UpdateTodoStatusPayload {
  status: TodoStatusLiteral;
}

const todoService = {
  createTodo: async (payload: CreateTodoPayload) => {
    const response = await API.post<ApiResponse<Todo>>('/todo', payload);
    return response.data.data;
  },

  getAllTodosAdmin: async (title?: string) => {
    const params = title ? { title } : {};
    const response = await API.get<ApiResponse<Todo[]>>('/todo/admin', { params });
    return response.data.data;
  },

  getMyTodos: async () => {
    const response = await API.get<ApiResponse<Todo[]>>('/todo/me');
    return response.data.data;
  },

  getTodoById: async (id: string) => {
    const response = await API.get<ApiResponse<Todo>>(`/todo/${id}`);
    return response.data.data;
  },

  updateTodoStatus: async (id: string, payload: UpdateTodoStatusPayload) => {
    const response = await API.patch<ApiResponse<Todo>>(`/todo/${id}/status`, payload);
    return response.data.data;
  },
};

export default todoService;
