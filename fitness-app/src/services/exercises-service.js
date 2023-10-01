import { Http } from "./http-service";
import config from "../config.json";
import localData from "../fixtures/exercise-data.json";

const headers = {
  "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
  "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
};

export const getAllExercises = async (from = 0, to = 10) => {
  try {
    if (config.useLocalData) {
      const data = localData.exercises.slice(from, to);
      console.log("From local\n", data);
      return data;
    }

    const { data } = await Http.get(
      `${config.exercisesApiEndpoint}/exercises`,
      { method: "GET", headers }
    );
    console.log("From api\n", data);

    return data;
  } catch (error) {
    console.error(error);
  }
};
