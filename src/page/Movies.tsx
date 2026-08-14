import { useEffect, useState } from "react";
import { getMovies } from "../services/movieService";
import type { Movie } from "../types/movies";
import MovieCard from "../components/MovieCard";
import PaginationUI from "../components/PaginationUI";
import type { Config } from "../types/config";
import { useSearchParams } from "react-router-dom";
import Skeletons from "../components/Skeletons";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    setSearchParams({
      page: page.toString(),
    });
  }, []);

  useEffect(() => {
    getMovies(page, search).then((fetchedMovies) => {
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
  }, [search]);

  function getMoviesForPage(page: number) {
    setMovies([]);
    getMovies(page, search).then((fetchedMovies) => {
      setMovies(fetchedMovies.data.movies);
      setPaginationData((prev) => ({
        ...prev,
        currentPage: page,
        offset: (page - 1) * paginationData.limit,
      }));
      if (search) {
        setSearchParams({
          page: page.toString(),
          search:search
        });
      } else {
        setSearchParams({
          page: page.toString(),
        });
      }
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
      {movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} config={configs} />
          ))}
        </div>
      ) : (
        <Skeletons numberOfSkeletons={20} />
      )}
    </div>
  );
}

export default Movies;
