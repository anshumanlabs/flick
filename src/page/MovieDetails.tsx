import { useEffect, useState } from "react";
import type { Movie, Screenshot } from "../types/movies";
import "./MoviesDetails.css";
import { useParams } from "react-router-dom";
import { getMovieById } from "../services/movieService";
import Popup from "../components/Popup";
import MovieSuggestion from "../components/MoviesDetails/MovieSuggestion";
import CastDetails from "../components/MoviesDetails/CastDetails";
import TorrentInfo from "../components/TorrentDialog";
import { Box, CircularProgress } from "@mui/material";
import SectionTitle from "../components/SectionTitle";
import Description from "../components/Description";

function MovieDetails() {
  const BASE_IMG_URL = "https://img.yts.gg/assets/images/movies/";
  function getMovieFolder(url: string): string {
    return new URL(url).pathname.split("/").at(-2) ?? "";
  }
  const [movie, setMovie] = useState<Movie>();
  const [mediumScreenshots, setMediumScreenshots] = useState<
    Screenshot[]
  >([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpImage, setPopUpImage] = useState<string | undefined>(undefined);
  const olderUrl = "https://yts.gg/";
  const newUrl = "https://img.yts.gg/"

  const params = useParams();

  useEffect(() => {
    getMovieById(params.id).then((fetchedMovie) => {
      setMovie(fetchedMovie.data.movie);
      const movie = fetchedMovie.data.movie;
      setMovie(fetchedMovie.data.movie);
      setMediumScreenshots(
        movie.medium_screenshot_image1
          ? [
            {
              medium:
                movie.medium_screenshot_image1?.replace(olderUrl, newUrl) ?? "",
              large:
                movie.large_screenshot_image1?.replace(olderUrl, newUrl) ?? "",
            },
            {
              medium:
                movie.medium_screenshot_image2?.replace(olderUrl, newUrl) ?? "",
              large:
                movie.large_screenshot_image2?.replace(olderUrl, newUrl) ?? "",
            },
            {
              medium:
                movie.medium_screenshot_image3?.replace(olderUrl, newUrl) ?? "",
              large:
                movie.large_screenshot_image3?.replace(olderUrl, newUrl) ?? "",
            },
          ]
          : []
      );
    });
  }, [params.id]);

  const openPopUp = (imageUrl: string | undefined) => () => {
    setPopUpImage(imageUrl);
    setShowPopUp(true);
  };

  if (!movie) {
    return <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "300px",
    }}>
      <CircularProgress aria-label="Loading…" />
    </Box>
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
          <div className="col-span-4">
            <img
              className="border-[6px] border-[#49c916]"
              src={
                BASE_IMG_URL +
                getMovieFolder(movie.medium_cover_image) +
                "/medium-cover.jpg"
              }
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/300x450/111111/aaaaaa?text=FAILED%20TO%20LOAD";
              }}
              alt={movie?.title}
            />
          </div>
          <div
            className="col-span-11">
            <h1
              style={{
                fontSize: "2.5em",
                marginBottom: "24px",
                lineHeight: "42px",
                fontWeight: "bold"
              }}>{movie.title_long}</h1>
            <div className="movie-meta">
              <img
                src="https://commons.wikimedia.org/wiki/Special:Redirect/file/IMDB_Logo_2016.svg"
                alt="IMDb"
                className="h-6"
              />
              <span>{movie?.rating} / 10</span>
              <span><span className="text-xl">🕒  </span>{movie?.runtime} min</span>
            </div>
            <div>
              {movie.like_count !== undefined && movie.like_count !== null && <><span className="text-xl">🩷 </span>{movie.like_count}</>}
              {movie.language && <><span className="text-xl ml-5">🗣️ </span>{movie.language.toUpperCase()}</>}
            </div>

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
            <Description description={movie?.description_full} />
            {movie.torrents?.length > 0 &&
              <TorrentInfo title={movie.title_long} torrent={movie.torrents} />}
          </div>
          <div className="col-span-4">
            <MovieSuggestion />
          </div>
        </div>
      </section>
      <section className="p-5">
        {movie?.cast?.length > 0 && (
          <div className="cast-details m-3">
            <SectionTitle title={"Cast"} />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-4">
              {movie?.cast.map((castMember) => (
                <CastDetails key={castMember.imdb_code} cast={castMember} />
              ))}
            </div>
          </div>
        )}
        <SectionTitle title={"Trailor and Screenshots"} />
        <div className="grid grid-cols-4 mt-3 gap-3">
          {movie?.yt_trailer_code && (
            <div className="aspect-video w-full p-2">
              <iframe
                className="w-full h-full rounded-xl"
                src={`https://www.youtube.com/embed/${movie.yt_trailer_code}`}
                title={`${movie.title_long} Trailer`}
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
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/300x450/111111/aaaaaa?text=FAILED%20TO%20LOAD";
                }}
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
      </section>
    </div>
  );
}

export default MovieDetails;
