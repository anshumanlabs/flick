import { useEffect, useState } from 'react';
import { getMovies } from '../services/movieService';
import type { Movie } from '../types/movies';
import type { MovieSearchParams } from '../types/apiParams';
import { removeDuplicate } from '../utils/movies';

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
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const [paginationData, setPaginationData] = useState<PaginationData>({
        currentPage: 1,
        totalPages: 1,
    });

    useEffect(() => {
        const controller = new AbortController();
        const params = Object.fromEntries(
            new URLSearchParams(queryString).entries(),
        ) as MovieSearchParams;
        const fetchMovies = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await getMovies(params, controller.signal);
                setMovies(removeDuplicate(response.data.movies));
                const currentPage = Number(params.page ?? 1);
                setPaginationData({
                    currentPage,
                    totalPages: Math.ceil(response.data.movie_count / limit),
                });
            } catch (error) {
                if (error instanceof DOMException && error.name === 'AbortError') {
                    return;
                }
                setError(error instanceof Error ? error : new Error('Failed to fetch movies'));
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };
        fetchMovies();
        return () => {
            controller.abort();
        };
    }, [queryString, limit]);

    return {
        movies,
        loading,
        error,
        paginationData,
    };
}
