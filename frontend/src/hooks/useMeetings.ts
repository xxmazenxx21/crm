import { useState, useCallback } from 'react';
import { Meeting, CreateMeetingInput } from '../types';
import { meetingService } from '../services/meetings';

export const useMeetings = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllMeetings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await meetingService.getAllMeetings();
      setMeetings(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch meetings');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMeetingsByDay = useCallback(async (date: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await meetingService.getMeetingsByDay(date);
      setMeetings(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch meetings');
    } finally {
      setLoading(false);
    }
  }, []);

  const createMeeting = useCallback(async (data: CreateMeetingInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await meetingService.createMeeting(data);
      setMeetings((prev: Meeting[]) => [response.data, ...prev]);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create meeting');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteMeeting = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await meetingService.deleteMeeting(id);
      setMeetings((prev: Meeting[]) => prev.filter((m: Meeting) => m._id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete meeting');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    meetings,
    loading,
    error,
    fetchAllMeetings,
    fetchMeetingsByDay,
    createMeeting,
    deleteMeeting,
  };
};
