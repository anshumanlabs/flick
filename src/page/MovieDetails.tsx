import type { Movie } from "../types/movies";
import "./MoviesDetails.css";
import { useLocation } from "react-router-dom";

function MovieDetails() {
  const location = useLocation();
  const { movie } = location.state as { movie: Movie };

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
    </div>
  );
}

export default MovieDetails;
