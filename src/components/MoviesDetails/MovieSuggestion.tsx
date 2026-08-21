import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Movie } from '../../types/movies';
import { getSuggestedMovies } from '../../services/movieService';
import MovieCard from '../MovieCard';
import { removeDuplicate } from '../../utils/movies';
import SectionTitle from '../SectionTitle';

function MovieSuggestion() {
    const [suggestedMovies, setSuggestedMovie] = useState<Movie[]>([]);
    const configs = {
        width: 92,
        height: 140,
        titleSize: 15,
        ratingSize: 15,
        fontWeight: 'bold',
        border: '4px solid #f7f7f7',
        hover: false,
    };

    const params = useParams();

    useEffect(() => {
        getSuggestedMovies(params.id).then((fetchedMovies) => {
            setSuggestedMovie(removeDuplicate(fetchedMovies.data.movies));
        });
    }, [params.id]);

    return (
        <>
            <div className="mt-5 flex">
                <SectionTitle title={'Similar Movies'} />
            </div>
            <div className="grid grid-cols-2">
                {suggestedMovies.map((suggestedMovie) => (
                    <div className="grid grid-row-2 mt-2 justify-center">
                        <MovieCard key={suggestedMovie.imdb_code} movie={suggestedMovie} config={configs} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default MovieSuggestion;
