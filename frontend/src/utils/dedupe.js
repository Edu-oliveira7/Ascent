export function dedupeWorkouts(workouts) {
  const seen = new Set();
  return workouts.filter((workout) => {
    const key = `${String(workout.name || '').trim().toLowerCase()}:${String(workout.day || '').trim()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
