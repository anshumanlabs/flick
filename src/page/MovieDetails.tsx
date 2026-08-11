import { useEffect, useState } from "react";
import type { Movie } from "../types/movies";
import "./MoviesDetails.css";
import { useLocation } from "react-router-dom";
import { suggestedMovies } from "../services/movieService";
import MovieCard from "../components/MovieCard";

function MovieDetails() {
  const location = useLocation();
  const { movie } = location.state as { movie: Movie };
  const [suggested, setSuggested] = useState<Movie[]>([]);

  useEffect(() => {
    suggestedMovies(movie.id).then((fetchedMovies) => {
      setSuggested(fetchedMovies.data.movies);
    });
  }, [movie.id]);

  return (
    <div className="movie-details">
      <section
        className="movie-hero"
        style={{
          backgroundImage: `url(${movie?.medium_cover_image})`,
        }}
      >
        <div className="hero-overlay">
          <img
            className="movie-poster"
            src={movie?.medium_cover_image}
            alt={movie?.title}
          />
          <div className="movie-info">
            <h1>{movie?.title}</h1>

            <div className="movie-meta">
              <span>⭐ {movie?.rating}</span>
              <span>{movie?.year}</span>
              <span>{movie?.runtime} min</span>
            </div>

            <div className="genres">
              {movie?.genres.map((genre) => (
                <span key={genre}>{genre}</span>
              ))}
            </div>

            <p>{movie?.description_full}</p>

            <div className="actions">
              {movie?.yt_trailer_code && <button>Watch Trailer</button>}

              <button>♡ Favorite</button>
            </div>
          </div>
        </div>
      </section>

      {/* Movie Information */}
      <section className="movie-details-info">
        <h2>Movie Information</h2>

        <div className="info-grid">
          <div>
            <span>IMDb</span>
            <strong>{movie?.imdb_code}</strong>
          </div>

          <div>
            <span>Language</span>
            <strong>{movie?.language?.toUpperCase()}</strong>
          </div>

          <div>
            <span>Year</span>
            <strong>{movie?.year}</strong>
          </div>

          <div>
            <span>Runtime</span>
            <strong>{movie?.runtime} minutes</strong>
          </div>

          <div>
            <span>Rating</span>
            <strong>⭐ {movie?.rating}</strong>
          </div>

          <div>
            <span>Genre</span>
            <strong>{movie?.genres?.join(", ")}</strong>
          </div>
        </div>
      </section>
      <div className="trailer-container">
        {movie.yt_trailer_code && (
          <iframe
            className="w-full max-w-[640px] aspect-video rounded-xl"
            src={`https://www.youtube.com/embed/${movie.yt_trailer_code}`}
            title={`${movie.title} Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        )}

        {suggested.length > 0 && (
          <div className="suggested-movies">
            <h2>Suggested Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
              {suggested.map((suggestedMovie) => (
                <MovieCard key={suggestedMovie.id} movie={suggestedMovie} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
