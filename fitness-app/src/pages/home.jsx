import React, { useState, useEffect } from 'react';
import { getAllExercises, getExercisesByBodyPart } from '../services/exercises-service';

const Home = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const timeOutId = setTimeout(async () => {
      console.log("fetching exercises");
      //const e = getAllExercises();
      const e = getExercisesByBodyPart("back");
      console.log("rendering:", e);
      setExercises(e);
    }, 5000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, []);

  return (
    <div>
      {exercises.map((exercise, index) => <div key={exercise.id}>
        index: {index} <br />
        bodyPart: {exercise.bodyPart}<br />
        equipment: {exercise.equipment}<br />
        gifUrl: {exercise.gifUrl}<br />
        id {exercise.id}<br />
        name: {exercise.name}<br />
        target: {exercise.target}<br />
        secondaryMuscles: {exercise.secondaryMuscles}<br />
        instructions: {exercise.instructions}<br />
        <br />
      </div>)}
    </div>
  );
};

export default Home;