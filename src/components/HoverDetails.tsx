import type { Movie } from "../types/movies";
import type { Config } from "../types/config";

interface HoverDetailsProps {
    movie: Movie,
    config: Config
}

function HoverDetails({ movie, config }: HoverDetailsProps) {
    return (
        <div className="hover-details text-center text-white font-bold">
            <div className="mb-2 text-center p-1 line-clamp-4" style={{ fontSize: config.titleSize, fontWeight: config.fontStyle }}>
                {movie.title_long}
            </div>
            <div className="text-xl">
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