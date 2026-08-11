import type { Movie } from "../types/movies";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="movie-card"
      onClick={() => navigate(`/movies/${movie.id}`)}
    >
      <div className="relative overflow-hidden">
        <img
          src={movie.medium_cover_image}
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
        <p
          className="
            mt-3
            line-clamp-2
            text-sm
            leading-5
            text-zinc-400
          "
        >
          {movie.title}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;