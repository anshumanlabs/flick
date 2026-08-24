import { SignInButton, useAuth } from '@clerk/react';
import { useContext, useEffect, useState } from 'react';
import { getFavoutiteMovieForUserId } from '../services/favouriteService';
import MovieCard from '../components/MovieCard';
import { defaultConfig } from '../types/config';
import type { Movie } from '../types/movies';
import { FavouriteContext } from '../context/FavouriteContext';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

function Favorites() {
    const { userId, isSignedIn, isLoaded } = useAuth();
    const navigate = useNavigate();
    const favouriteContext = useContext(FavouriteContext);
    if (!favouriteContext) {
        throw new Error('Favorites must be used inside FavouriteProvider');
    }
    const { favourites, dispatch } = favouriteContext;
    const [touchHoveredMovieId, setTouchHoveredMovieId] = useState<number | null>(null);

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
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '300px',
                }}
            >
                <CircularProgress aria-label="Loading…" />
            </Box>
        );
    }
    if (!isSignedIn) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center px-4">
                <div className="flex flex-col items-center text-center max-w-md">
                    <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                        <span className="text-5xl">❤️</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Your Favorites Await</h2>

                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-7">
                        Sign in to save your favorite movies and access them anytime.
                    </p>

                    <SignInButton>
                        <button
                            type="button"
                            className="group flex items-center gap-2 rounded-lg bg-[#49c916] px-6 py-3
                           font-semibold text-black transition-all duration-200
                           hover:bg-[#55df1c] hover:shadow-lg hover:shadow-[#49c916]/20
                           active:scale-95"
                        >
                            Login to Continue
                            <span className="transition-transform duration-200 group-hover:translate-x-1">
                                →
                            </span>
                        </button>
                    </SignInButton>
                </div>
            </div>
        );
    }
    return favourites?.length > 0 ? (
        <div
            style={{ justifyItems: 'center' }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:p-4 mg:p-3 sm:p-2 mt-3"
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
                    touchHoveredMovieId={touchHoveredMovieId}
                    setTouchHoveredMovieId={setTouchHoveredMovieId}
                />
            ))}
        </div>
    ) : (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="relative flex flex-col items-center text-center max-w-lg">
                <div className="absolute -top-10 h-32 w-32 rounded-full bg-[#49c916]/10 blur-3xl" />

                <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl">
                    <span className="text-5xl">🍿</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
                    Nothing Here Yet
                </h1>

                <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-7">
                    Your favorite movies will appear here.
                    <br className="hidden sm:block" />
                    Find something you love and add it to your collection.
                </p>

                <button
                    onClick={() => navigate('/movies')}
                    className="group flex items-center gap-2 rounded-lg bg-[#49c916] px-6 py-3
                       font-semibold text-black transition-all duration-200
                       hover:bg-[#55df1c] hover:shadow-lg hover:shadow-[#49c916]/20
                       active:scale-95"
                >
                    Explore Movies
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </button>
            </div>
        </div>
    );
}

export default Favorites;
