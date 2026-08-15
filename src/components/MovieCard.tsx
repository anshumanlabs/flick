import type { Movie } from "../types/movies";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";
import HoverDetails from "./HoverDetails";
import type { Config } from "../types/config";

interface MovieCardProps {
  movie: Movie;
  config: Config;
}

function MovieCard({ movie, config }: MovieCardProps) {
  const BASE_IMG_URL = "https://img.yts.gg/assets/images/movies/";
  const navigate = useNavigate();

  function getMovieFolder(url: string): string {
    return new URL(url).pathname.split("/").at(-2) ?? "";
  }

  return (
    <div
      style={{
        width: config.width == 0 ? "auto" : config.width,
        height: config.height == 0 ? "auto" : config.height,
      }}
      className="movie-card"
      onClick={() => navigate(`/movies/${movie.id}`, { state: { movie } })}
    >
      <div className="relative overflow-hidden">
        <img
          src={
            BASE_IMG_URL +
            getMovieFolder(movie.medium_cover_image) +
            "/medium-cover.jpg"
          }
          alt={movie.title}
          style={{ border: config.border }}
          className="
            block
            w-full
            object-cover
            transition-transform
            duration-300
            hover:scale-105
            hover:shadow-lg
          "
        />
        {config.hover &&
          <div className={`absolute inset-0 border-[8px] border-transparent hover:border-[#49c916] bg-black/10 backdrop-blur-[2px] opacity-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center`}>
            <HoverDetails movie={movie} config={config} />
          </div>
        }
      </div>
    </div>
  );
}

export default MovieCard;
