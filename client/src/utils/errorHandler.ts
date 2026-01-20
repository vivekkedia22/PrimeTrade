
import { AxiosError } from 'axios';
import type{ ApiErrorResponse } from '../types';

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const apiError = error.response?.data as ApiErrorResponse;
    return apiError?.message || error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
};
