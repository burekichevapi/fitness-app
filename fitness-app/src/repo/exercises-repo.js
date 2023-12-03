import localData from "../fixtures/exercise-data.json";
import { Http } from "./http";
import config from "../config.json";

const headers = {
  method: "GET",
  "X-RapidAPI-Key": "103d906827msh837bbb3320d859cp1c2c7bjsn3507e1337653",
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

export const getExercisesById = async (id) => {
  if (config.useLocalData) return getExerciseById_local(id);

  try {
    const { data } = await Http.get(
      `${config.exercisesApiEndpoint}/exercises/exercise/${id}`,
      { headers, params: { limit: "1" } }
    );

    return data;
  } catch (error) {
    console.error(error);
    return getExerciseById_local(id);
  }
};

const getExerciseById_local = (id) => {
  const data = localData.exercises.filter((exercise) => exercise.id === id);

  return data[0];
};
