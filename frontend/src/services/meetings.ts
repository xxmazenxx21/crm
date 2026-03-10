import apiClient from './api';
import { Meeting, CreateMeetingInput, SingleResponse, PaginatedResponse } from '../types';

export const meetingService = {
  createMeeting: async (data: CreateMeetingInput): Promise<SingleResponse<Meeting>> => {
    const response = await apiClient.post('/meetings', data);
    return response.data;
  },

  getAllMeetings: async (): Promise<PaginatedResponse<Meeting>> => {
    const response = await apiClient.get('/meetings');
    return response.data;
  },

  getMeetingsByDay: async (date: string): Promise<PaginatedResponse<Meeting>> => {
    const response = await apiClient.get(`/meetings/day/${date}`);
    return response.data;
  },

  getManagerAllMeetings: async (): Promise<PaginatedResponse<Meeting>> => {
    const response = await apiClient.get('/meetings/manager/all');
    return response.data;
  },

  getMeetingById: async (id: string): Promise<SingleResponse<Meeting>> => {
    const response = await apiClient.get(`/meetings/${id}`);
    return response.data;
  },

  updateMeeting: async (id: string, data: Partial<CreateMeetingInput>): Promise<SingleResponse<Meeting>> => {
    const response = await apiClient.patch(`/meetings/${id}`, data);
    return response.data;
  },

  deleteMeeting: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.delete(`/meetings/${id}`);
    return response.data;
  },
};
