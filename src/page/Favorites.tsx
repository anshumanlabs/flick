import { useAuth } from "@clerk/react";
import { useEffect, useState } from "react";
import type { FavouriteMovie } from "../types/favourites";
import { getFavoutiteMovieForUserId } from "../services/favouriteService";
import MovieCard from "../components/MovieCard";
import { defaultConfig } from "../types/config";
import type { Movie } from "../types/movies";

function Favorites() {
    const { userId, isSignedIn, isLoaded } = useAuth();
    const [favorites, setFavorites] = useState<FavouriteMovie[]>();

    useEffect(() => {
        if (!isSignedIn || !userId) {
            return;
        }
        const loadFavorites = async () => {
            const favorites = await getFavoutiteMovieForUserId(userId);
            setFavorites(favorites.map((fav) => fav.movie));
        };
        loadFavorites();
        console.log("favorites" + favorites);
    }, [userId]);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }
    if (!isSignedIn) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <h2 className="text-2xl font-bold text-white mb-3">
                    Please login to see or add your favorite movies.
                </h2>
            </div>
        );
    }
    return (
        <>
            <div style={{ justifyItems: "center" }} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                {favorites?.map((movie) => (
                    <MovieCard key={movie.id} movie={{
                        id: movie.id, genres: movie.genres,
                        rating: movie.rating, title_long: movie.name,
                        medium_cover_image: movie.medium_cover_image
                    } as Movie} config={defaultConfig} />
                ))}
            </div>
        </>
    )
}

export default Favorites
