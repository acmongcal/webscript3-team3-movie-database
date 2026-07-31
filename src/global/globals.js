export const baseURL = `https://api.themoviedb.org/3/`;

export const APP_FOLDER_NAME ="animovies";

// More details here -> https://developer.themoviedb.org/reference/movie-details
export const detailsUrl = `movie/{movie_id}`;

//More details here -> https://developer.themoviedb.org/reference/movie-images
export const movieImagesUrl =`movie/{movie_id}/images`;

//More details here -> https://developer.themoviedb.org/reference/movie-videos
export const movieTrailerUrl = `movie/{movie_id}/videos`;

//More details here -> https://developer.themoviedb.org/reference/movie-credits
export const movieCastUrl =`movie/{movie_id}/credits`;


//More details here -> https://developer.themoviedb.org/reference/movie-now-playing-list
export const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing`;

//More details here -> https://developer.themoviedb.org/reference/movie-popular-list
export const popularUrl = `https://api.themoviedb.org/3/movie/popular`;

//More details here -> https://developer.themoviedb.org/reference/movie-top-rated-list
export const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated`;

//More details here -> https://developer.themoviedb.org/reference/movie-upcoming-list
export const upcomingUrl =`https://api.themoviedb.org/3/movie/upcoming`;


//More details here ->  https://developer.themoviedb.org/reference/discover-movie
export const animeFilter = `?include_adult=false&with_keywords=anime`;

//More details here ->  https://developer.themoviedb.org/reference/movie-keywords
export const movieKeywords =`https://api.themoviedb.org/3/movie/{movie_id}/keywords` ;