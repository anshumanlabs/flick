export interface Favourite {
    id: string;
    user_id: string | null | undefined;
    movie_id: number;
    movie: FavouriteMovie;
    created_at: string;
    updated_at: string;
}

export interface FavouriteMovie {
    id: number;
    name: string;
    rating: number;
    genres: string[];
    medium_cover_image: string;
}

export interface CreateFavourite {
    user_id: string | null | undefined;
    movie_id: number;
    movie: FavouriteMovie;
}
