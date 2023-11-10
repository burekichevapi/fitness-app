import React, { useState, useEffect } from 'react';
import { getExercisesById } from "../repo/exercises-repo";
import { logWorkout } from '../repo/workoutlog-repo';
import ExerciseCard from "../components/exerciseCard";
import Button from 'react-bootstrap/Button';


const FAVORITE_EXERCISES_KEY = 'favoriteExercises';

const DisplayFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteExercisesData, setFavoriteExercisesData] = useState([]);

  useEffect(() => {
    // retrieve the favorite exercises from localStorage
    const storedFavorites = localStorage.getItem(FAVORITE_EXERCISES_KEY);
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
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
    const updatedFavorites = favorites.filter(
      exerciseId => exerciseId !== exerciseIdToRemove
    );

    localStorage.setItem(FAVORITE_EXERCISES_KEY, JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <div>
      <h2>Favorite Exercises</h2>
      {favoriteExercisesData.length === 0 ? (
        <p>No favorite exercises saved.</p>
      ) : (
        <div className="row">
          {favoriteExercisesData.map((exercise) => (
            <div key={exercise.id} className="col-md-4 mb-4">
              <ExerciseCard
                exercise={exercise}
                onRemoveFavorite={removeFavorite}
              />
              <Button 
                className="mt-2" 
                variant="primary" 
                onClick={() => logWorkout(exercise.bodyPart)}>
                Log Workout
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayFavorites;