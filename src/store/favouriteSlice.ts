import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Favourite } from '../types/favourites';

interface FavouriteState {
    favourites: Favourite[];
    favouriteIds: number[];
}

const initialState: FavouriteState = {
    favourites: [],
    favouriteIds: [],
};

const favouriteSlice = createSlice({
    name: 'favourite',
    initialState,
    reducers: {
        setFavourite: (state, action: PayloadAction<Favourite[]>) => {
            state.favourites = action.payload;
            state.favouriteIds = action.payload.map((fav) => fav.movie.id);
        },

        addFavourite: (state, action: PayloadAction<Favourite>) => {
            state.favourites.push(action.payload);
            state.favouriteIds.push(action.payload.movie.id);
        },

        removeFavourite: (state, action: PayloadAction<string>) => {
            state.favourites = state.favourites.filter((fav) => fav.id !== action.payload);
            state.favouriteIds = state.favourites.map((fav) => fav.movie.id);
        },
    },
});

export const { setFavourite, addFavourite, removeFavourite } = favouriteSlice.actions;

export default favouriteSlice.reducer;
