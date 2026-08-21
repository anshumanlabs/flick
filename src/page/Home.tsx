import { useEffect, useState } from 'react';
import { getMovies } from '../services/movieService';
import type { Movie } from '../types/movies';
import MovieCard from '../components/MovieCard';
import { homeConfig } from '../types/config';
import { removeDuplicate } from '../utils/movies';
import SectionTitle from '../components/SectionTitle';

function Home() {
    const limit = 6;
    const [homePageConfig, setHomePageConfig] = useState<{ title: string; data: Movie[] }[]>([]);

    useEffect(() => {
        Promise.all([
            getMovies({ limit }),
            getMovies({
                limit,
                genre: 'Action',
                sort_by: 'rating',
                order_by: 'desc',
            }),
            getMovies({ limit, genre: 'Animation', sort_by: 'rating' }),
            getMovies({ limit, sort_by: 'like_count' }),
        ]).then(([recent, top, anime, liked]) => {
            const data = [
                {
                    title: 'Recent Added',
                    data: removeDuplicate(recent.data.movies),
                },
                {
                    title: 'Top Rated Action',
                    data: removeDuplicate(top.data.movies),
                },
                {
                    title: 'Best Rated Animation',
                    data: removeDuplicate(anime.data.movies),
                },
                {
                    title: 'Most Liked',
                    data: removeDuplicate(liked.data.movies),
                },
            ];
            setHomePageConfig(data);
        });
    }, [limit]);

    return (
        <div className="p-5">
            {homePageConfig.map(
                (page, index) =>
                    page?.data?.length > 0 && (
                        <div key={page.title}>
                            <div className="mt-5 ml-1 mr-5 flex items-center justify-between">
                                <SectionTitle title={page.title} index={index + 1} />
                            </div>
                            <div
                                style={{ justifyItems: 'center' }}
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4"
                            >
                                {page?.data?.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} config={homeConfig} />
                                ))}
                            </div>
                        </div>
                    ),
            )}
        </div>
    );
}

export default Home;
