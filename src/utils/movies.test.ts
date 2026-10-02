import { describe, it, expect } from 'vitest';
import { removeDuplicate } from './movies';
import type { Movie } from '../types/movies';

describe('removeDuplicate', () => {
    it('should remove movies with duplicate IDs', () => {
        const movies = [
            { id: 1, title: 'Movie A' },
            { id: 2, title: 'Movie B' },
            { id: 1, title: 'Movie A Duplicate' },
            { id: 3, title: 'Movie C' },
            { id: 2, title: 'Movie B Duplicate' },
        ] as Movie[];

        const result = removeDuplicate(movies);

        expect(result).toHaveLength(3);
        expect(result.map((movie) => movie.id)).toEqual([1, 2, 3]);
    });

    it('should return the original movies when there are no duplicates', () => {
        const movies = [
            { id: 1, title: 'Movie A' },
            { id: 2, title: 'Movie B' },
            { id: 3, title: 'Movie C' },
        ] as Movie[];

        const result = removeDuplicate(movies);

        expect(result).toEqual(movies);
    });

    it('should return an empty array when input is empty', () => {
        const movies: Movie[] = [];

        const result = removeDuplicate(movies);

        expect(result).toEqual([]);
    });

    it('should keep the first movie when duplicate ID exists', () => {
        const movies = [
            { id: 1, title: 'First Movie' },
            { id: 1, title: 'Second Movie' },
        ] as Movie[];

        const result = removeDuplicate(movies);

        expect(result).toHaveLength(1);
        expect(result[0].title).toBe('First Movie');
    });
});
