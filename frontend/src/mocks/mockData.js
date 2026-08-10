export const mockUser = {
  id: 1,
  username: "carlos",
  first_name: "Carlos",
  last_name: "Silva",
  email: "carlos@example.com",
};

export const mockWorkouts = [
  {
    id: 101,
    name: "Upper Power",
    day: "Segunda",
    exercises: [
      { id: 1001, name: "Supino Reto", sets: 4, reps: 6 },
      { id: 1002, name: "Remada Curvada", sets: 4, reps: 8 },
    ],
  },
  {
    id: 102,
    name: "Lower Strength",
    day: "Quarta",
    exercises: [
      { id: 1003, name: "Agachamento", sets: 5, reps: 5 },
      { id: 1004, name: "Levantamento Terra", sets: 3, reps: 5 },
    ],
  },
];

// Simulated workout logs (progression over time)
export const mockLogs = [
  {
    id: 5001,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21).toISOString(),
    date_display: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21).toLocaleDateString(),
    duration_minutes: 55,
    total_volume: 4000,
    workout_protocol: "Upper Power",
    exercise_logs: [
      { id: 9001, name: "Supino Reto", sets_completed: 4, reps_completed: 6, weight_used: 80 },
      { id: 9002, name: "Remada Curvada", sets_completed: 4, reps_completed: 8, weight_used: 70 },
    ],
  },
  {
    id: 5002,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    date_display: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toLocaleDateString(),
    duration_minutes: 60,
    total_volume: 4600,
    workout_protocol: "Lower Strength",
    exercise_logs: [
      { id: 9003, name: "Agachamento", sets_completed: 5, reps_completed: 5, weight_used: 140 },
      { id: 9004, name: "Levantamento Terra", sets_completed: 3, reps_completed: 5, weight_used: 160 },
    ],
  },
  {
    id: 5003,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    date_display: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toLocaleDateString(),
    duration_minutes: 52,
    total_volume: 4800,
    workout_protocol: "Upper Power",
    exercise_logs: [
      { id: 9005, name: "Supino Reto", sets_completed: 4, reps_completed: 6, weight_used: 85 },
      { id: 9006, name: "Remada Curvada", sets_completed: 4, reps_completed: 8, weight_used: 75 },
    ],
  },
  {
    id: 5004,
    date: new Date().toISOString(),
    date_display: new Date().toLocaleDateString(),
    duration_minutes: 50,
    total_volume: 5000,
    workout_protocol: "Upper Power",
    exercise_logs: [
      { id: 9007, name: "Supino Reto", sets_completed: 4, reps_completed: 6, weight_used: 90 },
      { id: 9008, name: "Remada Curvada", sets_completed: 4, reps_completed: 8, weight_used: 78 },
    ],
  },
];

export default { mockUser, mockWorkouts, mockLogs };