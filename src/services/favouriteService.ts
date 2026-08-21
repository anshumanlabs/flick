import {
    getFavoutiteMovieByUserId,
    removeFavouriteMovieByUserId,
    saveFavouriteMovie,
} from '../repository/favouriteRepo';
import type { Favourite } from '../types/favourites';
import type { Movie } from '../types/movies';

export async function addAsFavMovie(
    movie: Movie,
    userId: string | null | undefined,
): Promise<boolean> {
    const favouriteMovie = {
        id: movie.id,
        name: movie.title_long,
        rating: movie.rating,
        genres: movie.genres,
        medium_cover_image: movie.medium_cover_image,
    };
    const favoutite = {
        user_id: userId,
        movie_id: movie.id,
        movie: favouriteMovie,
    };
    return saveFavouriteMovie(favoutite);
}

export async function getFavoutiteMovieForUserId(userId: string): Promise<Favourite[]> {
    return getFavoutiteMovieByUserId(userId);
}

export async function removeFavouriteMovie(userId: string, movieId: number): Promise<boolean> {
    return removeFavouriteMovieByUserId(userId, movieId);
}
