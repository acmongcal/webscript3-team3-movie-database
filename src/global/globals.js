export const baseURL = `https://api.themoviedb.org/3/`;

export const APP_FOLDER_NAME ="animovies";

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
export const detailsUrl = `movie/{movie_id}`;

//More details here -> https://developer.themoviedb.org/reference/movie-images
export const movieImagesUrl =`movie/{movie_id}/images`;

//More details here -> https://developer.themoviedb.org/reference/movie-videos
export const movieTrailerUrl = `movie/{movie_id}/videos`;

//More details here -> https://developer.themoviedb.org/reference/movie-credits
export const movieCastUrl =`movie/{movie_id}/credits`;




