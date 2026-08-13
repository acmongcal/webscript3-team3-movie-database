import MovieCard from "./MovieCard";

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
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={favoriteMovies.some(
              (favorite) => favorite.id === movie.id,
            )}
            onAddFavorite={onAddFavorite}
            onRemoveFavorite={onRemoveFavorite}
          />
        ))}
      </div>
    </section>
  );
}

export default MovieSection;
