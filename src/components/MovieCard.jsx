import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({
  movie,
  isFavorite = false,
  onAddFavorite,
  onRemoveFavorite,
}) {
  const poster = movie.poster_path
    ? `${POSTER_BASE_URL}${movie.poster_path}`
    : "/poster-placeholder.svg";

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "Release date unavailable";

  return (
    <Card className="movie-card h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={poster}
        alt={`${movie.title} poster`}
        style={{
          aspectRatio: "2 / 3",
          objectFit: "cover",
        }}
      />

      <Card.Body className="movie-card-content d-flex flex-column">
        <Card.Title>{movie.title}</Card.Title>

        <Card.Subtitle className="mb-2 text-muted">
          {year} · ⭐ {movie.vote_average.toFixed(1)}
        </Card.Subtitle>

        <Card.Text className="movie-card-overview">
          {movie.overview
            ? `${movie.overview.slice(0, 120)}${
                movie.overview.length > 120 ? "…" : ""
              }`
            : "No description available."}
        </Card.Text>

        <div className="d-flex flex-wrap gap-2 mt-auto">
          <Button as={Link} to={`/movie-details/${movie.id}`} variant="primary">
            View Details
          </Button>

          {/* Show X for saved movies and a heart for unsaved movies. */}
          {isFavorite ? (
            <Button
              type="button"
              variant="danger"
              onClick={() => onRemoveFavorite?.(movie.id)}
            >
              X
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline-danger"
              onClick={() => onAddFavorite?.(movie)}
            >
              &hearts;
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
