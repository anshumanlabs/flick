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
    touchHoveredMovieId: number | null;
    setTouchHoveredMovieId: React.Dispatch<React.SetStateAction<number | null>>;
    index?: number;
}

function MovieCard({ movie, config, touchHoveredMovieId, setTouchHoveredMovieId, index }: MovieCardProps) {
    const BASE_IMG_URL = 'https://img.yts.gg/assets/images/movies/';
    const navigate = useNavigate();

    function getMovieFolder(url: string): string {
        if (!url) return '';
        return new URL(url).pathname?.split('/').at(-2) ?? '';
    }

    const handlePointerEnter = (e: React.PointerEvent) => {
        if (e.pointerType === 'touch') {
            setTouchHoveredMovieId(movie.id);
        }
    };

    const handlePointerDown = (e: React.PointerEvent) => {
        if (e.pointerType === 'touch') {
            setTouchHoveredMovieId(movie.id);
        }
    };

    const staggerClass = index !== undefined ? `stagger-${(index % 6) + 1}` : '';

    return (
        <div
            style={{
                width: config.width,
                height: config.height,
            }}
            className={`movie-card ${staggerClass}`}
            onPointerEnter={handlePointerEnter}
            onPointerDown={handlePointerDown}
            onClick={() => navigate(`/movies/${movie.id}`)}
        >
            <div className="group relative overflow-hidden rounded-lg">
                <img
                    src={BASE_IMG_URL + getMovieFolder(movie.medium_cover_image) + '/medium-cover.jpg'}
                    onError={(e) => {
                        e.currentTarget.src =
                            'https://placehold.co/300x450/111111/aaaaaa?text=FAILED%20TO%20LOAD';
                    }}
                    alt={movie.title}
                    style={{ border: config.border }}
                    className="contrast-110 saturate-110 block w-full transition-transform duration-700
                    group-hover:scale-110"
                />
                {config.hover && (
                    <div className="absolute top-1.5 right-1.5 z-10">
                        <AddOrRemoveFavourite movie={movie} />
                    </div>
                )}
                {config.hover && (
                    <div
                        className={`hover-overlay absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 flex items-center justify-center ${
                            touchHoveredMovieId === movie.id ? 'opacity-100' : ''
                        }`}
                        style={{ border: 'none' }}
                    >
                        <HoverDetails movie={movie} config={config} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default React.memo(MovieCard);
