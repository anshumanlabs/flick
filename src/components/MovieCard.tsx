import type { Movie } from "../types/movies";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";
import HoverDetails from "./HoverDetails";

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
            border-[2px]
            border-black
            rounded-lg
            hover:scale-105
            hover:shadow-lg
          "
        />
        <div className="absolute inset-0 bg-opacity-100 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <HoverDetails movie={movie} />
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
