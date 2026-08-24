import { Button } from '@mui/material';
import type { Movie } from '../types/movies';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
    addAsFavMovie,
    getFavoutiteMovieForUserId,
    removeFavouriteMovie,
} from '../services/favouriteService';
import { useAuth } from '@clerk/react';
import { useContext } from 'react';
import { FavouriteContext } from '../context/FavouriteContext';
import { useSnackbar } from '../context/SnackbarContext';

function AddOrRemoveFavourite({ movie }: { movie: Movie }) {
    const { userId } = useAuth();
    const favouriteContext = useContext(FavouriteContext);

    if (!favouriteContext) {
        throw new Error('AddOrRemoveFavourite must be used inside FavouriteProvider');
    }

    const { dispatch, favouriteIds } = favouriteContext;
    const isFavourite = favouriteIds.has(movie.id);

    const { openSnackbar } = useSnackbar();

    async function addOrRemoveMovie() {
        if (!userId) {
            openSnackbar('Login to add favourite', 'error');
            return;
        }

        if (isFavourite) {
            const success = await removeFavouriteMovie(userId, movie.id);

            if (success) {
                const favorites = await getFavoutiteMovieForUserId(userId);
                dispatch({
                    type: 'SET_FAVOURITES',
                    payload: favorites,
                });
                openSnackbar('Movie removed from favourites');
            } else {
                openSnackbar('Something went wrong. Try again', 'error');
            }
        } else {
            const success = await addAsFavMovie(movie, userId);

            if (success) {
                const favorites = await getFavoutiteMovieForUserId(userId);
                dispatch({
                    type: 'SET_FAVOURITES',
                    payload: favorites,
                });
                openSnackbar('Movie added to favourites');
            } else {
                openSnackbar('Something went wrong. Try again', 'error');
            }
        }
    }

    return (
        <Button
            onClick={(e) => {
                e.stopPropagation();
                addOrRemoveMovie();
            }}
        >
            <FavoriteIcon
                sx={{
                    color: isFavourite ? 'red' : 'white',

                    ...(isFavourite && {
                        animation: 'favoritePop 0.4s ease',
                    }),

                    '@keyframes favoritePop': {
                        '0%': {
                            transform: 'scale(1)',
                        },
                        '40%': {
                            transform: 'scale(1.4)',
                        },
                        '70%': {
                            transform: 'scale(0.9)',
                        },
                        '100%': {
                            transform: 'scale(1)',
                        },
                    },
                }}
            />
        </Button>
    );
}

export default AddOrRemoveFavourite;
