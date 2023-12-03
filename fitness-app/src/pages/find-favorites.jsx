import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ExerciseCard from "../components/exerciseCard/exerciseCard";
import { getExercisesById } from "../repo/exercises-repo";
import {
  logWorkout,
  saveWorkoutDetails,
  getWorkoutDetails,
} from "../repo/progress-repo";
import {
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../repo/favorite-repo";

const DisplayFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteExercisesData, setFavoriteExercisesData] = useState([]);
  const [workoutDetails, setWorkoutDetails] = useState({
    duration: "",
    sets: "",
    reps: "",
  });
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showWorkoutDetailsModal, setShowWorkoutDetailsModal] = useState(false);
  const [previousWorkoutDetails, setPreviousWorkoutDetails] = useState([]);
  const [showValidationModal, setShowValidationModal] = useState(false);

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
        console.log(data);
        console.log('getExerciseById: ', exerciseId);
        if (data) {
          exercisesData.push(data);
        }
      }
      setFavoriteExercisesData(exercisesData);
    };

    fetchExerciseData();
  }, [favorites]);

  const removeFavorite = (exerciseIdToRemove) => {
    removeFavoriteFromLocalStorage(exerciseIdToRemove);
    const updatedFavorites = getFavoritesFromLocalStorage() || [];
    setFavorites(updatedFavorites);
  };


  const handleLogWorkout = (exercise) => {
    const previousDetails = getWorkoutDetails(exercise.name) || [];

    setWorkoutDetails({ duration: "", sets: "", reps: "" });

    setSelectedExercise(exercise);
    setShowWorkoutDetailsModal(true);
    setPreviousWorkoutDetails(previousDetails);
  };

  const handleSaveWorkoutDetails = () => {
    const { duration, sets, reps } = workoutDetails;
    if (!duration && !sets && !reps) {
      setShowValidationModal(true);
      return;
    }

    const cleanedDetails = {
      duration: workoutDetails.duration ? parseInt(workoutDetails.duration) : 0,
      sets: workoutDetails.sets ? parseInt(workoutDetails.sets) : 0,
      reps: workoutDetails.reps ? parseInt(workoutDetails.reps) : 0,
    };

    const now = new Date();
    const formattedTime = `${now.getMonth() + 1
      }/${now.getDate()} at ${now.getHours()}:${now.getMinutes()}`;

    const detailsToSave = {
      ...cleanedDetails,
      timeLogged: formattedTime,
    };

    saveWorkoutDetails(selectedExercise.name, detailsToSave);
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
              {[...previousWorkoutDetails].reverse().map((detail, index) => (
                <li key={index}>
                  {detail.timeLogged}, Duration: {detail.duration} mins, Sets:{" "}
                  {detail.sets}, Reps: {detail.reps}
                </li>
              ))}
            </ul>
            <form>
              <div className="form-group">
                <label>Duration (minutes)</label>
                <input
                  type="number"
                  className="form-control"
                  value={workoutDetails.duration}
                  onChange={(e) =>
                    setWorkoutDetails({
                      ...workoutDetails,
                      duration: e.target.value,
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
        <Modal
          show={showValidationModal}
          onHide={() => setShowValidationModal(false)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Input Required</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Please enter at least one of the following: Duration, Sets, or
              Reps.
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowValidationModal(false)}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </div>
    </div>
  );
};

export default DisplayFavorites;
