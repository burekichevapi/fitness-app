const CACHE_KEY = "bodyPartCounts";
const LOG_WORKOUT_KEY = "workoutCounts";

const loadCountsFromCache = (bodyParts) => {
  const cachedCounts = localStorage.getItem(CACHE_KEY);
  return cachedCounts
    ? JSON.parse(cachedCounts)
    : bodyParts.reduce((acc, part) => ({ ...acc, [part]: 0 }), {});
};

const loadWorkoutLogsFromCache = (bodyParts) => {
  const logs = localStorage.getItem(LOG_WORKOUT_KEY);
  return logs
    ? JSON.parse(logs)
    : bodyParts.reduce((acc, part) => ({ ...acc, [part]: 0 }), {});
};

const updateCountsInCache = (counts) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(counts));
};

const updateWorkoutLogsInCache = (workoutLogs) => {
  localStorage.setItem(LOG_WORKOUT_KEY, JSON.stringify(workoutLogs));
};

const resetCache = (bodyParts) => {
  console.log('resetting the cache');
  const resetCounts = bodyParts.reduce((acc, part) => ({ ...acc, [part]: 0 }), {});
  localStorage.setItem(CACHE_KEY, JSON.stringify(resetCounts));
  localStorage.setItem(LOG_WORKOUT_KEY, JSON.stringify(resetCounts));
};

export { loadCountsFromCache, loadWorkoutLogsFromCache, updateCountsInCache, updateWorkoutLogsInCache, resetCache };
