import type { Movie } from '../types/movies';

export function removeDuplicate(movies: Movie[]): Movie[] {
    const idSet = new Set<number>();
    const removedDuplicateMovies = movies?.filter((movie) => {
        if (idSet.has(movie.id)) {
            return false;
        }
        idSet.add(movie.id);
        return true;
    });
    return removedDuplicateMovies;
}
