import type { CreateFavourite, Favourite } from '../types/favourites';
import { supabase } from '../utils/superbase';

export async function saveFavouriteMovie(favourite: CreateFavourite): Promise<boolean> {
    const { error } = await supabase.from('favorites').insert(favourite);

    if (error) {
        console.error('Failed to save favorites:', error);
        return false;
    }
    return true;
}

export async function getFavoutiteMovieByUserId(userId: string): Promise<Favourite[]> {
    const { data, error } = await supabase.from('favorites').select('*').eq('user_id', userId);

    if (error) {
        console.error('Failed to fetch favorites:', error);
        return [];
    }
    return data;
}

export async function removeFavouriteMovieByUserId(userId: string, movieId: number): Promise<boolean> {
    const { error } = await supabase.from('favorites').delete().eq('user_id', userId).eq('movie_id', movieId);

    if (error) {
        console.error('Failed to fetch favorites:', error);
        return false;
    }
    return true;
}
