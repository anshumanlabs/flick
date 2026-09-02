import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getSuggestedMovies } from '../../services/movieService';
import MovieCard from '../MovieCard';
import { removeDuplicate } from '../../utils/movies';
import SectionTitle from '../SectionTitle';
import { useQuery } from '@tanstack/react-query';

function MovieSuggestion() {
    const configs = {
        width: 92,
        height: 140,
        titleSize: 15,
        ratingSize: 15,
        fontWeight: 'bold',
        border: '2px solid #f7f7f7',
        borderRadius: '10px',
        hover: false,
    };
    const [touchHoveredMovieId, setTouchHoveredMovieId] = useState<number | null>(null);
    const params = useParams();
    const { data: movies } = useQuery({
        queryKey: ['suggested-movies', String(params.id)],
        queryFn: async ({ signal }) => {
            const response = await getSuggestedMovies(params.id, signal);
            return removeDuplicate(response.data.movies);
        },
    });

    return (
        <>
            <div className="mt-5 flex mb-3">
                <SectionTitle title={'You may also like'} />
            </div>
            <div className="grid grid-cols-2">
                {movies?.map((suggestedMovie) => (
                    <div className="grid grid-row-2 mt-2 justify-center" key={suggestedMovie.imdb_code}>
                        <MovieCard
                            movie={suggestedMovie}
                            config={configs}
                            touchHoveredMovieId={touchHoveredMovieId}
                            setTouchHoveredMovieId={setTouchHoveredMovieId}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}

export default MovieSuggestion;
