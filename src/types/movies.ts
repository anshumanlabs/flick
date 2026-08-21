import type { Cast } from './cast';

export interface Movie {
    id: number;
    title: string;
    title_long: string;
    year: number;
    rating: number;
    runtime: number;
    genres: string[];
    summary: string;
    like_count: number;

    background_image: string;
    medium_cover_image: string;
    background_image_original: string;
    large_cover_image: string;
    description_full: string;
    description_intro: string;

    yt_trailer_code: string;
    imdb_code: string;
    language: string;
    slug: string;

    medium_screenshot_image1: string;
    medium_screenshot_image2: string;
    medium_screenshot_image3: string;

    large_screenshot_image1: string;
    large_screenshot_image2: string;
    large_screenshot_image3: string;
    cast: Cast[];
    torrents: Torrent[];
}

export interface ListMovieResponse {
    status: string;
    status_message: string;
    data: {
        movie_count: number;
        limit: number;
        page_number: number;
        movies: Movie[];
    };
}

export interface MovieResponse {
    status: string;
    status_message: string;
    data: {
        movie: Movie;
    };
}

export interface Torrent {
    url: string;
    hash: string;
    quality: string;
    type: string;
    is_repack: string;
    video_codec: string;
    bit_depth: string;
    audio_channels: string;
    seeds: number;
    peers: number;
    size: string;
    size_bytes: number;
    date_uploaded: string;
    date_uploaded_unix: number;
}
export interface Screenshot {
    medium: string;
    large: string;
}
