import api from './api';

export const getWorkouts = async () => {
  const response = await api.get('/workouts/');
  return response.data;
};


export const getWorkoutStats = async () => {
  const response = await api.get('/workouts/logs/stats/');
  return response.data;
};

export const createWorkout = async (workoutData) => {
  const response = await api.post('/workouts/', workoutData);
  return response.data;
};


export const deleteWorkout = async (id) => {
  const response = await api.delete(`/workouts/${id}/`);
  return response.data;
};


export const createWorkoutLog = async (logData) => {
  const response = await api.post('/workouts/logs/', logData);
  return response.data;
};


export const getWorkoutLogs = async () => {
  const response = await api.get('/workouts/logs/');
  return response.data;
};


export const getWorkoutLogDetail = async (id) => {
  const response = await api.get(`/workouts/logs/${id}/`);
  return response.data;
};