import { useEffect, useState } from "react";
import MovieSection from "../components/MovieSection";
import { baseURL, setOptions } from "../global/globals";

const API_KEY = import.meta.env.VITE_MOVIEDB_API_KEY;
const FAVORITE_MOVIE_IDS = [129, 372058];

function PageFavorites() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchJson(path) {
      const response = await fetch(`${baseURL}${path}`, {
        ...setOptions(API_KEY),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`TMDB request failed with status ${response.status}`);
      }

      return response.json();
    }

    async function loadMovies() {
      if (!API_KEY) {
        setError("The TMDB API key is missing.");
        setLoading(false);
        return;
      }

      try {
        const favorites = await Promise.all(
          FAVORITE_MOVIE_IDS.map((id) => fetchJson(`movie/${id}`)),
        );

        const favoriteIds = new Set(FAVORITE_MOVIE_IDS);
        const recommendationResponses = await Promise.all(
          FAVORITE_MOVIE_IDS.map((id) =>
            fetchJson(`movie/${id}/recommendations`),
          ),
        );

        const uniqueRecommendations = [
          ...new Map(
            recommendationResponses
              .flatMap(({ results }) => results)
              .filter((movie) => movie.original_language === "ja")
              .filter((movie) => !favoriteIds.has(movie.id))
              .map((movie) => [movie.id, movie]),
          ).values(),
        ].slice(0, 10);

        setFavoriteMovies(favorites);
        setRecommendedMovies(uniqueRecommendations);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(requestError.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadMovies();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <p>Loading favorites...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="favorites-page">
      <MovieSection title="Favorite Movies" movies={favoriteMovies} />
      {recommendedMovies.length > 0 && (
        <MovieSection title="Recommended Movies" movies={recommendedMovies} />
      )}
    </div>
  );
}

export default PageFavorites;
