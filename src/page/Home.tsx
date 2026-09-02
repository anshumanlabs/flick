import { useState } from 'react';
import { getMovies } from '../services/movieService';
import MovieCard from '../components/MovieCard';
import { homeConfig } from '../types/config';
import { removeDuplicate } from '../utils/movies';
import SectionTitle from '../components/SectionTitle';
import Skeletons from '../components/Skeletons';
import { useQueries } from '@tanstack/react-query';

function Home() {
    const limit = 6;
    const [touchHoveredMovieId, setTouchHoveredMovieId] = useState<number | null>(null);

    const results = useQueries({
        queries: [
            {
                queryKey: ['moveies', 'recent', limit],
                queryFn: async ({ signal }) => {
                    const response = await getMovies({ limit }, signal);
                    return removeDuplicate(response.data.movies);
                },
            },
            {
                queryKey: ['moveies', 'top-rated-action', limit],
                queryFn: async ({ signal }) => {
                    const response = await getMovies(
                        { limit, genre: 'Action', sort_by: 'rating', order_by: 'desc' },
                        signal,
                    );
                    return removeDuplicate(response.data.movies);
                },
            },
            {
                queryKey: ['moveies', 'best-rated-animation', limit],
                queryFn: async ({ signal }) => {
                    const response = await getMovies(
                        { limit, genre: 'Animation', sort_by: 'rating' },
                        signal,
                    );
                    return removeDuplicate(response.data.movies);
                },
            },
            {
                queryKey: ['moveies', 'most-liked', limit],
                queryFn: async ({ signal }) => {
                    const response = await getMovies({ limit, sort_by: 'like_count' }, signal);
                    return removeDuplicate(response.data.movies);
                },
            },
        ],
    });

    const [recentQuery, actionQuery, animationQuery, likedQuery] = results;

    const homePageConfig = [
        {
            title: 'Recent Added',
            data: recentQuery.data ?? [],
        },
        {
            title: 'Top Rated Action',
            data: actionQuery.data ?? [],
        },
        {
            title: 'Best Rated Animation',
            data: animationQuery.data ?? [],
        },
        {
            title: 'Most Liked',
            data: likedQuery.data ?? [],
        },
    ];

    const isLoading = results.some((query) => query.isLoading);

    return (
        <div className="px-3">
            {isLoading
                ? Array.from({ length: 3 }).map((_, index) => (
                      <div
                          key={index}
                          style={{ justifyItems: 'center' }}
                          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:p-4 mg:p-4 sm:p-4 mt-5"
                      >
                          {Array.from({ length: limit }).map((_, index) => (
                              <div
                                  key={index}
                                  style={{
                                      width: homeConfig.width,
                                      aspectRatio: '2/3',
                                      justifyItems: 'center',
                                  }}
                                  className="mb-5"
                              >
                                  <Skeletons width="100%" height="100%" />
                              </div>
                          ))}
                      </div>
                  ))
                : homePageConfig.map(
                      (page, index) =>
                          page?.data?.length > 0 && (
                              <div key={page.title}>
                                  <div className="ml-1 mr-5 flex items-center justify-between m-5">
                                      <SectionTitle title={page.title} index={index + 1} />
                                  </div>
                                  <div
                                      style={{ justifyItems: 'center' }}
                                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:p-4 mg:p-3 sm:p-2"
                                  >
                                      {page?.data?.map((movie) => (
                                          <MovieCard
                                              key={movie.id}
                                              movie={movie}
                                              config={homeConfig}
                                              touchHoveredMovieId={touchHoveredMovieId}
                                              setTouchHoveredMovieId={setTouchHoveredMovieId}
                                          />
                                      ))}
                                  </div>
                              </div>
                          ),
                  )}
        </div>
    );
}

export default Home;
