import type { ListMovieResponse, MovieResponse } from "../types/movies";

const BASE_URL = "https://movies-api.accel.li/api/v2";

export async function getMovies(): Promise<ListMovieResponse> {
  const response = await fetch(`${BASE_URL}/list_movies.json?limit=20`);
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  return response.json();
}

export async function getMovieById(id: number): Promise<MovieResponse> {
  const response = await fetch(`${BASE_URL}/movie_details.json?movie_id=${id}`);
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
