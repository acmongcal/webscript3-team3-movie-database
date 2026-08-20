import { useEffect, useState } from "react";
import MovieSection from "../components/MovieSection";
import RecommendationsCarousel from "../components/RecommendedCarousel";
import {
  addMovieToFavorites,
  removeMovieFromFavorites,
} from "../global/favorites";
import {
  fetchFavoriteMovies,
  fetchRecommendedMovies,
} from "../global/favoritesApi";
import { appTitle } from "../global/globals";

const API_KEY = import.meta.env.VITE_MOVIEDB_API_KEY;
const FAVORITE_MOVIE_IDS = [129, 372058];

function PageFavorites() {
  // Page data and request status.
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendationsError, setRecommendationsError] = useState(null);

  // Connect the reusable array helpers to React state.
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

  useEffect(() => {
    document.title = `${appTitle} - Favorites`;
  }, []);

  // Load the starting favorites once.
  useEffect(() => {
    const controller = new AbortController();

    async function loadMovies() {
      if (!API_KEY) {
        setError("The TMDB API key is missing.");
        setLoading(false);
        return;
      }

      try {
        const favorites = await fetchFavoriteMovies(
          FAVORITE_MOVIE_IDS,
          API_KEY,
          controller.signal,
        );
        if (!controller.signal.aborted) {
          setFavoriteMovies(favorites);
        }
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(requestError.message);
        }
      }

      finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadMovies();

    return () => controller.abort();
  }, []);

  // Ask TMDB for recommendations based on the current favorites.
  useEffect(() => {
    const controller = new AbortController();
    const favoriteIds = favoriteMovies.map((movie) => movie.id);

    async function loadRecommendations() {
      setRecommendationsError(null);

      if (!API_KEY || favoriteIds.length === 0) {
        setRecommendedMovies([]);
        return;
      }

      try {
        const recommendations = await fetchRecommendedMovies(
          favoriteIds,
          API_KEY,
          controller.signal,
        );

        if (!controller.signal.aborted) {
          setRecommendedMovies(recommendations);
        }
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setRecommendedMovies([]);
          setRecommendationsError(requestError.message);
        }
      }
    }

    loadRecommendations();

    return () => controller.abort();
  }, [favoriteMovies]);

  if (loading) {
    return <p>Loading favorites...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="favorites-page">
      {/* Show a helpful message when the favorites list is empty. */}
      {favoriteMovies.length === 0 ? (
        <section className="movie-section">
          <h2>Favorite Movies</h2>
          <p>You do not have any movies in your favorites.</p>
        </section>
      ) : (
        <MovieSection
          title="Favorite Movies"
          movies={favoriteMovies}
          favoriteMovies={favoriteMovies}
          onAddFavorite={addFavorite}
          onRemoveFavorite={removeFavorite}
        />
      )}

      <RecommendationsCarousel
        movies={recommendedMovies}
        error={recommendationsError}
      />
    </div>
  );
}

export default PageFavorites;
