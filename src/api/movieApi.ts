import axios from "axios";

const API_KEY = "db95411e";
const BASE_URL = "https://www.omdbapi.com/";

export const fetchMovies = async (params: {
  s: string;
  y?: string;
  type?: string;
  page?: number;
}) => {
  const response = await axios.get(BASE_URL, {
    params: { apikey: API_KEY, ...params },
  });
  return response.data;
};

export const fetchMovieDetails = async (id: string) => {
  const response = await axios.get(BASE_URL, {
    params: { apikey: API_KEY, i: id },
  });
  return response.data;
};
