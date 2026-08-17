import { baseURL, setOptions } from "./globals";

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

// Load full movie details for each saved TMDB ID.
export function fetchFavoriteMovies(movieIds, apiKey, signal) {
  return Promise.all(
    movieIds.map((id) => fetchTmdb(`movie/${id}`, apiKey, signal)),
  );
}

// Load, combine, and clean Japanese recommendations.
export async function fetchRecommendedMovies(movieIds, apiKey, signal) {
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

  return [...recommendationsById.values()].slice(0, 5);
}
