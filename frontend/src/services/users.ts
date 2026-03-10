import apiClient from './api';
import { User, PaginatedResponse, SingleResponse } from '../types';

export const userService = {
  getCurrentUser: async (): Promise<SingleResponse<User>> => {
    const response = await apiClient.get('/users/me');
    return response.data;
  },

  getAllUsers: async (): Promise<PaginatedResponse<User>> => {
    const response = await apiClient.get('/users');
    return response.data;
  },

  getUsersByRole: async (role: string): Promise<PaginatedResponse<User>> => {
    const response = await apiClient.get(`/users/role/${role}`);
    return response.data;
  },
};
