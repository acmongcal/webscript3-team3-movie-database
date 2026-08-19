export const baseURL = "https://api.themoviedb.org/3/";
export const appTitle = "Animovies";
export const APP_FOLDER_NAME ="animovies";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";

export const min_date = new Date(
  Date.now() - 90 * 24 * 60 * 60 * 1000,
).toISOString();
export const max_date = new Date(
  Date.now() + 7 * 24 * 60 * 60 * 1000,
).toISOString();

export function setOptions(apiKey){
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + apiKey,
      }
    };
    return options;
}

// More details here -> https://developer.themoviedb.org/reference/movie-details
export const detailsEndPoint = `movie/{movie_id}`;

//More details here -> https://developer.themoviedb.org/reference/movie-images
export const movieImagesEndPoint =`movie/{movie_id}/images`;

//More details here -> https://developer.themoviedb.org/reference/movie-videos
export const movieTrailerEndPoint = `movie/{movie_id}/videos`;
// Append the key from the movie-videos
export const ytUrl = "https://www.youtube.com/watch?v=";
export const vimeoUrl = "https://vimeo.com/";


//More details here -> https://developer.themoviedb.org/reference/movie-credits
export const movieCastEndPoint =`movie/{movie_id}/credits`;


//More details here -> https://developer.themoviedb.org/reference/search-movie
export const searchEndPoint = "https://developer.themoviedb.org/reference/search-movie?query=";
