import { Button } from "@mui/material";
import type { Movie } from "../types/movies";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
    addAsFavMovie,
    getFavoutiteMovieForUserId,
    removeFavouriteMovie,
} from "../services/favouriteService";
import { useAuth } from "@clerk/react";
import { useContext } from "react";
import { FavouriteContext } from "../context/FavouriteContext";

function AddOrRemoveFavourite({ movie }: { movie: Movie }) {
    const { userId } = useAuth();
    const favouriteContext = useContext(FavouriteContext);

    if (!favouriteContext) {
        throw new Error(
            "AddOrRemoveFavourite must be used inside FavouriteProvider"
        );
    }

    const { favourites, dispatch } = favouriteContext;

    const isFavourite = favourites.some(
        favourite => favourite.movie_id == movie.id
    );

    async function addOrRemoveMovie() {
        if (!userId) return;

        if (isFavourite) {
            const success = await removeFavouriteMovie(userId, movie.id);

            if (success) {
                const favorites = await getFavoutiteMovieForUserId(userId);
                dispatch({
                    type: "SET_FAVOURITES",
                    payload: favorites,
                });
            }
        } else {
            const success = await addAsFavMovie(movie, userId);

            if (success) {
                const favorites = await getFavoutiteMovieForUserId(userId);
                dispatch({
                    type: "SET_FAVOURITES",
                    payload: favorites,
                });
            }
        }
    }

    return (
        <Button
            sx={{ color: isFavourite ? "red" : "white" }}
            onClick={(e) => {
                e.stopPropagation();
                addOrRemoveMovie()
            }}
        >
            <FavoriteIcon />
        </Button>
    );
}

export default AddOrRemoveFavourite;