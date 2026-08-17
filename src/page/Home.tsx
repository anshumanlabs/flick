import { useEffect, useState } from "react";
import { getMovies } from "../services/movieService";
import type { Movie } from "../types/movies";
import MovieCard from "../components/MovieCard";
import { defaultConfig } from "../types/config";

function Home() {
  const limit = 5;
  const [homePageConfig, setHomePageConfig] = useState<{ title: string, data: Movie[] }[]>([]);

  useEffect(() => {
    Promise.all([
      getMovies({ limit }),
      getMovies({ limit, genre: "Action", sort_by: "rating", order_by: "desc" }),
      getMovies({ limit, genre: "Animation", sort_by: "rating" }),
      getMovies({ limit, sort_by: "like_count" })
    ]).then(([recent, top, anime, liked]) => {
      const data = [
        { title: "Recent Added Movies on Torrent", data: recent.data.movies },
        { title: "Top Rated Action Movies", data: top.data.movies },
        { title: "Best Rated Animation Movies", data: anime.data.movies },
        { title: "Most Liked Movies", data: liked.data.movies }
      ];
      console.log(data);
      setHomePageConfig(data);
    });
  }, []);

  return (
    <div className="p-5">
      {homePageConfig.map((page, index) => (
        page?.data?.length > 0 && (
          <div key={index}>
            <div className="text-xl font-bold text-white mx-5 mt-3">{page.title}
            </div>
            <div style={{ justifyItems: "center" }} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
              {page?.data?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} config={defaultConfig} />
              ))}
            </div>
          </div>
        )))}
    </div>
  );
}

export default Home;
