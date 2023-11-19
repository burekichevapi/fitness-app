import React, { useState, useEffect } from "react";

import {
  loadCountsFromCache,
  loadWorkoutLogsFromCache,
  updateCountsInCache,
  updateWorkoutLogsInCache,
  resetCache,
} from "../repo/progress-repo";

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

  const [counts, setCounts] = useState(() => loadCountsFromCache(bodyParts));
  const [workoutLogs, setWorkoutLogs] = useState(() =>
    loadWorkoutLogsFromCache(bodyParts)
  );

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
    const resetValues = bodyParts.reduce((acc, part) => ({ ...acc, [part]: 0 }), {});
    setCounts(resetValues);
    setWorkoutLogs(resetValues);
    resetCache(bodyParts);
  };

  useEffect(() => {
    updateCountsInCache(counts);
  }, [counts]);

  useEffect(() => {
    updateWorkoutLogsInCache(workoutLogs);
  }, [workoutLogs]);

  return (
    <div>
      <style>
        {`
          @media (max-width: 710px) {
            .hide-on-small {
              display: none;
            }
          }
        `}
      </style>
      <div
        className="container mt-5 hide-on-small"
        style={{ minWidth: "710px" }}
      >
        <div style={{ padding: "20px" }}>
          <h2>Workout Goals and Progress</h2>
          <br></br>
          <pre> My Goal Progress</pre>
          <div className="goalAndProgress">
            {bodyParts.map((part) => (
              <div
                key={part}
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "10px",
                }}
              >
                <div className="goalChange">
                  <button onClick={() => decrementCount(part)}>-</button>
                  <input
                    type="text"
                    value={counts[part]}
                    readOnly
                    style={{
                      width: "50px",
                      textAlign: "center",
                      marginRight: "10px",
                    }}
                  />
                  <button onClick={() => incrementCount(part)}>+</button>
                </div>
                <div className="myProgress">
                  <input
                    type="text"
                    value={
                      counts[part] === 0 &&
                      (workoutLogs[part] === 0 ||
                        workoutLogs[part] === undefined)
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
                        (workoutLogs[part] === 0 ||
                          workoutLogs[part] === undefined)
                          ? "lightgray"
                          : counts[part] <= workoutLogs[part]
                          ? "lightgreen"
                          : "white",
                    }}
                  />
                  <span style={{ marginLeft: "10px" }}>{part}</span>
                </div>
              </div>
            ))}
          </div>
          <button onClick={resetCounts} style={{ marginBottom: "20px" }}>
            Reset Workout
          </button>
        </div>
      </div>
    </div>
  );
};

export default BodyPartCounter;
