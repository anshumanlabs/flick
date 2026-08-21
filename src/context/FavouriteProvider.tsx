import { useReducer, type ReactNode } from 'react';
import { FavouriteContext } from './FavouriteContext';
import { favouriteReducer } from '../hooks/useFavourite';

export function FavouriteProvider({ children }: { children: ReactNode }) {
    const [favourites, dispatch] = useReducer(favouriteReducer, []);

    return (
        <FavouriteContext.Provider value={{ favourites, dispatch }}>
            {children}
        </FavouriteContext.Provider>
    );
}
