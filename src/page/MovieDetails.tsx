import { useEffect, useState } from "react";
import type { Movie } from "../types/movies";
import "./MoviesDetails.css";
import { useLocation } from "react-router-dom";
import { getMovieById, suggestedMovies } from "../services/movieService";
import MovieCard from "../components/MovieCard";
import type { Config } from "../types/config";
import type { Cast } from "../types/cast";
import Popup from "../components/Popup";
import CastDetails from "../components/CastDetails";

function MovieDetails() {
  const BASE_IMG_URL = "https://img.yts.gg/assets/images/movies/";
  function getMovieFolder(url: string): string {
    return new URL(url).pathname.split("/").at(-2) ?? "";
  }
  const location = useLocation();
  const { movie } = location.state as { movie: Movie };
  const [suggested, setSuggested] = useState<Movie[]>([]);
  const [configs] = useState<Config>({
    width: 125,
    height: 100,
    titleSize: 15,
    ratingSize: 15,
    runtimeSize: 15,
    fontStyle: "bold",
  });

  const [mediumScreenshots, setMediumScreenshots] = useState<
    Map<string, string>[]
  >([]);
  const [castDetails, setCastDetails] = useState<Cast[]>([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpImage, setPopUpImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    suggestedMovies(movie.id).then((fetchedMovies) => {
      setSuggested(fetchedMovies.data.movies);
    });

    getMovieById(movie.id).then((fetchedMovie) => {
      setMediumScreenshots(
        fetchedMovie.data.movie.medium_screenshot_image1
          ? [
              new Map([
                ["medium", fetchedMovie.data.movie.medium_screenshot_image1],
                ["large", fetchedMovie.data.movie.large_screenshot_image1],
              ]),
              new Map([
                ["medium", fetchedMovie.data.movie.medium_screenshot_image2],
                ["large", fetchedMovie.data.movie.large_screenshot_image2],
              ]),
              new Map([
                ["medium", fetchedMovie.data.movie.medium_screenshot_image3],
                ["large", fetchedMovie.data.movie.large_screenshot_image3],
              ]),
            ]
          : [],
      );
      setCastDetails(fetchedMovie.data.movie.cast);
    });
  }, [movie.id]);

  const openPopUp = (imageUrl: string | undefined) => () => {
    setPopUpImage(imageUrl);
    setShowPopUp(true);
  };

  return (
    <div className="movie-details">
      <section
        className="movie-hero"
        style={{
          backgroundImage: `url(${
            BASE_IMG_URL +
            getMovieFolder(movie.medium_cover_image) +
            "/background.jpg"
          })`,
        }}
      >
        <div className="hero-overlay">
          <img
            className="movie-poster"
            src={
              BASE_IMG_URL +
              getMovieFolder(movie.medium_cover_image) +
              "/medium-cover.jpg"
            }
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
      {castDetails && castDetails.length > 0 && (
        <section className="cast-details text-center">
          <h2>Cast</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-4">
            {castDetails.map((castMember) => (
              <CastDetails key={castMember.imdb_code} cast={castMember} />
            ))}
          </div>
        </section>
      )}
      <div>
        {mediumScreenshots.length > 0 && (
          <div className="screenshots">
            <div className="screenshot-carousel">
              {mediumScreenshots.map((screenshot, index) => (
                <div
                  className="screenshot-slide"
                  key={index}
                  onClick={openPopUp(screenshot.get("large"))}
                >
                  <img
                    src={screenshot.get("medium")}
                    alt={screenshot.get("medium")}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-6 md:flex-row">
        {movie.yt_trailer_code && (
          <div className="w-full md:w-1/2">
            <iframe
              className="aspect-video w-full rounded-xl"
              src={`https://www.youtube.com/embed/${movie.yt_trailer_code}`}
              title={`${movie.title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        )}
        <div className="suggested-movies">
          <div className="text-center text-2xl font-bold">Suggested Movies</div>
          <div className="grid grid-cols-2 gap-4 justify-items-center">
            {suggested.map((suggestedMovie) => (
              <MovieCard
                key={suggestedMovie.id}
                movie={suggestedMovie}
                config={configs}
              />
            ))}
          </div>
        </div>
      </div>
      <Popup
        open={showPopUp}
        onClose={() => setShowPopUp(false)}
        imageUrl={popUpImage || ""}
      ></Popup>
    </div>
  );
}

export default MovieDetails;
