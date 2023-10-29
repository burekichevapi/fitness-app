import localData from "../fixtures/exercise-data.json";
import { Http } from "./http-service";
import config from "../config.json";

const headers = {
  "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
  "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
};

export const getAllExercises = async (max = 10) => {
  try {
    if (config.useLocalData) {
      const data = localData.exercises.slice(0, max);
      return data;
    }

    const { data } = await Http.get(
      `${config.exercisesApiEndpoint}/exercises`,
      { method: "GET", headers, params: { limit: max.toString() } }
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getExercisesByBodyPart = async (bodyPart, max = 10) => {
  if (bodyPart === "all") return await getAllExercises(max);

  const data = localData.exercises
    .filter((exercise) => exercise.bodyPart === bodyPart)
    .slice(0, max);

  return data;
};
