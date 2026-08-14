import type { Cast } from "./cast";

export interface Movie {
  id: number;
  title: string;
  title_long: string;
  year: number;
  rating: number;
  runtime: number;
  genres: string[];
  summary: string;

  background_image: string;
  medium_cover_image: string;
  background_image_original: string;
  large_cover_image: string;
  description_full: string;
  description_intro: string;

  yt_trailer_code: string;
  imdb_code: string;
  language: string;
  slug: string;

  medium_screenshot_image1: string;
  medium_screenshot_image2: string;
  medium_screenshot_image3: string;

  large_screenshot_image1: string;
  large_screenshot_image2: string;
  large_screenshot_image3: string;
  cast: Cast[];
}

export interface ListMovieResponse {
  status: string;
  status_message: string;
  data: {
    movie_count: number;
    limit: number;
    page_number: number;
    movies: Movie[];
  };
}

export interface MovieResponse {
  status: string;
  status_message: string;
  data: {
    movie: Movie;
  };
}
