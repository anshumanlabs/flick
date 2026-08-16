import type { Movie } from "../types/movies";
import type { Config } from "../types/config";

interface HoverDetailsProps {
    movie: Movie,
    config: Config
}

function HoverDetails({ movie, config }: HoverDetailsProps) {
    return (
        <div className="hover-details text-center text-white">
            <div className="mb-2 text-center p-1" style={{ fontSize: config.titleSize, fontWeight: config.fontStyle }}>
                {movie.title}
            </div>
            <div style={{ fontSize: config.ratingSize, fontWeight: config.fontStyle }}>
                ⭐ {movie.rating} / 10
            </div>
            <div className="flex justify-center gap-2 flex-wrap mt-3">
                {movie.genres?.slice(0, 2).map((genre) => (
                    <span
                        key={genre}
                        className="rounded-full bg-[#1b5e20]/80 text-[#7cff6b] px-3 py-1 text-sm"
                    >
                        {genre}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default HoverDetails;