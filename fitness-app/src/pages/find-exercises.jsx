import { useState, useEffect, useCallback } from "react";
import { getExercisesByBodyPart } from "../repo/exercises-repo";
import ExerciseCard from "../components/exerciseCard";

const FindExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [maxResults, setMaxResults] = useState(1);
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

  const findSelectedExercises = useCallback(async (checkboxes) => {
    let exerciseResults = [];

    const checkedBoxes = checkboxes.filter((c) => c.checked);

    for (const box of checkedBoxes) {
      const bodyPart = await getExercisesByBodyPart(box.name, maxResults);
      exerciseResults = exerciseResults.concat(bodyPart);
    }

    setExercises(exerciseResults);
  }, [maxResults]);

  useEffect(() => {
    findSelectedExercises([...checkboxBodyParts]);
  }, [checkboxBodyParts, maxResults, findSelectedExercises]);

  const handleChangeMaxResult = (e) =>
    setMaxResults(parseInt(e.target.value, 10));

  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = [...checkboxBodyParts];
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;

    if (updatedCheckboxes[index].name === "all") {
      updatedCheckboxes.forEach(check => {
        if (check.name !== "all") check.checked = false
      });
    }
    else updatedCheckboxes[0].checked = false;

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
                    <option value={1}>1</option>
                    <option value={4}>5</option>
                    <option value={9}>10</option>
                    <option value={14}>15</option>
                  </select>
                </div>
              </div>
            </form>
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
