import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
  const poster = movie.poster_path
    ? `${POSTER_BASE_URL}${movie.poster_path}`
    : "/poster-placeholder.svg";

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "Release date unavailable";

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={poster}
        alt={`${movie.title} poster`}
        style={{
          aspectRatio: "2 / 3",
          objectFit: "cover",
        }}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title>{movie.title}</Card.Title>

        <Card.Subtitle className="mb-2 text-muted">
          {year} · ⭐ {movie.vote_average.toFixed(1)}
        </Card.Subtitle>

        <Card.Text>
          {movie.overview
            ? `${movie.overview.slice(0, 120)}${
                movie.overview.length > 120 ? "…" : ""
              }`
            : "No description available."}
        </Card.Text>

        <Button
          as={Link}
          to={`/movie-details/${movie.id}`}
          variant="primary"
          className="mt-auto"
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
