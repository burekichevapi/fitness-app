import { Http } from "./http";
import config from "../config.json";

const headers = {
  method: "GET",
  "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
  "X-RapidAPI-Host": "youtube-search-results.p.rapidapi.com",
};

export const getVideoUrl = async (exerciseName) => {
  if (config.useLocalData) return "https://youtube.com";

  const options = {
    params: { q: `${exerciseName} exercise` },
    headers,
  };

  try {
    const response = await Http.get(
      `${config.youtubeSearchApiEndpoint}/youtube-search/`,
      options
    );

    return response.data.videos[0].link;
  } catch (error) {
    console.error(error);
    return "https://youtube.com";
  }
};
