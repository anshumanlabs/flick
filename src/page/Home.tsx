import { useEffect, useState } from "react";
import { getMovies } from "../services/movieService";
import type { Movie } from "../types/movies";
import MovieCard from "../components/MovieCard";
import type { Config } from "../types/config";

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [configs] = useState<Config>({width:"auto", height:"auto", titleSize: 20, ratingSize: 15, runtimeSize: 15 ,
  fontStyle:"bold"});

  useEffect(() => {
    getMovies().then((fetchedMovies) => {
      setMovies(fetchedMovies.data.movies);
    });
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} config={configs}/>
      ))}
    </div>
  );
}

export default Home;
