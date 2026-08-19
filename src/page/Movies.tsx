import MovieCard from "../components/MovieCard";
import PaginationUI from "../components/PaginationUI";
import { useSearchParams } from "react-router-dom";
import Skeletons from "../components/Skeletons";
import Filter from "../components/Filter";
import RecordNotFound from "../components/RecordNotFound";
import { defaultConfig } from "../types/config";
import { useMovies } from "../hooks/useMovies";

function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryString = searchParams.toString();
  const limit = Number(import.meta.env.VITE_LIMIT ?? 20);
  const { movies, loading, paginationData } = useMovies(queryString, limit);
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

      {loading ? (<><div style={{ justifyItems: "center" }} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
              {movies.map((movie) => (
                <div style={{ width: "100%", height: "100%", justifyItems: "center" }} className="mb-5">
                  <MovieCard key={movie.id} movie={movie} config={defaultConfig} />
                </div>
              ))}
            </div>
          </>) : (<><RecordNotFound /></>)}
      </>)}
    </div>
  )
}

export default Movies;
