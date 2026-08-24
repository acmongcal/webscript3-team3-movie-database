import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { POSTER_BASE_URL } from "../global/globals";
import { FavoritesContext } from "../context/FavoritesContext";
import FavoriteButton from "./FavoriteButton";
import UnfavoriteButton from "./UnfavoriteButton";

function MovieCard({ movie }) {
  const { isMovieFavorite } = useContext(FavoritesContext);
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
          {isMovieFavorite(movie) ? (
            <UnfavoriteButton movie={movie} />
          ) : (
            <FavoriteButton movie={movie} />
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
