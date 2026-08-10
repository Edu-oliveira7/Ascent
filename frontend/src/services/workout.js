import api from './api';
import { mockWorkouts, mockLogs } from '../mocks/mockData';

export const getWorkouts = async () => {
  try {
    const response = await api.get('workouts/');
    return response.data;
  } catch (err) {
    console.warn('getWorkouts failed, returning mockWorkouts', err.message);
    return mockWorkouts;
  }
};

export const getWorkoutStats = async () => {
  try {
    const response = await api.get('workouts/logs/stats/');
    return response.data;
  } catch (err) {
    console.warn('getWorkoutStats failed, returning empty stats', err.message);
    // derive simple stats from mockLogs
    const totalSessions = mockLogs.length;
    const latest = mockLogs[mockLogs.length - 1] || null;
    return { total_sessions: totalSessions, latest_session: latest };
  }
};

export const createWorkout = async (workoutData) => {
  const response = await api.post('workouts/', workoutData);
  return response.data;
};

export const deleteWorkout = async (id) => {
  try {
    const response = await api.delete(`workouts/${id}/`);
    return response.data;
  } catch (err) {
    console.warn('deleteWorkout failed (mock)', err.message);
    return { success: true };
  }
};

export const getWorkout = async (id) => {
  try {
    const response = await api.get(`workouts/${id}/`);
    return response.data;
  } catch (err) {
    console.warn('getWorkout failed, returning mock item', err.message);
    return mockWorkouts.find((w) => String(w.id) === String(id)) || null;
  }
};

export const createWorkoutLog = async (logData) => {
  const response = await api.post('workouts/logs/', logData);
  return response.data;
};

export const getWorkoutLogs = async () => {
  try {
    const response = await api.get('workouts/logs/');
    return response.data;
  } catch (err) {
    console.warn('getWorkoutLogs failed, returning mockLogs', err.message);
    return mockLogs;
  }
};

export const getWorkoutLogDetail = async (id) => {
  try {
    const response = await api.get(`workouts/logs/${id}/`);
    return response.data;
  } catch (err) {
    console.warn('getWorkoutLogDetail failed, returning mock log', err.message);
    return mockLogs.find((l) => String(l.id) === String(id)) || null;
  }
};