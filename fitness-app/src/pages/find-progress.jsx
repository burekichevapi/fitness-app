import React, { useState, useEffect } from "react";
import { LOG_WORKOUT_KEY } from "../repo/workoutlog-repo";

const BodyPartCounter = () => {
  const bodyParts = [
    "cardio",
    "chest",
    "back",
    "neck",
    "waist",
    "shoulders",
    "upper legs",
    "lower legs",
    "upper arms",
    "lower arms",
  ];

  const CACHE_KEY = "bodyPartCounts";

  const loadCountsFromCache = () => {
    const cachedCounts = localStorage.getItem(CACHE_KEY);
    return cachedCounts
      ? JSON.parse(cachedCounts)
      : bodyParts.reduce((acc, part) => ({ ...acc, [part]: 0 }), {});
  };

  const [counts, setCounts] = useState(loadCountsFromCache());

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
  
    // Reset the workout logs
    const resetWorkoutLogs = bodyParts.reduce((acc, part) => ({ ...acc, [part]: 0 }), {});
    setWorkoutLogs(resetWorkoutLogs);
  
    localStorage.setItem(CACHE_KEY, JSON.stringify(resetCounts));
    localStorage.setItem(LOG_WORKOUT_KEY, JSON.stringify(resetWorkoutLogs));
  };

  // New state for storing workout logs
  const [workoutLogs, setWorkoutLogs] = useState(() => {
    const logs = localStorage.getItem(LOG_WORKOUT_KEY);
    return logs
      ? JSON.parse(logs)
      : bodyParts.reduce((acc, part) => ({ ...acc, [part]: 0 }), {});
  });

  useEffect(() => {
    localStorage.setItem(CACHE_KEY, JSON.stringify(counts));
  }, [counts]);

  // New effect for updating workout logs
  useEffect(() => {
    localStorage.setItem(LOG_WORKOUT_KEY, JSON.stringify(workoutLogs));
  }, [workoutLogs]);

  const [showCongratsPopup, setShowCongratsPopup] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Workout Goals and Progress</h2>
      {bodyParts.map((part) => (
        <div
          key={part}
          style={{ display: "flex", alignItems: "center", margin: "10px" }}
        >
          <button onClick={() => decrementCount(part)}>-</button>
          <input
            type="text"
            value={counts[part]}
            readOnly
            style={{ width: "50px", textAlign: "center", marginRight: "10px" }}
          />
          <button onClick={() => incrementCount(part)}>+</button>
          <input
            type="text"
            value={
              counts[part] === 0 &&
              (workoutLogs[part] === 0 || workoutLogs[part] === undefined)
                ? ""
                : `${workoutLogs[part] || 0} / ${counts[part]}`
            }
            readOnly
            style={{
              width: "100px",
              textAlign: "center",
              marginLeft: "50px",
              marginRight: "10px",
              backgroundColor:
                counts[part] === 0 &&
                (workoutLogs[part] === 0 || workoutLogs[part] === undefined)
                  ? "lightgray"
                  : counts[part] <= workoutLogs[part]
                  ? "lightgreen"
                  : "white",
            }}
          />
          <span style={{ marginLeft: "10px" }}>{part}</span>
        </div>
      ))}
      <button onClick={resetCounts} style={{ marginBottom: "20px" }}>
        Reset Workout
      </button>
    </div>
  );
};

export default BodyPartCounter;
