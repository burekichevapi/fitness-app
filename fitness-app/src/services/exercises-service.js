import localData from "../fixtures/exercise-data.json";

export const getAllExercises = (max = 10) => {
  const data = localData.exercises.slice(0, max);

  return data;
};

export const getExercisesByBodyPart = (bodyPart, max = 10) => {
  if (bodyPart === "all") return getAllExercises(max);

  const data = localData.exercises
    .filter((exercise) => exercise.bodyPart === bodyPart)
    .slice(0, max);

  return data;
};
