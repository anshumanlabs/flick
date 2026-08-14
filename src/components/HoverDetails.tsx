import type { Movie } from "../types/movies";
import type {Config} from "../types/config";

interface HoverDetailsProps {
    movie:Movie,
    config: Config
}

function HoverDetails({ movie, config }: HoverDetailsProps) {
    return (
        <div className="hover-details text-center text-white">
            <div className="mb-2" style={{fontSize:config.titleSize, fontWeight:config.fontStyle}}>
                {movie.title}
            </div>
            <div style={{fontSize:config.ratingSize, fontWeight:config.fontStyle}}>
                ⭐ {movie.rating} / 10
            </div>
            <div style={{fontSize:config.runtimeSize}}>
                ⏱ {movie.runtime} min
            </div>
        </div>
    )
}

export default HoverDetails;