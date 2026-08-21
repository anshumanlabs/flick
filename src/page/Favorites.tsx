import { useAuth } from '@clerk/react';
import { useContext, useEffect } from 'react';
import { getFavoutiteMovieForUserId } from '../services/favouriteService';
import MovieCard from '../components/MovieCard';
import { defaultConfig } from '../types/config';
import type { Movie } from '../types/movies';
import { FavouriteContext } from '../context/FavouriteContext';

function Favorites() {
    const { userId, isSignedIn, isLoaded } = useAuth();
    const favouriteContext = useContext(FavouriteContext);
    if (!favouriteContext) {
        throw new Error('Favorites must be used inside FavouriteProvider');
    }
    const { favourites, dispatch } = favouriteContext;

    useEffect(() => {
        if (!isSignedIn || !userId) {
            return;
        }
        const loadFavorites = async () => {
            const favorites = await getFavoutiteMovieForUserId(userId);
            dispatch({
                type: 'SET_FAVOURITES',
                payload: favorites,
            });
        };
        loadFavorites();
    }, [userId]);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }
    if (!isSignedIn) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <h2 className="text-2xl font-bold text-white mb-3">
                    Please login to see or add your favorite movies.
                </h2>
            </div>
        );
    }
    return (
        <>
            {favourites?.length > 0 ? (
                <div
                    style={{ justifyItems: 'center' }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4"
                >
                    {favourites?.map((favourite) => (
                        <MovieCard
                            key={favourite.id}
                            movie={
                                {
                                    id: favourite.movie.id,
                                    genres: favourite.movie.genres,
                                    rating: favourite.movie.rating,
                                    title_long: favourite.movie.name,
                                    medium_cover_image: favourite.movie.medium_cover_image,
                                } as Movie
                            }
                            config={defaultConfig}
                        />
                    ))}
                </div>
            ) : (
                <>
                    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
                        <div className="text-7xl mb-4">🎬</div>

                        <h1 className="text-4xl font-bold text-white mb-3">Movie Not Found</h1>

                        <p className="text-gray-400 max-w-md mb-6">No Favoutite Movies added.</p>
                    </div>
                </>
            )}
        </>
    );
}

export default Favorites;
