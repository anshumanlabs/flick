import { useEffect, useState } from "react";
import type { Movie, Screenshot, Torrent } from "../types/movies";
import "./MoviesDetails.css";
import { useParams } from "react-router-dom";
import { getMovieById } from "../services/movieService";
import type { Cast } from "../types/cast";
import Popup from "../components/Popup";
import MovieSuggestion from "../components/MoviesDetails/MovieSuggestion";
import CastDetails from "../components/MoviesDetails/CastDetails";
import TorrentInfo from "../components/TorrentInfo";

function MovieDetails() {
  const BASE_IMG_URL = "https://img.yts.gg/assets/images/movies/";
  function getMovieFolder(url: string): string {
    return new URL(url).pathname.split("/").at(-2) ?? "";
  }
  const [movie, setMovie] = useState<Movie>();
  const [mediumScreenshots, setMediumScreenshots] = useState<
    Screenshot[]
  >([]);
  const [castDetails, setCastDetails] = useState<Cast[]>([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpImage, setPopUpImage] = useState<string | undefined>(undefined);
  const [torrentDetails, setTorrentDetails] = useState<Torrent[]>([]);
  const [likedCount, setLikedCount] = useState<number>();

  const params = useParams();

  useEffect(() => {
    getMovieById(params.id).then((fetchedMovie) => {
      setMovie(fetchedMovie.data.movie);
      const movie = fetchedMovie.data.movie;
      setMediumScreenshots(
        movie.medium_screenshot_image1
          ? [
            {
              medium:
                movie.medium_screenshot_image1.replace(
                  "https://yts.gg/",
                  "https://img.yts.gg/"
                ),
              large:
                movie.large_screenshot_image1?.replace(
                  "https://yts.gg/",
                  "https://img.yts.gg/"
                ) ?? "",
            },
            {
              medium:
                movie.medium_screenshot_image2?.replace(
                  "https://yts.gg/",
                  "https://img.yts.gg/"
                ) ?? "",
              large:
                movie.large_screenshot_image2?.replace(
                  "https://yts.gg/",
                  "https://img.yts.gg/"
                ) ?? "",
            },
            {
              medium:
                movie.medium_screenshot_image3?.replace(
                  "https://yts.gg/",
                  "https://img.yts.gg/"
                ) ?? "",
              large:
                movie.large_screenshot_image3?.replace(
                  "https://yts.gg/",
                  "https://img.yts.gg/"
                ) ?? "",
            },
          ]
          : []
      );
      setCastDetails(fetchedMovie.data.movie.cast);
      setTorrentDetails(fetchedMovie.data.movie.torrents);
      setLikedCount(fetchedMovie.data.movie.like_count);
      setMovie(fetchedMovie.data.movie);
    });
  }, [params.id]);

  const openPopUp = (imageUrl: string | undefined) => () => {
    setPopUpImage(imageUrl);
    setShowPopUp(true);
  };

  if (!movie) {
    return <div>Loading...</div>;
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
              }}>{movie?.title}
              <span>{"  "}({movie?.year})</span></h1>
            <div className="movie-meta">
              <img
                src="https://commons.wikimedia.org/wiki/Special:Redirect/file/IMDB_Logo_2016.svg"
                alt="IMDb"
                className="h-6"
              />
              <span>{movie?.rating} / 10</span>
              <span><span className="text-xl">🕒</span>{movie?.runtime} min</span>
            </div>
            <div><span className="text-xl">🩷 </span><>{likedCount}</></div>

            <div className="flex flex-wrap gap-2 mb-4 mt-4">
              {movie?.genres?.map((genre) => (
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
              <TorrentInfo title={movie.title} torrent={torrentDetails} />
            </div>}
          </div>
          <div className="col-span-4">
            <MovieSuggestion />
          </div>
        </div>
      </section>
      {castDetails && castDetails.length > 0 && (
        <section className="cast-details m-3">
          <div className="text-2xl text-center font-bold mb-3 ml-5">Cast</div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-4">
            {castDetails.map((castMember) => (
              <CastDetails key={castMember.imdb_code} cast={castMember} />
            ))}
          </div>
        </section>
      )}
      <div>
        <div className="text-2xl text-center font-bold mb-3 ml-5">Trailor / Screenshot</div>
        <div className="grid grid-cols-4 mt-3 gap-3">
          {movie?.yt_trailer_code && (
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
              onClick={openPopUp(screenshot.large)}
            >
              <img
                src={screenshot.medium}
                alt="Screenshot"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          ))}
        </div>
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
