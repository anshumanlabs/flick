import { useEffect, useState } from "react";
import type { Movie, Torrent } from "../types/movies";
import "./MoviesDetails.css";
import { useLocation } from "react-router-dom";
import { getMovieById, suggestedMovies } from "../services/movieService";
import MovieCard from "../components/MovieCard";
import type { Config } from "../types/config";
import type { Cast } from "../types/cast";
import Popup from "../components/Popup";
import CastDetails from "../components/CastDetails";
import Button from "@mui/material/Button";

function MovieDetails() {
  const BASE_IMG_URL = "https://img.yts.gg/assets/images/movies/";
  function getMovieFolder(url: string): string {
    return new URL(url).pathname.split("/").at(-2) ?? "";
  }
  const location = useLocation();
  const { movie } = location.state as { movie: Movie };
  const [suggested, setSuggested] = useState<Movie[]>([]);
  const [configs] = useState<Config>({
    width: 92,
    height: 140,
    titleSize: 15,
    ratingSize: 15,
    runtimeSize: 15,
    fontStyle: "bold",
    border: "4px solid #f7f7f7",
    hover: false
  });

  const [mediumScreenshots, setMediumScreenshots] = useState<
    Map<string, string>[]
  >([]);
  const [castDetails, setCastDetails] = useState<Cast[]>([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpImage, setPopUpImage] = useState<string | undefined>(undefined);
  const [torrentDetails, setTorrentDetails] = useState<Torrent[]>([]);

  useEffect(() => {
    suggestedMovies(movie.id).then((fetchedMovies) => {
      setSuggested(fetchedMovies.data.movies);
    });

    getMovieById(movie.id).then((fetchedMovie) => {
      setMediumScreenshots(
        fetchedMovie.data.movie.medium_screenshot_image1
          ? [
            new Map([
              ["medium", fetchedMovie.data.movie?.medium_screenshot_image1?.replace("https://yts.gg/", "https://img.yts.gg/")],
              ["large", fetchedMovie.data.movie?.large_screenshot_image1?.replace("https://yts.gg/", "https://img.yts.gg/")],
            ]),
            new Map([
              ["medium", fetchedMovie.data.movie.medium_screenshot_image2?.replace("https://yts.gg/", "https://img.yts.gg/")],
              ["large", fetchedMovie.data.movie.large_screenshot_image2?.replace("https://yts.gg/", "https://img.yts.gg/")],
            ]),
            new Map([
              ["medium", fetchedMovie.data.movie.medium_screenshot_image3?.replace("https://yts.gg/", "https://img.yts.gg/")],
              ["large", fetchedMovie.data.movie.large_screenshot_image3?.replace("https://yts.gg/", "https://img.yts.gg/")],
            ]),
          ]
          : [],
      );
      setCastDetails(fetchedMovie.data.movie.cast);
      setTorrentDetails(fetchedMovie.data.movie.torrents);
    });
  }, [movie.id]);

  const openPopUp = (imageUrl: string | undefined) => () => {
    setPopUpImage(imageUrl);
    setShowPopUp(true);
  };

  function downloadTorrent(torrent: Torrent) {
    console.log(torrent.url)
    const link = document.createElement("a");
    link.href = torrent.url;
    link.download = `${movie.title}-${torrent.quality}.torrent`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="movie-details">
      <section
        className="movie-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
            url(${BASE_IMG_URL + getMovieFolder(movie.medium_cover_image) + "/background.jpg"})`,
        }}
      >
        <div className="hero-overlay grid grid-cols-20">
          <div className="col-span-5">
            <img
              className="border-[8px] border-[#49c916]"
              src={
                BASE_IMG_URL +
                getMovieFolder(movie.medium_cover_image) +
                "/medium-cover.jpg"
              }
              alt={movie?.title}
            />
          </div>
          <div
            className="movie-info col-span-11">
            <h1
              style={{
                fontSize: "2.5em",
                marginBottom: "24px",
                lineHeight: "42px",
                fontWeight: "bold"
              }}>{movie?.title}</h1>
            <div className="movie-meta">
              <span>⭐ {movie?.rating}</span>
              <span>{movie?.year}</span>
              <span>{movie?.runtime} min</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="
                          px-3 py-1
                          rounded-md
                          bg-black/40
                          border border-green-500/40
                          text-green-400
                          text-xs
                          font-semibold
                          uppercase
                          tracking-wide
                          backdrop-blur-md
                        "
                >
                  {genre}
                </span>
              ))}
            </div>
            <p>{movie?.description_full}</p>
            {torrentDetails?.length > 0 && <div className="mt-5">
              <div className="font-bold mb-3">Download Torrent File</div>
              {torrentDetails?.map((torrent, index) =>
              (<Button sx={{
                mr: 1, backgroundColor: "#49c916",
                color: "#fff",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#3da912",
                },
              }} key={index} variant="contained" onClick={() => downloadTorrent(torrent)}>{torrent.quality}</Button>)
              )}
            </div>}
          </div>
          <div className="col-span-4">
            <div className="text-center text-2xl font-bold mb-3">Similar Movies</div>
            <div className="grid grid-cols-2">
              {suggested.map((suggestedMovie) => (
                <div className="grid grid-row-2">
                  <MovieCard
                    key={suggestedMovie.id}
                    movie={suggestedMovie}
                    config={configs}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
      <div className="grid grid-cols-4 mt-3 gap-3">
        {movie.yt_trailer_code && (
          <div className="aspect-video w-full p-2">
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${movie.yt_trailer_code}`}
              title={`${movie.title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        )}

        {mediumScreenshots.map((screenshot, index) => (
          <div
            key={index}
            className="aspect-video w-full p-2 cursor-pointer"
            onClick={openPopUp(screenshot.get("large"))}
          >
            <img
              src={screenshot.get("medium")}
              alt="Screenshot"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        ))}
      </div>
      <Popup
        key={popUpImage}
        open={showPopUp}
        onClose={() => setShowPopUp(false)}
        imageUrl={popUpImage || ""}
      ></Popup>
    </div>
  );
}

export default MovieDetails;
