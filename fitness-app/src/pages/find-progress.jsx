import React, { useState, useEffect } from 'react';

import { LOG_WORKOUT_KEY } from '../repo/workoutlog-repo';

const BodyPartCounter = () => {
  const bodyParts = [
    "cardio", "chest", "back", "neck", "waist", 
    "shoulders", "upper legs", "lower legs", "upper arms", "lower arms"
  ];

  const CACHE_KEY = 'bodyPartCounts';

  const loadCountsFromCache = () => {
    const cachedCounts = localStorage.getItem(CACHE_KEY);
    return cachedCounts ? JSON.parse(cachedCounts) : bodyParts.reduce((acc, part) => ({ ...acc, [part]: 0 }), {});
  };

  const [counts, setCounts] = useState(loadCountsFromCache());

  useEffect(() => {
    localStorage.setItem(CACHE_KEY, JSON.stringify(counts));
  }, [counts]);

  const incrementCount = (part) => {
    if (counts[part] < 1000) {
      setCounts({ ...counts, [part]: counts[part] + 1 });
    }
  };

  const decrementCount = (part) => {
    if (counts[part] > 0) {
      setCounts({ ...counts, [part]: counts[part] - 1 });
    }
  };

  const resetCounts = () => {
    const resetCounts = bodyParts.reduce((acc, part) => ({ ...acc, [part]: 0 }), {});
    setCounts(resetCounts);
    localStorage.setItem(CACHE_KEY, JSON.stringify(resetCounts));
    localStorage.setItem(LOG_WORKOUT_KEY, JSON.stringify({}))
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Set Workout Goals</h2>
      <button onClick={resetCounts} style={{ marginBottom: '20px' }}>Reset Workout</button>
      {bodyParts.map(part => (
        <div key={part} style={{ margin: '10px' }}>
          <button onClick={() => decrementCount(part)}>-</button>
          <input type="text" value={counts[part]} readOnly style={{ width: '50px', textAlign: 'center' }} />
          <button onClick={() => incrementCount(part)}>+</button>
          <span style={{ marginLeft: '10px' }}>{part}</span>
        </div>
      ))}
    </div>
  );
};

export default BodyPartCounter;
