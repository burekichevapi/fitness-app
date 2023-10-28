import request from "axios";

export const getVideoUrl = async (exerciseName) => {
  const options = {
    method: "GET",
    url: "https://youtube-search-results.p.rapidapi.com/youtube-search/",
    params: { q: `${exerciseName} exercise` },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "youtube-search-results.p.rapidapi.com",
    },
  };

  try {
    const response = await request(options);
    console.log(
      `https://www.youtube.com/watch?v=${response.data.videos[0].id}`
    );
    return `https://www.youtube.com/watch?v=${response.data.videos[0].id}`;
  } catch (error) {
    console.error(error);
  }
};
