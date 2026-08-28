// React imports
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Javascript imports
import { IMAGE_BASE_URL, POSTER_BASE_URL } from "../global/globals";

// Asset imports
import posterPlaceholder from "../assets/images/poster-placeholder.svg";

//Bootstrap component imports
import Button from "react-bootstrap/Button";



function RecommendationsCarousel({ movies = [], error = null }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const recommendations = movies.slice(0, 5);
  const activeMovie = recommendations[activeIndex] || recommendations[0];

  useEffect(() => {
    if (recommendations.length <= 1) {
      return undefined;
    }

    const autoplayTimer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % recommendations.length);
    }, 5000);

    return () => window.clearInterval(autoplayTimer);
  }, [recommendations.length]);

  function showPrevious() {
    setActiveIndex((current) =>
      current === 0 ? recommendations.length - 1 : current - 1,
    );
  }

  function showNext() {
    setActiveIndex((current) =>
      current === recommendations.length - 1 ? 0 : current + 1,
    );
  }

  if (!activeMovie) {
    return (
      <section className="recommendations-carousel">
        <h2>Recommended Movies</h2>
        <p>
          {error
            ? `Could not load recommendations: ${error}`
            : "No recommendations are available right now."}
        </p>
      </section>
    );
  }

  let image = posterPlaceholder;
  if (activeMovie.backdrop_path) {
    image = `${IMAGE_BASE_URL}${activeMovie.backdrop_path}`;
  } else if (activeMovie.poster_path) {
    image = `${POSTER_BASE_URL}${activeMovie.poster_path}`;
  }

  const title = activeMovie.title || "Title unavailable";
  const hasMovieId = Boolean(activeMovie.id);

  return (
    <section className="recommendations-carousel">
      <h2>Recommended Movies</h2>

      <div className="recommendation-slide">
        <img src={image} alt={`${title} artwork`} />

        <div className="recommendation-content">
          <h3>{title}</h3>
          <p>{activeMovie.overview || "No description available."}</p>
          {hasMovieId ? (
            <Button as={Link} to={`/movie-details/${activeMovie.id}`}>
              View Details
            </Button>
          ) : (
            <Button variant="secondary" disabled>
              Details unavailable
            </Button>
          )}
        </div>

        {recommendations.length > 1 && (
          <>
            <button
              className="recommendation-control previous"
              type="button"
              aria-label="Previous recommendation"
              onClick={showPrevious}
            >
              &#10094;
            </button>
            <button
              className="recommendation-control next"
              type="button"
              aria-label="Next recommendation"
              onClick={showNext}
            >
              &#10095;
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export default RecommendationsCarousel;
