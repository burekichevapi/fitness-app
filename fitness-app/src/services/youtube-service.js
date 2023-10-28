import request from "axios";

const options = {
  method: "GET",
  url: "https://youtube-search-and-download.p.rapidapi.com/search",
  params: {
    next: "EogDEgVoZWxsbxr-AlNCU0NBUXRaVVVoeldFMW5iRU01UVlJQkMyMUlUMDVPWTFwaWQwUlpnZ0VMWW1VeE1rSkROWEJSVEVXQ0FRdFZNMEZUYWpGTU5sOXpXWUlCQzJaaGVrMVRRMXBuTFcxM2dnRUxaV3hrWldGSlFYWmZkMFdDQVExU1JGbFJTSE5ZVFdkc1F6bEJnZ0VMT0hwRVUybHJRMmc1Tm1PQ0FRc3pOMFU1VjNORWJVUmxaNElCQzJGaFNXcHpPRXN6YjFsdmdnRUxaMmRvUkZKS1ZuaEdlRldDQVF0clN6UXlURnB4VHpCM1FZSUJDME42VHpOaFNXVXdVbkJ6Z2dFTFNVNHdUMk5WZGtkaU5qQ0NBUXRSYTJWbGFGRTRSRjlXVFlJQkMyWk9NVU41Y2pCYVN6bE5nZ0VMZEZac1kwdHdNMkpYU0RpQ0FRdGZSQzFGT1Rsa01XSk1TWUlCQzJoQlUwNVRSSFZOY2pGUmdnRUxkREEzTVZkdE5EVnhWMDAlM0QYgeDoGCILc2VhcmNoLWZlZWQ%3D",
    hl: "en",
    gl: "US",
    upload_date: "y",
    type: "v",
    duration: "s",
    features: "li;hd",
    sort: "v",
  },
  headers: {
    "X-RapidAPI-Key": "103d906827msh837bbb3320d859cp1c2c7bjsn3507e1337653",
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
  },
};

export const getVideoForExercise = async (excerciseName) => {
  try {
    options.query = excerciseName;
    const response = await request(options);
    console.log(response.data.contents[0].video.videoId);
  } catch (error) {
    console.error(error);
  }
};
