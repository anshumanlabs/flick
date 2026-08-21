import type { Movie } from '../types/movies';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';
import HoverDetails from './HoverDetails';
import type { Config } from '../types/config';
import React from 'react';
import AddOrRemoveFavourite from './AddOrRemoveFavourite';

interface MovieCardProps {
    movie: Movie;
    config: Config;
}

function MovieCard({ movie, config }: MovieCardProps) {
    const BASE_IMG_URL = 'https://img.yts.gg/assets/images/movies/';
    const navigate = useNavigate();

    function getMovieFolder(url: string): string {
        if (!url) return '';
        return new URL(url).pathname?.split('/').at(-2) ?? '';
    }

    return (
        <div
            style={{
                width: config.width,
                height: config.height,
            }}
            className="movie-card"
            onClick={() => navigate(`/movies/${movie.id}`)}
        >
            <div className="group relative overflow-hidden">
                <img
                    src={
                        BASE_IMG_URL +
                        getMovieFolder(movie.medium_cover_image) +
                        '/medium-cover.jpg'
                    }
                    onError={(e) => {
                        e.currentTarget.src =
                            'https://placehold.co/300x450/111111/aaaaaa?text=FAILED%20TO%20LOAD';
                    }}
                    alt={movie.title}
                    style={{ border: config.border }}
                    className="contrast-110 saturate-110 block w-full transition-transform duration-1000
            group-hover:scale-110"
                />
                {config.hover && (
                    <div className="absolute top-1 right-1 z-10">
                        <AddOrRemoveFavourite movie={movie} />
                    </div>
                )}
                {config.hover && (
                    <div className="absolute inset-0 border-[4px] border-transparent group-hover:border-[#49c916] backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <HoverDetails movie={movie} config={config} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default React.memo(MovieCard);
