import { getMovies } from '../services/movieService';
import type { Movie } from '../types/movies';
import type { MovieSearchParams } from '../types/apiParams';
import { removeDuplicate } from '../utils/movies';
import { useQuery } from '@tanstack/react-query';

interface PaginationData {
    currentPage: number;
    totalPages: number;
}

interface UseMoviesResult {
    movies: Movie[];
    loading: boolean;
    error: Error | null;
    paginationData: PaginationData;
}

export function useMovies(queryString: string, limit: number): UseMoviesResult {
    const params = Object.fromEntries(new URLSearchParams(queryString).entries()) as MovieSearchParams;

    const query = useQuery({
        queryKey: ['movies', queryString],
        queryFn: ({ signal }) => getMovies(params, signal),
        staleTime: 5 * 60 * 1000,
    });

    const movies = query.data ? removeDuplicate(query.data.data.movies) : [];
    const currentPage = Number(params.page ?? 1);
    const totalPages = query.data ? Math.ceil(query.data.data.movie_count / limit) : 1;

    return {
        movies,
        loading: query.isLoading,
        error: query.error,
        paginationData: {
            currentPage,
            totalPages,
        },
    };
}
