import { Carousel, Image } from "react-bootstrap";
import {useState } from "react";
import { IMAGE_BASE_URL } from "../global/globals";

function HeroBanner({ movies }) {
  const [index, setIndex] = useState(0);
  const movieArray = movies.slice(0,6);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className="banner-cover">
      {movieArray.length > 0 && (
        <ul>
          {movieArray.map((movie, i) => (
            <Carousel.Item interval={1000} key={i}>
              <Image
                src={
                  IMAGE_BASE_URL + movie.backdrop_path
                }
                alt={movie.title}
                fluid
              />
              <Carousel.Caption>
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </ul>
      )}
    </Carousel>
  );
}

export default HeroBanner;
