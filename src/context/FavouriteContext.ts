import { createContext, type Dispatch } from 'react';
import type { FavouriteAction } from '../hooks/useFavourite';
import type { Favourite } from '../types/favourites';

export const FavouriteContext = createContext<{
    favourites: Favourite[];
    dispatch: Dispatch<FavouriteAction>;
} | null>(null);
