import { useEffect, useState } from "react";
import { getMovies } from "../services/movieService";
import type { Movie } from "../types/movies";
import MovieCard from "../components/MovieCard";
import PaginationUI from "../components/PaginationUI";
import type { Config } from "../types/config";

function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalPages: 1,
    offset: 0,
    limit: 20,
  });
  const [configs] = useState<Config>({
    width: 0,
    height: 0,
    titleSize: 20,
    ratingSize: 15,
    runtimeSize: 15,
    fontStyle: "bold",
  });

  useEffect(() => {
    getMovies(paginationData.currentPage).then((fetchedMovies) => {
      setMovies(fetchedMovies.data.movies);
      setPaginationData({
        currentPage: 1,
        totalPages: Math.ceil(
          fetchedMovies.data.movie_count / paginationData.limit,
        ),
        offset: 0,
        limit: paginationData.limit,
      });
    });
  }, []);

  function getMoviesForPage(page: number) {
    getMovies(page).then((fetchedMovies) => {
      setMovies(fetchedMovies.data.movies);
      setPaginationData((prev) => ({
        ...prev,
        currentPage: page,
        offset: (page - 1) * paginationData.limit,
      }));
    });
  }

  return (
    <div>
      <PaginationUI
        paginationData={paginationData}
        onPageChange={(page) => {
          setPaginationData((prev) => ({ ...prev, currentPage: page }));
          getMoviesForPage(page);
        }}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} config={configs} />
        ))}
      </div>
    </div>
  );
}

export default Movies;
