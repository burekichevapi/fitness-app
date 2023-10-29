import { Http } from "./http-service";

export const getVideoUrl = async (exerciseName) => {
  const options = {
    method: "GET",
    params: { q: `${exerciseName} exercise` },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "youtube-search-results.p.rapidapi.com",
    },
  };

  try {
    const response = await Http.get(
      "https://youtube-search-results.p.rapidapi.com/youtube-search/",
      options
    );

    console.log(response.data.videos[0].link);
    return response.data.videos[0].link;
  } catch (error) {
    console.error(error);
  }
};
