
import API from './axios';
import type{ User, ApiResponse } from '../types';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload extends LoginPayload {
  name: string;
}

const authService = {
  login: async (payload: LoginPayload) => {
    const response = await API.post<ApiResponse<User>>('/auth/login', payload);
    return response.data.data;
  },

  register: async (payload: RegisterPayload) => {
    const response = await API.post<ApiResponse<User>>('/auth/register', payload);
    return response.data.data;
  },

  getCurrentUser: async () => {
    const response = await API.get<ApiResponse<User>>('/auth/me');
    return response.data.data;
  },

  logout: async () => {
    // Backend does not have an explicit logout route that clears the cookie.
    // Frontend will clear its state.
    // The cookie will eventually expire or be removed by the browser.
    return Promise.resolve();
  },
};

export default authService;
