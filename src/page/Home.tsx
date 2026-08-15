import { useEffect, useState } from "react";
import { getMovies } from "../services/movieService";
import type { Movie } from "../types/movies";
import MovieCard from "../components/MovieCard";
import type { Config } from "../types/config";

function Home() {
  const [recentAddedMovies, setRecentAddedMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [animeMovies, setAnimeMovies] = useState<Movie[]>([]);
  const [mostLikedMovies, setMostLikedmovies] = useState<Movie[]>([]);

  const [configs] = useState<Config>({
    width: 0,
    height: 0,
    titleSize: 20,
    ratingSize: 15,
    runtimeSize: 15,
    fontStyle: "bold",
    border: "8px solid #f7f7f7",
    hover: true,
  });

  const [page] = useState<number>(1);

  useEffect(() => {
    getMovies({ page, query_term: "", limit: 5 }).then((fetchedMovies) => {
      setRecentAddedMovies(fetchedMovies.data.movies);
    });
    getMovies({ page, query_term: "", limit: 5, genre: "Action", sort_by: "rating", order_by: "desc" }).then((fetchedMovies) => {
      setTopRatedMovies(fetchedMovies.data.movies);
    });
    getMovies({ page, query_term: "", limit: 5, genre: "Animation", sort_by: "rating" }).then((fetchedMovies) => {
      setAnimeMovies(fetchedMovies.data.movies);
    });
    getMovies({ page, query_term: "", limit: 5, sort_by: "like_count" }).then((fetchedMovies) => {
      setMostLikedmovies(fetchedMovies.data.movies);
    });
  }, [page]);

  return (
    <>
      {recentAddedMovies?.length > 0 && (<>
        <div className="text-xl font-bold text-white mx-5 mt-3">Recent Added Movies on Torrent
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
          {recentAddedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} config={configs} />
          ))}
        </div>
      </>)}

      {topRatedMovies?.length > 0 && (<>
        <div className="text-xl font-bold text-white mx-5 mt-3">Top Rated Action Movies
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
          {topRatedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} config={configs} />
          ))}
        </div>
      </>)}

      {animeMovies?.length > 0 && (<>
        <div className="text-xl font-bold text-white mx-5 mt-3  ">Best Rated Animation Movies
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
          {animeMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} config={configs} />
          ))}
        </div>
      </>)}

      {mostLikedMovies?.length > 0 && (<>
        <div className="text-xl font-bold text-white mx-5 mt-3  ">Most Liked Movies
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
          {mostLikedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} config={configs} />
          ))}
        </div>
      </>)}

    </>
  );
}

export default Home;
