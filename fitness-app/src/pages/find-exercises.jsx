import { useState, useEffect, useCallback } from "react";
import { getExercisesByBodyPart } from "../repo/exercises-repo";
import { handleSaveExercise } from "../repo/favorite-repo";
import ExerciseCard from "../components/exerciseCard/exerciseCard";

const FindExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [maxResults, setMaxResults] = useState(1);
  const [checkboxBodyParts, setCheckboxBodyParts] = useState([
    { name: "cardio", checked: false },
    { name: "chest", checked: false },
    { name: "back", checked: false },
    { name: "neck", checked: false },
    { name: "waist", checked: false },
    { name: "shoulders", checked: false },
    { name: "upper legs", checked: false },
    { name: "lower legs", checked: false },
    { name: "upper arms", checked: false },
    { name: "lower arms", checked: false },
  ]);

  // ... existing state declarations
  const [favoritingStatus, setFavoritingStatus] = useState({});

  const handleFavoriteClick = (exerciseId) => {
    // Trigger the flash effect
    setFavoritingStatus({ ...favoritingStatus, [exerciseId]: true });

    // Call the existing favorite function
    handleSaveExercise(exerciseId);

    // Reset the effect after a short delay
    setTimeout(() => {
      setFavoritingStatus({ ...favoritingStatus, [exerciseId]: false });
    }, 500); // Adjust the duration as needed
  };

  const findSelectedExercises = useCallback(async () => {
    let exerciseResults = [];
    const checkedBoxes = [...checkboxBodyParts].filter((c) => c.checked);

    for (const box of checkedBoxes) {
      const bodyPart = await getExercisesByBodyPart(box.name, maxResults);
      exerciseResults = exerciseResults.concat(bodyPart);
    }

    setExercises(exerciseResults);
  }, [checkboxBodyParts, maxResults]);

  useEffect(() => {
    findSelectedExercises();
  }, [checkboxBodyParts, maxResults, findSelectedExercises]);

  const handleChangeMaxResult = (e) =>
    setMaxResults(parseInt(e.target.value, 10));

  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = [...checkboxBodyParts];
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;

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
                  <label>Number of exercises for each selected:</label>
                  <select
                    className="form-control"
                    value={maxResults}
                    onChange={handleChangeMaxResult}
                  >
                    <option value={1}>1</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
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
              <ExerciseCard
                showRemoveFavorite={false} // hide the Remove Favorite button
                exercise={exercise}
              />
              <button
                className={`btn btn-primary mt-2 ${
                  favoritingStatus[exercise.id] ? "flash-effect" : ""
                }`}
                style={{ marginLeft: "100px" }}
                onClick={() => handleFavoriteClick(exercise.id)}
              >
                Favorite
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindExercises;
