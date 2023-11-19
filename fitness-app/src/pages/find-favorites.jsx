import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ExerciseCard from "../components/exerciseCard/exerciseCard";
import { getExercisesById } from "../repo/exercises-repo";
import { logWorkout, saveWorkoutDetails, getWorkoutDetails } from "../repo/progress-repo";
import {
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../repo/favorite-repo";

const DisplayFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteExercisesData, setFavoriteExercisesData] = useState([]);
  const [workoutDetails, setWorkoutDetails] = useState({
    time: "",
    sets: "",
    reps: "",
  });
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showWorkoutDetailsModal, setShowWorkoutDetailsModal] = useState(false);
  const [previousWorkoutDetails, setPreviousWorkoutDetails] = useState([]);

  useEffect(() => {
    const favoritesFromStorage = getFavoritesFromLocalStorage();
    if (favoritesFromStorage) {
      setFavorites(favoritesFromStorage);
    }
  }, []);

  useEffect(() => {
    // fetch the exercise data for each stored favorite ID
    const fetchExerciseData = async () => {
      const exercisesData = [];
      for (let exerciseId of favorites) {
        const data = await getExercisesById(exerciseId);
        if (data && data.length > 0) {
          exercisesData.push(data[0]);
        }
      }
      setFavoriteExercisesData(exercisesData);
    };

    if (favorites.length > 0) {
      fetchExerciseData();
    }
  }, [favorites]);

  const removeFavorite = (exerciseIdToRemove) => {
    const updatedFavorites = removeFavoriteFromLocalStorage(exerciseIdToRemove);
    setFavorites(updatedFavorites);
  };

  const handleLogWorkout = (exercise) => {
    const previousDetails = getWorkoutDetails(exercise.name) || [];

    setWorkoutDetails({ time: "", sets: "", reps: "" });

    setSelectedExercise(exercise);
    setShowWorkoutDetailsModal(true);
    setPreviousWorkoutDetails(previousDetails);
  };

  const handleSaveWorkoutDetails = () => {

    if (typeof workoutDetails === "object" && !Array.isArray(workoutDetails)) {
      saveWorkoutDetails(selectedExercise.name, workoutDetails);
    } else {
      console.error("Invalid workoutDetails format:", workoutDetails);
    }

    logWorkout(selectedExercise.bodyPart);
    setShowWorkoutDetailsModal(false);
  };

  return (
    <div>
      <div className="container mt-5">
        <h2>Favorite Exercises</h2>
        {favoriteExercisesData.length === 0 ? (
          <p>No favorite exercises saved.</p>
        ) : (
          <div className="row">
            {favoriteExercisesData.map((exercise) => (
              <div key={exercise.id} className="col-md-4 mb-4">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <ExerciseCard
                    exercise={exercise}
                    onRemoveFavorite={removeFavorite}
                  />
                  <Button
                    className="mt-2"
                    variant="primary"
                    style={{ width: "100%" }}
                    onClick={() => handleLogWorkout(exercise)}
                  >
                    Log Workout
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        <Modal
          show={showWorkoutDetailsModal}
          onHide={() => setShowWorkoutDetailsModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Log Workout Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Previous Workouts</h5>
            <ul>
              {previousWorkoutDetails.map((detail, index) => (
                <li key={index}>
                  Time: {detail.time}, Sets: {detail.sets}, Reps: {detail.reps}
                </li>
              ))}
            </ul>
            <form>
              <div className="form-group">
                <label>Time (minutes)</label>
                <input
                  type="number"
                  className="form-control"
                  value={workoutDetails.time}
                  onChange={(e) =>
                    setWorkoutDetails({
                      ...workoutDetails,
                      time: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Sets</label>
                <input
                  type="number"
                  className="form-control"
                  value={workoutDetails.sets}
                  onChange={(e) =>
                    setWorkoutDetails({
                      ...workoutDetails,
                      sets: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Reps</label>
                <input
                  type="number"
                  className="form-control"
                  value={workoutDetails.reps}
                  onChange={(e) =>
                    setWorkoutDetails({
                      ...workoutDetails,
                      reps: e.target.value,
                    })
                  }
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowWorkoutDetailsModal(false)}
            >
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveWorkoutDetails}>
              Save Workout
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default DisplayFavorites;
