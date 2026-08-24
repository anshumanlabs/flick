import { useMemo, useReducer, type ReactNode } from 'react';
import { FavouriteContext } from './FavouriteContext';
import { favouriteReducer } from '../hooks/useFavourite';

export function FavouriteProvider({ children }: { children: ReactNode }) {
    const [favourites, dispatch] = useReducer(favouriteReducer, []);

    const favouriteIds = useMemo(
        () => new Set(favourites.map((favourite) => favourite.movie.id)),
        [favourites],
    );

    return (
        <FavouriteContext.Provider value={{ favourites, dispatch, favouriteIds }}>
            {children}
        </FavouriteContext.Provider>
    );
}
