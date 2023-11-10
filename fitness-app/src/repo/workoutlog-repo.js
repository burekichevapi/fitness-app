const LOG_WORKOUT_KEY = 'workoutCounts';

export const logWorkout = (bodyPart) => {
  // Retrieve workout counts from localStorage
  const workoutCounts = JSON.parse(localStorage.getItem(LOG_WORKOUT_KEY)) || {};

  // Increment the count for the specified body part
  const currentCount = workoutCounts[bodyPart] || 0;
  workoutCounts[bodyPart] = currentCount + 1;

  // Save the updated counts back to localStorage
  localStorage.setItem(LOG_WORKOUT_KEY, JSON.stringify(workoutCounts));

  console.log(`Workout logged for body part: ${bodyPart}. Total count: ${workoutCounts[bodyPart]}`);
};
