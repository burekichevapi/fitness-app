import { Http } from "./http";
import config from "../config.json";

const headers = {
  method: "GET",
  "X-RapidAPI-Key": "103d906827msh837bbb3320d859cp1c2c7bjsn3507e1337653",
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
