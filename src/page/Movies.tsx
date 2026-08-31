import MovieCard from '../components/MovieCard';
import PaginationUI from '../components/PaginationUI';
import { useSearchParams } from 'react-router-dom';
import Skeletons from '../components/Skeletons';
import Filter from '../components/Filter';
import RecordNotFound from '../components/RecordNotFound';
import { defaultConfig } from '../types/config';
import { useMovies } from '../hooks/useMovies';
import { useState } from 'react';

function Movies() {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryString = searchParams.toString();
    const limit = Number(import.meta.env.VITE_LIMIT ?? 20);
    const { movies, loading, error, paginationData } = useMovies(queryString, limit);
    const [touchHoveredMovieId, setTouchHoveredMovieId] = useState<number | null>(null);

    return (
        <div>
            <div className="grid grid-cols-12 items-center sticky top-[64px] z-40 bg-black">
                <div className="col-span-9 lg:col-span-11 md:col-span-10 sm:col-span-9 justify-center">
                    <PaginationUI
                        paginationData={paginationData}
                        onPageChange={(page) => {
                            setSearchParams((prev) => {
                                prev.set('page', String(page));
                                return prev;
                            });
                        }}
                    />
                </div>
                <div className="col-span-3 lg:col-span-1 md:col-span-2 sm:col-span-3 justify-end mr-3">
                    <Filter />
                </div>
            </div>

            {loading ? (
                <div
                    style={{ justifyItems: 'center' }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-4 lg:p-4 p-2"
                >
                    {Array.from({ length: limit }).map((_, index) => (
                        <Skeletons key={index} width={defaultConfig.width} height={'45vh'} />
                    ))}
                </div>
            ) : movies?.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-4 lg:p-4 p-2">
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            style={{
                                width: '100%',
                                height: '100%',
                                justifyItems: 'center',
                            }}
                            className="mb-5"
                        >
                            <MovieCard
                                movie={movie}
                                config={defaultConfig}
                                touchHoveredMovieId={touchHoveredMovieId}
                                setTouchHoveredMovieId={setTouchHoveredMovieId}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <RecordNotFound />
            )}
            {error && <RecordNotFound />}
        </div>
    );
}

export default Movies;
