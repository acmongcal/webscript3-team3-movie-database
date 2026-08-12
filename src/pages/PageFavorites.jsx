
import { useEffect } from "react";
import { appTitle } from "../global/globals";
import MovieSection from "../components/MovieSection";
import { favoriteMovies, recommendedMovies } from "../data/movies";

function PageFavorites() {
  useEffect(() => {
    document.title = `${appTitle} - Favorites`;
  }, []);
  return (
    <div className="favorites-page">
      <MovieSection title="Favorite Movies" movies={favoriteMovies} />
      <MovieSection title="Recommended Movies" movies={recommendedMovies} />
    </div>
  );
}

export default PageFavorites;
