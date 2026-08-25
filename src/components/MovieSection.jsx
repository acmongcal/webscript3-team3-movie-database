import MovieCard from "./MovieCard";

function MovieSection({ title, movies = [] }) {
  const moviesToShow = movies.filter((movie) => movie);

  return (
    <section className="movie-section">
      {title && <h2>{title}</h2> }
      <div className="movie-grid">
        {/* Create one card for every movie in this section. */}
        {moviesToShow.map((movie, index) => (
          <MovieCard
            key={movie.id || index}
            movie={movie}
          />
        ))}
      </div>
    </section>
  );
}

export default MovieSection;
