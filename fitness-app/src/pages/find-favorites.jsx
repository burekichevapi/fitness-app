import React, { useState, useEffect } from "react";
import { getExercisesById } from "../repo/exercises-repo";
import { logWorkout } from "../repo/workoutlog-repo";
import { getFavoritesFromLocalStorage, removeFavoriteFromLocalStorage } from "../repo/favorite-repo";
import ExerciseCard from "../components/exerciseCard/exerciseCard";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DisplayFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteExercisesData, setFavoriteExercisesData] = useState([]);
  const [showWorkoutLoggedModal, setShowWorkoutLoggedModal] = useState(false);

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

  const handleLogWorkout = (exerciseBodyPart) => {
    logWorkout(exerciseBodyPart);
    setShowWorkoutLoggedModal(true);
  };

  const handleCloseWorkoutLoggedModal = () => setShowWorkoutLoggedModal(false);

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
                    onClick={() => handleLogWorkout(exercise.bodyPart)}
                  >
                    Log Workout
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        <Modal
          show={showWorkoutLoggedModal}
          onHide={handleCloseWorkoutLoggedModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Workout Logged</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Your exercise has been logged. See the My Progress page for your
            workout logs.
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default DisplayFavorites;
