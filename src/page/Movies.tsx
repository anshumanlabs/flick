import { useEffect, useState } from "react";
import { getMovies } from "../services/movieService";
import type { Movie } from "../types/movies";
import MovieCard from "../components/MovieCard";
import PaginationUI from "../components/PaginationUI";
import { useSearchParams } from "react-router-dom";
import Skeletons from "../components/Skeletons";
import Filter from "../components/Filter";
import RecordNotFound from "../components/RecordNotFound";

function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
  const query_term = searchParams.get("query_term");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = import.meta.env.VITE_LIMIT;

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = Object.fromEntries(searchParams.entries());
      getMovies(params).then((fetchedMovies) => {
        setMovies(fetchedMovies.data.movies);
        setLoading(false);
        setPaginationData(() => ({
          currentPage: page,
          totalPages: Math.ceil(fetchedMovies.data.movie_count / limit)
        }));
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [page, query_term, searchParams]);

  return (
    <div>
      <div className="grid grid-cols-12 items-center">
        <div className="col-span-10 justify-center ">
          <PaginationUI
            paginationData={paginationData}
            onPageChange={(page) => {
              setSearchParams((prev) => ({ ...prev, page: page }));
            }}
          />
        </div>
        <div className="col-span-2 justify-end">
          <Filter />
        </div>
      </div>

      {loading ? (<><div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {Array.from({ length: limit }).map((_, index) => (
          <Skeletons
            key={index}
            config={{
              width: 210,
              height: 250,
            }}
          />
        ))}
      </div></>) : (<>

        {movies?.length > 0 ? (<><div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} config={configs} />
          ))}
        </div></>) : (<><RecordNotFound /></>)}

      </>)}
    </div>
  )
}

export default Movies;
