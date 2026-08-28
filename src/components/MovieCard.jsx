// React imports
import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";

// Javascript imports
import { POSTER_BASE_URL } from "../global/globals";

// Asset imports
import posterPlaceholder from "../assets/images/poster-placeholder.svg";

//Bootstrap component imports
import { Button,Card} from "react-bootstrap";

// Component imports
import FavoriteButton from "./FavoriteButton";
import UnfavoriteButton from "./UnfavoriteButton";

function MovieCard({ movie }) {
  const { isMovieFavorite } = useContext(FavoritesContext);

  let title = "Title unavailable";
  if (movie.title) {
    title = movie.title;
  } else if (movie.original_title) {
    title = movie.original_title;
  }

  let poster = posterPlaceholder;
  if (movie.poster_path) {
    poster = `${POSTER_BASE_URL}${movie.poster_path}`;
  }

  let year = "Release date unavailable";
  if (movie.release_date) {
    const releaseYear = new Date(movie.release_date).getFullYear();
    if (!Number.isNaN(releaseYear)) {
      year = releaseYear;
    }
  }

  let rating = "Not rated";
  if (typeof movie.vote_average === "number") {
    rating = movie.vote_average.toFixed(1);
  }

  const overview = movie.overview || "";
  const hasMovieId = Boolean(movie.id);

  let shortOverview = "No description available.";
  if (overview) {
    shortOverview = overview.slice(0, 120);
    if (overview.length > 120) {
      shortOverview += "...";
    }
  }

  return (
    <Card className="movie-card h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={poster}
        alt={`${title} poster`}
        style={{ aspectRatio: "2 / 3", objectFit: "cover" }}
      />

      <Card.Body className="movie-card-content d-flex flex-column">
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {year} &middot; &#9733; {rating}
        </Card.Subtitle>
        <Card.Text className="movie-card-overview">
          {shortOverview}
        </Card.Text>

        <div className="movie-card-actions mt-auto">
          {hasMovieId ? (
            <Button
              className="movie-details-button"
              as={Link}
              to={`/movie-details/${movie.id}`}
              variant="primary"
            >
              View Details
            </Button>
          ) : (
            <Button className="movie-details-button" variant="secondary" disabled>
              Details unavailable
            </Button>
          )}

          {hasMovieId &&
            (isMovieFavorite(movie) ? (
              <UnfavoriteButton movie={movie} />
            ) : (
              <FavoriteButton movie={movie} />
            ))}
        </div>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
