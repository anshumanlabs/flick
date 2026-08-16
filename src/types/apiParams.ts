export type MovieQuality =
  | "480p"
  | "720p"
  | "1080p"
  | "1080p.x265"
  | "2160p"
  | "3D";

export type MovieSortBy =
  | "title"
  | "year"
  | "rating"
  | "peers"
  | "seeds"
  | "download_count"
  | "like_count"
  | "date_added";

export type MovieOrderBy = "desc" | "asc";

export interface MovieSearchParams {
  limit?: number;
  page?: number;
  quality?: MovieQuality;
  minimum_rating?: number;
  query_term?: string;
  genre?: string;
  sort_by?: MovieSortBy;
  order_by?: MovieOrderBy;
  with_rt_ratings?: boolean;
}