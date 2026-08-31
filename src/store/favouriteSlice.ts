import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Favourite } from '../types/favourites';

interface FavouriteState {
    favourites: Favourite[];
}

const initialState: FavouriteState = {
    favourites: [],
};

const favouriteSlice = createSlice({
    name: 'favourite',
    initialState,
    reducers: {
        setFavourite: (state, action: PayloadAction<Favourite[]>) => {
            state.favourites = action.payload;
        },

        addFavourite: (state, action: PayloadAction<Favourite>) => {
            state.favourites.push(action.payload);
        },

        removeFavourite: (state, action: PayloadAction<string>) => {
            state.favourites = state.favourites.filter((fav) => fav.id !== action.payload);
        },
    },
});

export const { setFavourite, addFavourite, removeFavourite } = favouriteSlice.actions;

export default favouriteSlice.reducer;
