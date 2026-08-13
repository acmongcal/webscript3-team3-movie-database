
import { useEffect } from "react";
import { appTitle } from "../global/globals";
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
  useEffect(() => {
    document.title = `${appTitle} - Favorites`;
  }, []);
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
