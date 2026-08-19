import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const BACKDROP_URL = "https://image.tmdb.org/t/p/original";
const POSTER_URL = "https://image.tmdb.org/t/p/w500";

function RecommendationsCarousel({ movies = [], error = null }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const recommendations = movies.slice(0, 5);
  const activeMovie = recommendations[activeIndex] ?? recommendations[0];

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

  const image = activeMovie.backdrop_path
    ? `${BACKDROP_URL}${activeMovie.backdrop_path}`
    : activeMovie.poster_path
      ? `${POSTER_URL}${activeMovie.poster_path}`
      : "/poster-placeholder.svg";

  return (
    <section className="recommendations-carousel">
      <h2>Recommended Movies</h2>

      <div className="recommendation-slide">
        <img src={image} alt={`${activeMovie.title} artwork`} />

        <div className="recommendation-content">
          <h3>{activeMovie.title}</h3>
          <p>{activeMovie.overview || "No description available."}</p>
          <Button as={Link} to={`/movie-details/${activeMovie.id}`}>
            View Details
          </Button>
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

      <p className="recommendation-position">
        {activeIndex + 1} of {recommendations.length}
      </p>
    </section>
  );
}

export default RecommendationsCarousel;
