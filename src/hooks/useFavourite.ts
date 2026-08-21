import type { Favourite } from '../types/favourites';

export type FavouriteAction = { type: 'SET_FAVOURITES'; payload: Favourite[] };

export function favouriteReducer(state: Favourite[], action: FavouriteAction): Favourite[] {
    switch (action.type) {
        case 'SET_FAVOURITES':
            return action.payload;

        default:
            return state;
    }
}
