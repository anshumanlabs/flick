import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { Movie } from '../../types/movies';
import { getSuggestedMovies } from '../../services/movieService';
import MovieCard from '../MovieCard';
import { removeDuplicate } from '../../utils/movies';

function MovieSuggestion() {
    const [suggestedMovies, setSuggestedMovie] = useState<Movie[]>([]);
    const configs = {
        width: 92,
        height: 140,
        titleSize: 15,
        ratingSize: 15,
        fontStyle: "bold",
        border: "4px solid #f7f7f7",
        hover: false
    };

    const params = useParams();

    useEffect(() => {
        getSuggestedMovies(params.id).then((fetchedMovies) => {
            setSuggestedMovie(removeDuplicate(fetchedMovies.data.movies));
        })
    }, [params.id]);

    return (<>
        <div className="text-center text-2xl font-bold mb-3">Similar Movies</div>
        <div className="grid grid-cols-2">
            {suggestedMovies.map((suggestedMovie) => (
                <div className="grid grid-row-2 mt-2">
                    <MovieCard
                        key={suggestedMovie.id}
                        movie={suggestedMovie}
                        config={configs}
                    />
                </div>
            ))}
        </div>
    </>)

}

export default MovieSuggestion;