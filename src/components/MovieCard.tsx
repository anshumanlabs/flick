import type { Movie } from "../types/movies";
import { useNavigate } from "react-router-dom";

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
      <img src={movie.medium_cover_image} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.summary}</p>
    </div>
  );
}

export default MovieCard;
