import type { Movie } from "../types/movies";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  const BASE_IMG_URL = "https://img.yts.gg/assets/images/movies/";
  const navigate = useNavigate();

  function getMovieFolder(url: string): string {
    return new URL(url).pathname.split("/").at(-2) ?? "";
  }

  return (
    <div
      className="movie-card"
      onClick={() => navigate(`/movies/${movie.id}`, { state: { movie } })}
    >
      <div className="relative overflow-hidden">
        <img
          src={BASE_IMG_URL + getMovieFolder(movie.medium_cover_image) + "/medium-cover.jpg"}
          alt={movie.title}
          className="
            w-full
            h-[320px]
            object-cover
            transition-transform
            duration-300
          "
        />
        <div
          className="
            absolute
            top-3
            right-3
            rounded-md
            bg-black/80
            px-2
            py-1
            text-sm
            font-semibold
            text-white
          "
        >
          ⭐ {movie.rating}
        </div>
      </div>

      <div className="p-4">
        <h1
          className="
            mt-3
            line-clamp-2
            leading-5
            text-zinc-400
          "
        >
          {movie.title}
        </h1>
      </div>
    </div>
  );
}

export default MovieCard;
