import { Button } from '@mui/material';
import type { Movie } from '../types/movies';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
    addAsFavMovie,
    getFavoutiteMovieForUserId,
    removeFavouriteMovie,
} from '../services/favouriteService';
import { useAuth } from '@clerk/react';
import { useSnackbar } from '../context/SnackbarContext';
import { useDispatch, useSelector } from 'react-redux';
import { setFavourite } from '../store/favouriteSlice';
import type { RootState } from '../store/store';

function AddOrRemoveFavourite({ movie }: { movie: Movie }) {
    const { userId } = useAuth();
    const dispatch = useDispatch();
    const favouriteIds = useSelector((state: RootState) => state.favourite.favouriteIds);
    const { openSnackbar } = useSnackbar();
    const isFavourite = favouriteIds.includes(movie.id);

    async function addOrRemoveMovie() {
        if (!userId) {
            openSnackbar('Login to add favourite', 'error');
            return;
        }

        if (isFavourite) {
            const success = await removeFavouriteMovie(userId, movie.id);
            if (success) {
                const favorites = await getFavoutiteMovieForUserId(userId);
                dispatch(setFavourite(favorites));
                openSnackbar('Movie removed from favourites');
            } else {
                openSnackbar('Something went wrong. Try again', 'error');
            }
        } else {
            const success = await addAsFavMovie(movie, userId);
            if (success) {
                const favorites = await getFavoutiteMovieForUserId(userId);
                dispatch(setFavourite(favorites));
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
                    marginLeft: '2rem',
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
