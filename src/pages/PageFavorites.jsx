import { useEffect, useState } from "react";
import MovieSection from "../components/MovieSection";
import {
  addMovieToFavorites,
  removeMovieFromFavorites,
} from "../global/favorites";
import {
  fetchFavoriteMovies,
  fetchRecommendedMovies,
} from "../global/favoritesApi";

const API_KEY = import.meta.env.VITE_MOVIEDB_API_KEY;
const FAVORITE_MOVIE_IDS = [129, 372058];

function PageFavorites() {
  // Page data and request status.
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  function addFavorite(movie) {
    setFavoriteMovies((currentFavorites) =>
      addMovieToFavorites(currentFavorites, movie),
    );
  }

  function removeFavorite(movieId) {
    setFavoriteMovies((currentFavorites) =>
      removeMovieFromFavorites(currentFavorites, movieId),
    );
  }

  // Load the starting favorites and their recommendations once.
  useEffect(() => {
    const controller = new AbortController();

    async function loadMovies() {
      if (!API_KEY) {
        setError("The TMDB API key is missing.");
        setLoading(false);
        return;
      }

      try {
        const [favorites, recommendations] = await Promise.all([
          fetchFavoriteMovies(FAVORITE_MOVIE_IDS, API_KEY, controller.signal),
          fetchRecommendedMovies(
            FAVORITE_MOVIE_IDS,
            API_KEY,
            controller.signal,
          ),
        ]);

        if (controller.signal.aborted) {
          return;
        }

        setFavoriteMovies(favorites);
        setRecommendedMovies(recommendations);
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
      {/* Current favorites */}
      <MovieSection
        title="Favorite Movies"
        movies={favoriteMovies}
        favoriteMovies={favoriteMovies}
        onAddFavorite={addFavorite}
        onRemoveFavorite={removeFavorite}
      />

      {/* Recommendations are hidden when TMDB returns none. */}
      {recommendedMovies.length > 0 && (
        <MovieSection
          title="Recommended Movies"
          movies={recommendedMovies}
          favoriteMovies={favoriteMovies}
          onAddFavorite={addFavorite}
          onRemoveFavorite={removeFavorite}
        />
      )}
    </div>
  );
}

export default PageFavorites;
