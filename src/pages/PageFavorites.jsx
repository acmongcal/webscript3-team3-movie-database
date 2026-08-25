import { useEffect, useState, useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import MovieSection from "../components/MovieSection";
import RecommendationsCarousel from "../components/RecommendedCarousel";
import { fetchRecommendedMovies } from "../global/favoritesApi";
import { appTitle } from "../global/globals";

const API_KEY = import.meta.env.VITE_MOVIEDB_API_KEY;

function PageFavorites() {
  // Page data and request status.
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [recommendationsError, setRecommendationsError] = useState(null);
  const { favorites } = useContext(FavoritesContext);

  useEffect(() => {
    document.title = `${appTitle} - Favorites`;
  }, []);
  // Ask TMDB for recommendations based on the current favorites.
  useEffect(() => {
    const controller = new AbortController();
    const favoriteIds = favorites
      .filter((movie) => movie && movie.id)
      .map((movie) => movie.id);

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
  }, [favorites]);

  return (
    <div className="favorites-page">
      {/* Show a helpful message when the favorites list is empty. */}
      {favorites.length === 0 ? (
        <section className="movie-section">
          <h2>Favorite Movies</h2>
          <p>You do not have any movies in your favorites.</p>
        </section>
      ) : (
        <MovieSection
          title="Favorite Movies"
          movies={favorites}
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
