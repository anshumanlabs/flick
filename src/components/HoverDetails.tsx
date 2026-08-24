import type { Movie } from '../types/movies';
import type { Config } from '../types/config';

interface HoverDetailsProps {
    readonly movie: Movie;
    readonly config: Config;
}

function HoverDetails({ movie, config }: HoverDetailsProps) {
    return (
        <div className="hover-details text-center text-white font-bold">
            <div
                className="mb-2 p-2 text-sm sm:text-base md:text-xl lg:text-4xl line-clamp-3"
                style={{
                    fontSize: config.titleSize,
                    fontWeight: config.fontWeight,
                }}
            >
                {movie?.title_long}
            </div>

            <div className="text-xs sm:text-sm md:text-base lg:text-xl">⭐ {movie?.rating} / 10</div>

            <div className="flex justify-center gap-1 sm:gap-2 flex-wrap mt-2 sm:mt-3">
                {movie?.genres?.slice(0, 2).map((genre) => (
                    <span
                        key={genre}
                        className="rounded-full bg-[#1b5e20]/80 text-[#7cff6b] px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs md:text-sm"
                    >
                        {genre}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default HoverDetails;
