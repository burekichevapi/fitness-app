import localData from "../fixtures/exercise-data.json";

export const getAllExercises = async (from = 0, to = 10) => {
  const data = localData.exercises.slice(from, to);

  return data;
};

export const getExercisesByBodyPart = (bodyPart, from = 0, to = 10) => {
  const data = localData.exercises
    .filter((exercise) => exercise.bodyPart === bodyPart)
    .slice(from, to);

  return data;
};
