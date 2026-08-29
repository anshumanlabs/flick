import { useState } from 'react';
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
import LanguageIcon from '@mui/icons-material/Language';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddToFavourite from '../components/AddOrRemoveFavourite';
import { useQuery } from '@tanstack/react-query';

function MovieDetails() {
    const BASE_IMG_URL = 'https://img.yts.gg/assets/images/movies/';
    function getMovieFolder(url: string): string {
        if (!url) return '';
        return new URL(url).pathname.split('/').at(-2) ?? '';
    }
    const [showPopUp, setShowPopUp] = useState(false);
    const [popUpImage, setPopUpImage] = useState<string | undefined>(undefined);
    const olderUrl = 'https://yts.gg/';
    const newUrl = 'https://img.yts.gg/';
    const params = useParams();

    const { data: movie } = useQuery({
        queryKey: ['movie', String(params.id)],
        queryFn: async ({ signal }) => {
            const response = await getMovieById(params.id, signal);
            return response.data.movie;
        },
    });

    const mediumScreenshots = movie?.medium_screenshot_image1
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
        : [];

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
                <CircularProgress aria-label="Loading…" sx={{ color: '#49c916' }} />
            </Box>
        );
    }

    return (
        <div className="movie-details page-enter">
            <Box
                className="movie-hero"
                sx={{
                    position: 'relative',
                    backgroundImage: `linear-gradient(to bottom, rgba(7, 7, 8, 0.3) 0%, rgba(7, 7, 8, 0.6) 50%, rgba(7, 7, 8, 0.95) 100%),
                    url(${BASE_IMG_URL + getMovieFolder(movie.medium_cover_image) + '/background.jpg'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="hero-overlay grid lg:grid-cols-20 md:grid-cols-12">
                    <div className="lg:col-span-5 md:col-span-4 sm:col-span-1 flex justify-center">
                        <img
                            style={{ maxWidth: '255px', maxHeight: '375px' }}
                            className="movie-poster border-[4px] border-brand"
                            src={BASE_IMG_URL + getMovieFolder(movie.medium_cover_image) + '/large-cover.jpg'}
                            onError={(e) => {
                                e.currentTarget.src =
                                    'https://placehold.co/300x450/111111/aaaaaa?text=FAILED%20TO%20LOAD';
                            }}
                            alt={movie?.title}
                            loading="eager"
                        />
                    </div>
                    <div className="lg:col-span-10 md:col-span-4 p-2 lg:p-0 md:p-1">
                        <h1 className="mb-6 text-2xl font-bold leading-tight sm:text-3xl md:text-3xl lg:text-[2.5rem] lg:leading-[42px]">
                            <div className="grid grid-cols-12 items-center">
                                <div className="col-span-10">{movie.title_long}</div>
                                <div className="col-span-2 flex justify-end">
                                    <AddToFavourite movie={movie} />
                                </div>
                            </div>
                        </h1>
                        <div className="movie-meta">
                            <div className="grid grid-cols-12 items-center gap-4">
                                <div className="flex items-center gap-2.5 col-span-6 md:col-span-3">
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 32,
                                            height: 32,
                                            borderRadius: '50%',
                                            backgroundColor: 'rgba(255,255,255,0.08)',
                                        }}
                                    >
                                        <img
                                            src="https://commons.wikimedia.org/wiki/Special:Redirect/file/IMDB_Logo_2016.svg"
                                            alt="IMDb"
                                            className="h-4 w-auto"
                                        />
                                    </Box>
                                    <span className="text-sm font-semibold">{movie?.rating} / 10</span>
                                </div>

                                <div className="flex items-center gap-2.5 col-span-6 md:col-span-3">
                                    <AccessTimeIcon sx={{ color: '#71717a', fontSize: 20 }} />
                                    <span className="text-sm">{movie?.runtime} min</span>
                                </div>
                            </div>
                        </div>
                        <div className="movie-meta">
                            <div className="grid grid-cols-12 items-center gap-4">
                                {movie.like_count !== undefined && movie.like_count !== null && (
                                    <div className="flex items-center gap-2.5 col-span-6 md:col-span-3">
                                        <ThumbUpIcon sx={{ color: '#49c916', fontSize: 20 }} />
                                        <span className="text-sm font-medium">{movie.like_count.toLocaleString()}</span>
                                    </div>
                                )}
                                {movie.language && (
                                    <div className="flex items-center gap-2.5 col-span-6 md:col-span-3">
                                        <LanguageIcon sx={{ color: '#71717a', fontSize: 20 }} />
                                        <span className="text-sm font-medium">{movie.language.toUpperCase()}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4 mt-5">
                            {movie?.genres?.map((genre) => (
                                <span
                                    key={genre}
                                    className="px-3 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wide backdrop-blur-md
                           bg-black/40 border-green-500/30 text-green-400
                           transition-all duration-300 hover:bg-green-500/10 hover:border-green-500/50 hover:-translate-y-0.5"
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
            <section className="px-4 sm:px-6 lg:px-8">
                {movie?.cast?.length > 0 && (
                    <div className="cast-details mx-3 mt-5">
                        <SectionTitle title={'Cast'} />
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-6">
                            {movie?.cast.map((castMember) => (
                                <CastDetails key={castMember.imdb_code} cast={castMember} />
                            ))}
                        </div>
                    </div>
                )}
                <div className="mx-3 mt-8">
                    <SectionTitle title={'Trailer & Screenshots'} />
                </div>
                <div className="grid lg:grid-cols-4 mt-5 md:grid-cols-3 sm:grid-cols-2 gap-3">
                    {movie?.yt_trailer_code && (
                        <div className="aspect-video w-full p-2">
                            <div className="relative w-full h-full rounded-xl overflow-hidden group">
                                <iframe
                                    className="w-full h-full rounded-xl"
                                    src={`https://www.youtube.com/embed/${movie.yt_trailer_code}`}
                                    title={`${movie.title_long} Trailer`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    )}

                    {mediumScreenshots.map((screenshot, index) => (
                        <div
                            key={index}
                            className="aspect-video w-full p-2 cursor-pointer"
                            onClick={openPopUp(screenshot.large)}
                        >
                            <div className="relative w-full h-full rounded-xl overflow-hidden group">
                                <img
                                    src={screenshot.medium}
                                    loading="lazy"
                                    decoding="async"
                                    alt="Screenshot"
                                    className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            'https://placehold.co/300x450/111111/aaaaaa?text=FAILED%20TO%20LOAD';
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-xl" />
                            </div>
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
