import { useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";

const BACKDROP_URL = "https://image.tmdb.org/t/p/original";

function ControlledCarousel({ movies = [] }) {
  const [index, setIndex] = useState(0);

  const carouselMovies = movies
    .filter((movie) => movie.backdrop_path)
    .slice(0, 5);

  if (carouselMovies.length === 0) {
    return null;
  }

  return (
    <Carousel
      activeIndex={index}
      onSelect={setIndex}
      interval={5000}
      pause="hover"
      fade
    >
      {carouselMovies.map((movie) => (
        <Carousel.Item key={movie.id}>
          <img
            className="d-block w-100"
            src={`${BACKDROP_URL}${movie.backdrop_path}`}
            alt={`${movie.title} backdrop`}
            style={{
              height: "clamp(20rem, 55vw, 38rem)",
              objectFit: "cover",
              filter: "brightness(55%)",
            }}
          />

          <Carousel.Caption>
            <h2>{movie.title}</h2>

            <p>
              {movie.overview
                ? `${movie.overview.slice(0, 160)}${
                    movie.overview.length > 160 ? "…" : ""
                  }`
                : "No description available."}
            </p>

            <Button
              as={Link}
              to={`/movie-details/${movie.id}`}
              variant="primary"
            >
              View Details
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ControlledCarousel;
