import axios from "axios";

const API_KEY = '6f909ea3da92e1b727ac30dd912da701';
axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjkwOWVhM2RhOTJlMWI3MjdhYzMwZGQ5MTJkYTcwMSIsIm5iZiI6MTczODYxNjQ5MS43NDg5OTk4LCJzdWIiOiI2N2ExMmVhYjUwZjVkNDc2MjUyNjU1ZDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.n5G4UftK3TaQB5_uSXrdN5oFWKMuH07nK4wxACUCLiM'
    }
};

export const getTrendingMovies = async () => {
  const { data } = await axios.get(
    `/trending/movie/day?api_key=${API_KEY}`,
    options
  );
  return data.results;
};

export const searchMovies = async (query) => {
  const { data } = await axios.get(
    `/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&include_adult=false&language=en-US&page=1`,
    options
  );

  return data.results;
};

export const getMovieDetails = async (movieId) => {
  const { data } = await axios.get(
    `/movie/${movieId}?language=en-US&api_key=${API_KEY}`,
    options
  );
  return data;
};

export const getMoviesCredits = async (movieId) => {
  const { data } = await axios.get(
    `/movie/${movieId}/credits?language=en-US&page=1&api_key=${API_KEY}`,
    options
  );
  return data.cast;
};

export const getMoviesReview = async (movieId) => {
  const { data } = await axios.get(
    `/movie/${movieId}/reviews?language=en-US&page=1&api_key=${API_KEY}`,
    options
  );
  return data.results;
};

