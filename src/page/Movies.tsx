import { useEffect, useState } from "react";
import { getMovies } from "../services/movieService";
import type { Movie } from "../types/movies";
import MovieCard from "../components/MovieCard";
import PaginationUI from "../components/PaginationUI";
import { useSearchParams } from "react-router-dom";
import Skeletons from "../components/Skeletons";
import Filter from "../components/Filter";
import RecordNotFound from "../components/RecordNotFound";
import { defaultConfig } from "../types/config";

function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalPages: 1
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = Number(import.meta.env.VITE_LIMIT ?? 20);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = Object.fromEntries(searchParams.entries());
      getMovies(params).then((fetchedMovies) => {
        const idSet = new Set<number>();
        const removedDuplicateMovies = fetchedMovies?.data?.movies.filter((movie) => {
          if (idSet.has(movie.id)) {
            return false;
          }
          idSet.add(movie.id);
          return true;
        });
        setMovies(removedDuplicateMovies);
        setLoading(false);
        const page = Number(searchParams.get("page") ?? 1);
        setPaginationData(() => ({
          currentPage: page,
          totalPages: Math.ceil(fetchedMovies.data.movie_count / limit)
        }));
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [searchParams, limit]);

  return (
    <div>
      <div className="grid grid-cols-12 items-center">
        <div className="col-span-10 justify-center ">
          <PaginationUI
            paginationData={paginationData}
            onPageChange={(page) => {
              setSearchParams({ ...Object.fromEntries(searchParams), page: String(page) });
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
        {movies?.length > 0 ? (
          <>
            <div style={{ justifyItems: "center" }} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-5">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} config={defaultConfig} />
              ))}
            </div>
          </>) : (<><RecordNotFound /></>)}
      </>)}
    </div>
  )
}

export default Movies;
