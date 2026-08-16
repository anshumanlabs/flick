import { useEffect, useState } from "react";
import { getMovies } from "../services/movieService";
import type { Movie } from "../types/movies";
import MovieCard from "../components/MovieCard";
import PaginationUI from "../components/PaginationUI";
import { useSearchParams } from "react-router-dom";
import Skeletons from "../components/Skeletons";

function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalPages: 1
  });
  const configs = {
    width: 0,
    height: 0,
    titleSize: 25,
    ratingSize: 15,
    runtimeSize: 15,
    fontStyle: "bold",
    border: "8px solid #f7f7f7",
    hover: true,
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const query_term = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  
  useEffect(() => {
    const timer = setTimeout(() => {
      getMovies({ page, query_term }).then((fetchedMovies) => {
        setMovies(fetchedMovies.data.movies);
        setPaginationData(() => ({
          currentPage: page,
          totalPages: Math.ceil(fetchedMovies.data.movie_count / 20)
        }));
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [page, query_term]);

  return (
    <div>
      <PaginationUI
        paginationData={paginationData}
        onPageChange={(page) => {
          setSearchParams((prev) => ({ ...prev, page: page }));
        }}
      />
      {movies?.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} config={configs} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
          {Array.from({ length: 20 }).map((_, index) => (
            <Skeletons
              key={index}
              config={{
                width: 210,
                height: 250,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Movies;
