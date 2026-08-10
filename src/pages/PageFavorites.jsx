import MovieSection from "../components/MovieSection";
import { favoriteMovies, recommendedMovies } from "../data/movies";

function PageFavorites() {
  return (
    <div className="favorites-page">
      <MovieSection title="Favorite Movies" movies={favoriteMovies} />
      <MovieSection title="Recommended Movies" movies={recommendedMovies} />
    </div>
  );
}

export default PageFavorites;
