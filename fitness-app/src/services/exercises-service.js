import { Http } from "./http-service";
import config from "../config.json";

const headers = {
  "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
  "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
};

export const getAllExercises = async () => {
  try {
    const { data } = await Http.get(
      `${config.exercisesApiEndpoint}/exercises`,
      { method: "GET", headers }
    );

    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
