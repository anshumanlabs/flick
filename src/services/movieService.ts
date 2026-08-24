import type { MovieSearchParams } from '../types/apiParams';
import type { ListMovieResponse, MovieResponse } from '../types/movies';
import apiClient from './apiClient';

export async function getMovies(params: MovieSearchParams, signal?: AbortSignal) {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            searchParams.append(key, String(value));
        }
    });

    if (!params?.limit) {
        searchParams.append('limit', import.meta.env.VITE_LIMIT);
    }

    return apiClient<ListMovieResponse>('/list_movies.json?' + searchParams.toString(), signal);
}

export async function getMovieById(id: string | undefined, signal?: AbortSignal) {
    const uri = `/movie_details.json?movie_id=${id}&with_images=true&with_cast=true`;
    return apiClient<MovieResponse>(uri, signal);
}

export async function getSuggestedMovies(id: string | undefined, signal?: AbortSignal) {
    const uri = `/movie_suggestions.json?movie_id=${id}`;
    return apiClient<ListMovieResponse>(uri, signal);
}
