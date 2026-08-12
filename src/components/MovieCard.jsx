import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <article className="movie-card">
      <img src={movie.image} alt={`${movie.title} poster`} />

      <div className="movie-card-content">
        <h3>{movie.title}</h3>
        <p>{movie.year}</p>
        <p>{movie.genre}</p>

        <Link to={`/movie-details/${movie.id}`}>View Details</Link>
      </div>
    </article>
  );
}

export default MovieCard;
