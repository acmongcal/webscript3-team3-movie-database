import MovieCard from "./MovieCard";

function MovieSection({
  title,
  movies
}) {
  return (
    <section className="movie-section">
      {title && <h2>{title}</h2> }
      <div className="movie-grid">
        {/* Create one card for every movie in this section. */}
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </section>
  );
}

export default MovieSection;
