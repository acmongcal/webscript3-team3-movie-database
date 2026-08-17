import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import {useState } from "react";
function HeroBanner({ movies }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {movies.length > 0 && (
        <ul>
          {movies.map((movie, i) => (
            <Carousel.Item interval={1000} key={i}>
              <Image
                src={
                  "https://image.tmdb.org/t/p/original/" + movie.backdrop_path
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
