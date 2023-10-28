import { useState, useEffect } from "react";
import { getExercisesByBodyPart } from "../services/exercises-service";
import ExerciseCard from "../components/exerciseCard";
import { useCallback } from "react";

const FindExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [maxResults, setMaxResults] = useState(9);
  const [checkboxBodyParts, setCheckboxBodyParts] = useState([
    { name: "all", checked: false },
    { name: "cardio", checked: false },
    { name: "chest", checked: false },
    { name: "back", checked: false },
    { name: "neck", checked: false },
    { name: "waist", checked: false },
    { name: "shoulders", checked: false },
    { name: "lowerArms", checked: false },
    { name: "lowerLegs", checked: false },
    { name: "upperArms", checked: false },
    { name: "upperLegs", checked: false },
  ]);

  const findSelectedExercises = useCallback((checkboxes) => {
    let exerciseResults = [];

    checkboxes.filter((c) => c.checked).forEach((checkbox) => {
      const bodyPart = getExercisesByBodyPart(checkbox.name, maxResults);
      exerciseResults = exerciseResults.concat(bodyPart);
    });

    setExercises(exerciseResults);
  }, [maxResults]);

  useEffect(() => {
    findSelectedExercises([...checkboxBodyParts]);
  }, [checkboxBodyParts, maxResults, findSelectedExercises]);

  const handleChangeMaxResult = (event) => {
    const max = parseInt(event.target.value, 10);
    setMaxResults(max);
  };

  const updateCheckboxes = (checkboxes, index) => {
    checkboxes[index].checked = !checkboxes[index].checked;

    if (checkboxes[index].name === "all") {
      checkboxes.forEach(check => {
        if (check.name !== "all") check.checked = false
      });
    }
    else checkboxes[0].checked = false;
  };

  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = [...checkboxBodyParts];
    updateCheckboxes(updatedCheckboxes, index);
    setCheckboxBodyParts(updatedCheckboxes);
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row mb-3">
          <div className="col-md-6">
            <h2>Find Exercises</h2>
            <form className="row">
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label>Max results:</label>
                  <select
                    className="form-control"
                    value={maxResults}
                    onChange={handleChangeMaxResult}
                  >
                    <option value={9}>10</option>
                    <option value={24}>25</option>
                    <option value={49}>50</option>
                    <option value={99}>100</option>
                    <option value={149}>150</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-check form-check-column">
                  {checkboxBodyParts.map((checkbox, index) => (
                    <div className="form-check" key={index}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={checkbox.checked}
                        onChange={() => handleCheckboxChange(index)}
                      />
                      <label className="form-check-label">{checkbox.name}</label>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="col-md-4 mb-4">
              <ExerciseCard exercise={exercise} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindExercises;
