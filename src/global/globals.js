export const baseURL = "https://api.themoviedb.org/3/";
export const appTitle = "Animovies";
export const APP_FOLDER_NAME ="animovies";

export const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

//Local storage favorites
export const localFavorites = '[]';

export const min_date = new Date(
  Date.now() - 180 * 24 * 60 * 60 * 1000,
).toISOString();
export const max_date = new Date(
  Date.now() + 7 * 24 * 60 * 60 * 1000,
).toISOString();

// Append the key from the movie-videos
export const ytUrl = "https://www.youtube.com/embed/";
export const vimeoUrl = "https://player.vimeo.com/video/";


//More details here -> https://developer.themoviedb.org/reference/search-movie
export const searchEndPoint = "https://developer.themoviedb.org/reference/search-movie?query=";


export const genresEndpoint = "genre/movie/list?language=en";

//Filters for home and anime movies
export const animeFilterEndpoint = "discover/movie?include_adult=false$&language=en-US&with_original_language=ja&with_origin_country=JP&with_keywords=210024";

export const nowPlayingEndpoint = `&sort_by=popularity.desc&with_release_type=1|2|3&primary_release_date.gte=${min_date}&primary_release_date.lte=${max_date}`;

export const popularEndpoint = "&sort_by=popularity.desc";

export const upcomingEndpoint = "&sort_by=primary_release_date.desc";
export const topRatedEndpoint = "&sort_by=vote_average.desc&vote_count.gte=200";