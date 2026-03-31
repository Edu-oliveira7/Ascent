import api from './api';

export const getWorkouts = async () => {
  const token = localStorage.getItem('access'); 
  const response = await api.get('/workouts/', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createWorkout = async (workoutData) => {
  const token = localStorage.getItem('access');
  const response = await api.post('/workouts/', workoutData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};