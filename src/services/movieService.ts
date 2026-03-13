import axios from 'axios';
import type { FetchMoviesResponse } from '../types/movie';

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    Accept: 'application/json',
  },
});

export const fetchMovies = async (
  query: string,
  page: number = 1
): Promise<FetchMoviesResponse> => {
  const { data } = await apiClient.get<FetchMoviesResponse>('/search/movie', {
    params: {
      query,
      page,
      language: 'uk-UA',
      include_adult: false,
    },
  });

  return data;
};