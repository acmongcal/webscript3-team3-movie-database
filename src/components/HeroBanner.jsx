import { Carousel, Image, Button } from "react-bootstrap";
import { useState, useContext } from "react";
import { IMAGE_BASE_URL } from "../global/globals";
import posterPlaceholder from "../assets/images/poster-placeholder.svg";
import FavoriteButton from "./FavoriteButton";
import UnfavoriteButton from "./UnfavoriteButton";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";

function HeroBanner({ movies }) {
  const { isMovieFavorite } = useContext(FavoritesContext);
  const [index, setIndex] = useState(0);
  const movieArray = movies.slice(0, 6);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} controls={false}>
      {movieArray.map((movie, i) => (
        <Carousel.Item interval={4000} key={i}>
          <Image
            className="banner-cover"
            src={
              movie.backdrop_path
                ? IMAGE_BASE_URL + movie.backdrop_path
                : movie.poster_path
                  ? IMAGE_BASE_URL + movie.poster_path
                  : posterPlaceholder
            }
            alt={movie.title}
          />
          <Carousel.Caption>
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            <div>
              <Button
                as={Link}
                to={`/movie-details/${movie.id}`}
                variant="primary"
              >
                View Details
              </Button>
              {isMovieFavorite(movie) ? (
              <UnfavoriteButton movie={movie} />
              ) : (
              <FavoriteButton movie={movie} />)}
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default HeroBanner;
