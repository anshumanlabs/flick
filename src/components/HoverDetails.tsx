import type { Movie } from "../types/movies";

function HoverDetails({ movie }: { movie: Movie }) {
    return (
        <div className="hover-details text-center">
            <div className="text-white text-xl font-bold mb-2">
                {movie.title}
            </div>
            <div className="text-white text-lg font-bold">
                ⭐ {movie.rating} / 10
            </div>
            <div className="text-white text-sm">
                ⏱ {movie.runtime} min
            </div>
        </div>
    )
}

export default HoverDetails;