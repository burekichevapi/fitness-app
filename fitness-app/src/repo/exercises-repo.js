import localData from "../fixtures/exercise-data.json";
import { Http } from "./http";
import config from "../config.json";

const headers = {
  method: "GET",
  "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
  "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
};

export const getExercisesByBodyPart = async (bodyPart, max) => {
  if (config.useLocalData) return getExercisesByBodyPart_local(bodyPart, max);

  try {
    const { data } = await Http.get(
      `${config.exercisesApiEndpoint}/exercises/bodyPart/${bodyPart}`,
      { headers, params: { limit: max.toString() } }
    );

    return data;
  } catch (error) {
    console.error(error);
    return getExercisesByBodyPart_local(bodyPart, max);
  }
};

const getExercisesByBodyPart_local = (bodyPart, max) => {
  const data = localData.exercises
    .filter((exercise) => exercise.bodyPart === bodyPart)
    .slice(0, max);

  return data;
};

export const getExercisesById = async (id, max = 1) => {
  if (config.useLocalData) return getExercisesById_local(id, max);

  try {
    const { data } = await Http.get(
      `${config.exercisesApiEndpoint}/exercises/exercise/${id}`,
      { headers, params: { limit: max.toString() } }
    );

    return data;
  } catch (error) {
    console.error(error);
    return getExercisesById_local(id, max);
  }
};

const getExercisesById_local = (id, max = 1) => {
  const data = localData.exercises
    .filter((exercise) => exercise.id === id)
    .slice(0, max);

  return data;
};
