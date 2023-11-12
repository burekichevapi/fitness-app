export const LOG_WORKOUT_KEY = 'workoutCounts';

export const logWorkout = (bodyPart) => {
  const workoutCounts = JSON.parse(localStorage.getItem(LOG_WORKOUT_KEY)) || {};

  const currentCount = workoutCounts[bodyPart] || 0;
  workoutCounts[bodyPart] = currentCount + 1;

  localStorage.setItem(LOG_WORKOUT_KEY, JSON.stringify(workoutCounts));

  console.log(`Workout logged for body part: ${bodyPart}. Total count: ${workoutCounts[bodyPart]}`);
};
