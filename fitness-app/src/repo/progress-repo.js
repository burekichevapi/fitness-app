const WORKOUT_GOAL_KEY = "workoutPlanCounts";
const ACTUAL_WORKOUT_KEY = "completedWorkoutCounts";
const ACTUAL_WORKOUT_DETAILS_KEY = "completedWorkoutDetails";

const loadCountsFromCache = (bodyParts) => {
  const cachedCounts = localStorage.getItem(WORKOUT_GOAL_KEY);
  return cachedCounts
    ? JSON.parse(cachedCounts)
    : bodyParts.reduce((acc, part) => ({ ...acc, [part]: 0 }), {});
};

const loadWorkoutLogsFromCache = (bodyParts) => {
  const logs = localStorage.getItem(ACTUAL_WORKOUT_KEY);
  return logs
    ? JSON.parse(logs)
    : bodyParts.reduce((acc, part) => ({ ...acc, [part]: 0 }), {});
};

const updateCountsInCache = (counts) => {
  localStorage.setItem(WORKOUT_GOAL_KEY, JSON.stringify(counts));
};

const updateWorkoutLogsInCache = (workoutLogs) => {
  localStorage.setItem(ACTUAL_WORKOUT_KEY, JSON.stringify(workoutLogs));
};

const resetCache = (bodyParts) => {
  console.log("resetting the cache");
  const resetCounts = bodyParts.reduce(
    (acc, part) => ({ ...acc, [part]: 0 }),
    {}
  );
  localStorage.setItem(WORKOUT_GOAL_KEY, JSON.stringify(resetCounts));
  localStorage.setItem(ACTUAL_WORKOUT_KEY, JSON.stringify(resetCounts));
};

const logWorkout = (bodyPart) => {
  const workoutCounts =
    JSON.parse(localStorage.getItem(ACTUAL_WORKOUT_KEY)) || {};

  const currentCount = workoutCounts[bodyPart] || 0;
  workoutCounts[bodyPart] = currentCount + 1;

  localStorage.setItem(ACTUAL_WORKOUT_KEY, JSON.stringify(workoutCounts));

  console.log(
    `Workout logged for body part: ${bodyPart}. Total count: ${workoutCounts[bodyPart]}`
  );
};

const saveWorkoutDetails = (exerciseName, details) => {
  const workouts = JSON.parse(localStorage.getItem(ACTUAL_WORKOUT_DETAILS_KEY)) || {};

  if (!workouts[exerciseName]) {
    workouts[exerciseName] = [];
  }

  workouts[exerciseName].push(details);

  localStorage.setItem(ACTUAL_WORKOUT_DETAILS_KEY, JSON.stringify(workouts));
};

const getWorkoutDetails = (exerciseName) => {
  const workouts = JSON.parse(localStorage.getItem(ACTUAL_WORKOUT_DETAILS_KEY)) || {};
  return workouts[exerciseName];
};

export {
  loadCountsFromCache,
  loadWorkoutLogsFromCache,
  updateCountsInCache,
  updateWorkoutLogsInCache,
  resetCache,
  logWorkout,
  saveWorkoutDetails,
  getWorkoutDetails
};
