import axios from 'axios';
import type { Movie } from '../types/movie';

interface MovieResponse {
  results: Movie[];
}

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<MovieResponse>(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query: query,
      language: 'uk-UA',
      include_adult: false,
    },
  });

  return response.data.results;
};