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
        { title: "Recent Added", data: recent.data.movies },
        { title: "Top Rated Action", data: top.data.movies },
        { title: "Best Rated Animation", data: anime.data.movies },
        { title: "Most Liked", data: liked.data.movies }
      ];
      setHomePageConfig(data);
    });
  }, []);

  return (
    <div className="p-5">
      {homePageConfig.map((page, index) => (
        page?.data?.length > 0 && (
          <div key={index}>
            <div className="mt-5 ml-5 mr-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-6 w-1 rounded-full bg-[#49c916]"/>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white ml-2">
                  {page.title}
                </h2>
              </div>

              {/* <button className="text-sm font-semibold text-[#49c916] hover:underline">
                View All
              </button> */}
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
