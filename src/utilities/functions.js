import { baseURL} from "../global/globals";

//Set options for api call
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


// Fetch one TMDB endpoint and return its JSON data.
async function fetchTmdb(path, apiKey, signal) {
  const response = await fetch(`${baseURL}${path}`, {
    ...setOptions(apiKey),
    signal,
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed with status ${response.status}`);
  }

  return response.json();
}


// Load, combine, and clean Japanese recommendations.
export async function fetchRecommendedMovies(movieIds, apiKey, signal) {
  if (movieIds.length === 0) {
    return [];
  }

  const responses = await Promise.all(
    movieIds.map((id) =>
      fetchTmdb(`movie/${id}/recommendations`, apiKey, signal),
    ),
  );

  const favoriteIds = new Set(movieIds);
  const recommendationsById = new Map(
    responses
      .flatMap(({ results }) => results)
      .filter((movie) => movie.original_language === "ja")
      .filter((movie) => !favoriteIds.has(movie.id))
      .filter((movie) => movie.backdrop_path || movie.poster_path)
      .map((movie) => [movie.id, movie]),
  );

  return [...recommendationsById.values()]
    .sort((firstMovie, secondMovie) => {
      const firstScore = firstMovie.vote_average * firstMovie.vote_count;
      const secondScore = secondMovie.vote_average * secondMovie.vote_count;

      return secondScore - firstScore;
    })
    .slice(0, 5);
}