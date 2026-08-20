import MovieCard from "./MovieCard";
import { isMovieFavorite } from "../global/favorites";

function MovieSection({
  title,
  movies,
  favoriteMovies = [],
  onAddFavorite,
  onRemoveFavorite,
}) {
  return (
    <section className="movie-section">
      <h2>{title}</h2>
      <div className="movie-grid">
        {/* Create one card for every movie in this section. */}
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={isMovieFavorite(favoriteMovies, movie.id)}
            onAddFavorite={onAddFavorite}
            onRemoveFavorite={onRemoveFavorite}
          />
        ))}
      </div>
    </section>
  );
}

export default MovieSection;
