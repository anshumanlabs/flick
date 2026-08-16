import type { MovieSearchParams } from "../types/apiParams";
import type { ListMovieResponse, MovieResponse } from "../types/movies";

const BASE_URL = "https://movies-api.accel.li/api/v2";

export async function getMovies(params: MovieSearchParams): Promise<ListMovieResponse> {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const response = await fetch(
    `${BASE_URL}/list_movies.json?${searchParams.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return response.json();
}

export async function getMovieById(id: string | undefined): Promise<MovieResponse> {
  const response = await fetch(`${BASE_URL}/movie_details.json?movie_id=${id}&with_images=true&with_cast=true`);
  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }
  return response.json();
}

export async function getSuggestedMovies(id: string | undefined): Promise<ListMovieResponse> {
  const response = await fetch(
    `${BASE_URL}/movie_suggestions.json?movie_id=${id}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch suggested movies");
  }
  return response.json();
}