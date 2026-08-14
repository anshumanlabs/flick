import type { ListMovieResponse, MovieResponse } from "../types/movies";

const BASE_URL = "https://movies-api.accel.li/api/v2";

export async function getMovies(page: number, term: string): Promise<ListMovieResponse> {
  const response = await fetch(`${BASE_URL}/list_movies.json?limit=20&page=${page}&query_term=${term}`);
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  return response.json();
}

export async function getMovieById(id: number): Promise<MovieResponse> {
  const response = await fetch(`${BASE_URL}/movie_details.json?movie_id=${id}&with_images=true&with_cast=true`);
  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }
  return response.json();
}

export async function suggestedMovies(id: number): Promise<ListMovieResponse> {
  const response = await fetch(
    `${BASE_URL}/movie_suggestions.json?movie_id=${id}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch suggested movies");
  }
  return response.json();
}