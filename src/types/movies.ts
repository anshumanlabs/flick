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
  large_cover_image: string;
  description_full: string;

  yt_trailer_code: string;
  imdb_code: string;
  language: string;
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
