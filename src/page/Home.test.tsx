import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from './Home';
import { getMovies } from '../services/movieService';

vi.mock('../services/movieService', () => ({
    getMovies: vi.fn(),
}));

vi.mock('../components/MovieCard', () => ({
    default: ({ movie }: { movie: { id: number; title: string } }) => (
        <div data-testid="movie-card">
            {movie.title}
        </div>
    ),
}));

vi.mock('../components/Skeletons', () => ({
    default: () => <div data-testid="skeleton" />,
}));

const mockedGetMovies = vi.mocked(getMovies);

function createMovie(
    id: number,
    title: string,
    genres: string[] = ['Action'],
) {
    return {
        id,
        title,
        title_long: title,
        year: 2025,
        rating: 8,
        runtime: 120,
        genres,
        summary: 'Test movie summary',
        like_count: 100,

        background_image: '',
        medium_cover_image: '',
        background_image_original: '',
        large_cover_image: '',
        description_full: '',
        description_intro: '',

        yt_trailer_code: '',
        imdb_code: '',
        language: 'English',
        slug: title.toLowerCase().replaceAll(' ', '-'),

        medium_screenshot_image1: '',
        medium_screenshot_image2: '',
        medium_screenshot_image3: '',

        large_screenshot_image1: '',
        large_screenshot_image2: '',
        large_screenshot_image3: '',

        cast: [],
        torrents: [],
    };
}

function createResponse(movies: ReturnType<typeof createMovie>[]) {
    return {
        data: {
            movie_count: movies.length,
            limit: 6,
            page_number: 1,
            movies,
        },
        status: 'ok',
        status_message: 'Query was successful',
    };
}

function renderHome() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    return render(
        <QueryClientProvider client={queryClient}>
            <Home />
        </QueryClientProvider>,
    );
}

describe('Home page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders loading skeletons while movies are loading', async () => {
        mockedGetMovies.mockImplementation(
            () => new Promise(() => { }),
        );

        renderHome();

        expect(screen.getAllByTestId('skeleton')).toHaveLength(18);
    });

    it('loads and displays all four movie sections', async () => {
        const recentMovie = createMovie(1, 'Recent Movie');
        const actionMovie = createMovie(2, 'Action Movie');
        const animationMovie = createMovie(
            3,
            'Animation Movie',
            ['Animation'],
        );
        const likedMovie = createMovie(4, 'Liked Movie');

        mockedGetMovies
            .mockResolvedValueOnce(createResponse([recentMovie]))
            .mockResolvedValueOnce(createResponse([actionMovie]))
            .mockResolvedValueOnce(createResponse([animationMovie]))
            .mockResolvedValueOnce(createResponse([likedMovie]));

        renderHome();

        expect(await screen.findByText('Recent Added')).toBeInTheDocument();
        expect(screen.getByText('Top Rated Action')).toBeInTheDocument();
        expect(
            screen.getByText('Best Rated Animation'),
        ).toBeInTheDocument();
        expect(screen.getByText('Most Liked')).toBeInTheDocument();

        expect(screen.getByText('Recent Movie')).toBeInTheDocument();
        expect(screen.getByText('Action Movie')).toBeInTheDocument();
        expect(screen.getByText('Animation Movie')).toBeInTheDocument();
        expect(screen.getByText('Liked Movie')).toBeInTheDocument();
    });

    it('makes four API calls when the home page loads', async () => {
        mockedGetMovies
            .mockResolvedValueOnce(createResponse([createMovie(1, 'Recent')]))
            .mockResolvedValueOnce(createResponse([createMovie(2, 'Action')]))
            .mockResolvedValueOnce(createResponse([createMovie(3, 'Animation')]))
            .mockResolvedValueOnce(createResponse([createMovie(4, 'Liked')]));

        renderHome();

        await waitFor(() => {
            expect(mockedGetMovies).toHaveBeenCalledTimes(4);
        });
    });

    it('requests recent movies with limit 6', async () => {
        mockedGetMovies.mockResolvedValue(createResponse([]));

        renderHome();

        await waitFor(() => {
            expect(mockedGetMovies).toHaveBeenCalledWith(
                { limit: 6 },
                expect.any(AbortSignal),
            );
        });
    });

    it('requests top rated Action movies correctly', async () => {
        mockedGetMovies.mockResolvedValue(createResponse([]));

        renderHome();

        await waitFor(() => {
            expect(mockedGetMovies).toHaveBeenCalledWith(
                {
                    limit: 6,
                    genre: 'Action',
                    sort_by: 'rating',
                    order_by: 'desc',
                },
                expect.any(AbortSignal),
            );
        });
    });

    it('requests best rated Animation movies correctly', async () => {
        mockedGetMovies.mockResolvedValue(createResponse([]));

        renderHome();

        await waitFor(() => {
            expect(mockedGetMovies).toHaveBeenCalledWith(
                {
                    limit: 6,
                    genre: 'Animation',
                    sort_by: 'rating',
                },
                expect.any(AbortSignal),
            );
        });
    });

    it('requests most liked movies correctly', async () => {
        mockedGetMovies.mockResolvedValue(createResponse([]));

        renderHome();

        await waitFor(() => {
            expect(mockedGetMovies).toHaveBeenCalledWith(
                {
                    limit: 6,
                    sort_by: 'like_count',
                },
                expect.any(AbortSignal),
            );
        });
    });

    it('removes duplicate movies from a section', async () => {
        const movie = createMovie(1, 'Duplicate Movie');

        mockedGetMovies
            .mockResolvedValueOnce(
                createResponse([
                    movie,
                    movie,
                    createMovie(2, 'Another Movie'),
                ]),
            )
            .mockResolvedValueOnce(createResponse([]))
            .mockResolvedValueOnce(createResponse([]))
            .mockResolvedValueOnce(createResponse([]));

        renderHome();

        await screen.findByText('Recent Added');

        expect(screen.getAllByTestId('movie-card')).toHaveLength(2);

        expect(
            screen.getAllByText('Duplicate Movie'),
        ).toHaveLength(1);
    });

    it('does not render a section when the API returns no movies', async () => {
        mockedGetMovies
            .mockResolvedValueOnce(
                createResponse([createMovie(1, 'Recent Movie')]),
            )
            .mockResolvedValueOnce(createResponse([]))
            .mockResolvedValueOnce(createResponse([]))
            .mockResolvedValueOnce(createResponse([]));

        renderHome();

        expect(await screen.findByText('Recent Added')).toBeInTheDocument();

        expect(
            screen.queryByText('Top Rated Action'),
        ).not.toBeInTheDocument();

        expect(
            screen.queryByText('Best Rated Animation'),
        ).not.toBeInTheDocument();

        expect(
            screen.queryByText('Most Liked'),
        ).not.toBeInTheDocument();
    });

    it('renders multiple movies in a section', async () => {
        const movies = [
            createMovie(1, 'Movie One'),
            createMovie(2, 'Movie Two'),
            createMovie(3, 'Movie Three'),
        ];

        mockedGetMovies
            .mockResolvedValueOnce(createResponse(movies))
            .mockResolvedValueOnce(createResponse([]))
            .mockResolvedValueOnce(createResponse([]))
            .mockResolvedValueOnce(createResponse([]));

        renderHome();

        expect(await screen.findByText('Recent Added')).toBeInTheDocument();

        expect(screen.getByText('Movie One')).toBeInTheDocument();
        expect(screen.getByText('Movie Two')).toBeInTheDocument();
        expect(screen.getByText('Movie Three')).toBeInTheDocument();

        expect(screen.getAllByTestId('movie-card')).toHaveLength(3);
    });

    it('stops showing skeletons after all queries finish', async () => {
        mockedGetMovies
            .mockResolvedValueOnce(
                createResponse([createMovie(1, 'Recent Movie')]),
            )
            .mockResolvedValueOnce(
                createResponse([createMovie(2, 'Action Movie')]),
            )
            .mockResolvedValueOnce(
                createResponse([createMovie(3, 'Animation Movie')]),
            )
            .mockResolvedValueOnce(
                createResponse([createMovie(4, 'Liked Movie')]),
            );

        renderHome();

        expect(await screen.findByText('Recent Added')).toBeInTheDocument();

        expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
    });
});