import { useEffect, useState } from 'react';
import type { Movie, Screenshot } from '../types/movies';
import './MoviesDetails.css';
import { useParams } from 'react-router-dom';
import { getMovieById } from '../services/movieService';
import Popup from '../components/Popup';
import MovieSuggestion from '../components/MoviesDetails/MovieSuggestion';
import CastDetails from '../components/MoviesDetails/CastDetails';
import { Box, CircularProgress } from '@mui/material';
import SectionTitle from '../components/SectionTitle';
import Description from '../components/Description';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AddToFavourite from '../components/AddOrRemoveFavourite';

function MovieDetails() {
    const BASE_IMG_URL = 'https://img.yts.gg/assets/images/movies/';
    function getMovieFolder(url: string): string {
        return new URL(url).pathname.split('/').at(-2) ?? '';
    }
    const [movie, setMovie] = useState<Movie>();
    const [mediumScreenshots, setMediumScreenshots] = useState<Screenshot[]>([]);
    const [showPopUp, setShowPopUp] = useState(false);
    const [popUpImage, setPopUpImage] = useState<string | undefined>(undefined);
    const olderUrl = 'https://yts.gg/';
    const newUrl = 'https://img.yts.gg/';
    const params = useParams();

    useEffect(() => {
        getMovieById(params.id).then((fetchedMovie) => {
            setMovie(fetchedMovie.data.movie);
            const movie = fetchedMovie.data.movie;
            setMovie(movie);
            setMediumScreenshots(
                movie.medium_screenshot_image1
                    ? [
                          {
                              medium: movie.medium_screenshot_image1?.replace(olderUrl, newUrl) ?? '',
                              large: movie.large_screenshot_image1?.replace(olderUrl, newUrl) ?? '',
                          },
                          {
                              medium: movie.medium_screenshot_image2?.replace(olderUrl, newUrl) ?? '',
                              large: movie.large_screenshot_image2?.replace(olderUrl, newUrl) ?? '',
                          },
                          {
                              medium: movie.medium_screenshot_image3?.replace(olderUrl, newUrl) ?? '',
                              large: movie.large_screenshot_image3?.replace(olderUrl, newUrl) ?? '',
                          },
                      ]
                    : [],
            );
        });
    }, [params.id]);

    const openPopUp = (imageUrl: string | undefined) => () => {
        setPopUpImage(imageUrl);
        setShowPopUp(true);
    };

    if (!movie) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '300px',
                }}
            >
                <CircularProgress aria-label="Loading…" />
            </Box>
        );
    }

    return (
        <div className="movie-details">
            <Box
                className="movie-hero"
                sx={{
                    position: 'relative',
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
                    url(${BASE_IMG_URL + getMovieFolder(movie.medium_cover_image) + '/background.jpg'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="hero-overlay grid lg:grid-cols-20 md:grid-cols-12">
                    <div className="lg:col-span-5 md:col-span-4 sm:col-span-1 flex justify-center">
                        <img
                            style={{ maxWidth: '255px', maxHeight: '375px' }}
                            className="border-[4px] border-[#49c916]"
                            src={BASE_IMG_URL + getMovieFolder(movie.medium_cover_image) + '/large-cover.jpg'}
                            onError={(e) => {
                                e.currentTarget.src =
                                    'https://placehold.co/300x450/111111/aaaaaa?text=FAILED%20TO%20LOAD';
                            }}
                            alt={movie?.title}
                        />
                    </div>
                    <div className="lg:col-span-10 md:col-span-4 p-2 lg:p-0 md:p-1">
                        <h1 className="mb-6 text-2xl font-bold leading-tight sm:text-3xl md:text-3xl lg:text-[2.5rem] lg:leading-[42px]">
                            <div className="grid grid-cols-12">
                                <div className="col-span-10">{movie.title_long}</div>
                                <div className="col-span-2">
                                    <AddToFavourite movie={movie} />
                                </div>
                            </div>
                        </h1>
                        <div className="movie-meta">
                            <div className="grid grid-cols-12 items-center items-center">
                                <div className="flex items-center gap-2 col-span-6 md:col-span-3">
                                    <img
                                        src="https://commons.wikimedia.org/wiki/Special:Redirect/file/IMDB_Logo_2016.svg"
                                        alt="IMDb"
                                        className="h-6 w-auto"
                                    />
                                    <span>{movie?.rating} / 10</span>
                                </div>

                                <div className="flex items-center gap-2 col-span-6 md:col-span-3">
                                    <span className="text-xl">🕒</span>
                                    <span>{movie?.runtime} min</span>
                                </div>
                            </div>
                        </div>
                        <div className="movie-meta">
                            <div className="grid grid-cols-12 items-center items-center">
                                {movie.like_count !== undefined && movie.like_count !== null && (
                                    <div className="flex items-center gap-2 col-span-6 md:col-span-3">
                                        <span className="text-xl">
                                            <ThumbUpIcon
                                                sx={{
                                                    color: '#49c916',
                                                    marginRight: 2,
                                                }}
                                            />
                                        </span>
                                        {movie.like_count}
                                    </div>
                                )}
                                {movie.language && (
                                    <div className="flex items-center gap-2 col-span-6 md:col-span-3">
                                        <span className="text-xl">🗣️ </span>
                                        {movie.language.toUpperCase()}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4 mt-4">
                            {movie?.genres?.map((genre) => (
                                <span
                                    key={genre}
                                    className="
                          px-3 py-1
                          rounded-md
                          bg-black/40
                          border border-green-500/40
                          text-green-400
                          text-xs
                          font-semibold
                          uppercase
                          tracking-wide
                          backdrop-blur-md
                        "
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>
                        <Description description={movie?.description_full} />
                    </div>
                    <div className="lg:col-span-5 md:col-span-4">
                        <MovieSuggestion />
                    </div>
                </div>
            </Box>
            <section className="p-5">
                {movie?.cast?.length > 0 && (
                    <div className="cast-details m-3">
                        <SectionTitle title={'Cast'} />
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-4">
                            {movie?.cast.map((castMember) => (
                                <CastDetails key={castMember.imdb_code} cast={castMember} />
                            ))}
                        </div>
                    </div>
                )}
                <div className="m-3 mt-5">
                    <SectionTitle title={'Trailor and Screenshots'} />
                </div>
                <div className="grid lg:grid-cols-4 mt-3 md:grid-cols-3 sm:grid-cols-2 gap-3">
                    {movie?.yt_trailer_code && (
                        <div className="aspect-video w-full p-2">
                            <iframe
                                className="w-full h-full rounded-xl"
                                src={`https://www.youtube.com/embed/${movie.yt_trailer_code}`}
                                title={`${movie.title_long} Trailer`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            />
                        </div>
                    )}

                    {mediumScreenshots.map((screenshot, index) => (
                        <div
                            key={index}
                            className="aspect-video w-full p-2 cursor-pointer"
                            onClick={openPopUp(screenshot.large)}
                        >
                            <img
                                src={screenshot.medium}
                                alt="Screenshot"
                                className="w-full h-full object-cover rounded-xl"
                                onError={(e) => {
                                    e.currentTarget.src =
                                        'https://placehold.co/300x450/111111/aaaaaa?text=FAILED%20TO%20LOAD';
                                }}
                            />
                        </div>
                    ))}
                </div>
                <Popup
                    key={popUpImage}
                    open={showPopUp}
                    onClose={() => setShowPopUp(false)}
                    imageUrl={popUpImage || ''}
                ></Popup>
            </section>
        </div>
    );
}

export default MovieDetails;
