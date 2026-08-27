import { Carousel, Image, Button } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import {
  IMAGE_BASE_URL,
  animeFilterEndpoint,
  popularEndpoint,
  setOptions,
} from "../global/globals";
import posterPlaceholder from "../assets/images/poster-placeholder.svg";
import FavoriteButton from "./FavoriteButton";
import UnfavoriteButton from "./UnfavoriteButton";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
const API_KEY = import.meta.env.VITE_MOVIEDB_API_KEY;

function HeroBanner() {
  const { isMovieFavorite } = useContext(FavoritesContext);
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const [bannerMovies, setBannerMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [heroGenres, setHeroGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    let isMounted = true;
    const fetchGenres = async () => {
      setLoading(true);
      setError(null);
      const options = setOptions(API_KEY);

      try {
        const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en',
          options,
        );

        if (!response.ok) {
          throw new Error("Genres not found");
        }

        const initialJson = await response.json();
        const data = initialJson.genres;
        if (isMounted) {
          setGenres(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setGenres([]);
          setLoading(false);
        }
      }
    };
    fetchGenres();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchBannerMovies = async () => {
      setLoading(true);
      setError(null);
      const options = setOptions(API_KEY);

      try {
        const response = await fetch(
          `${animeFilterEndpoint}&page=1&${popularEndpoint}`,
          options,
        );

        if (!response.ok) {
          throw new Error("Movies not found");
        }

        const initialJson = await response.json();
        const data = initialJson.results.slice(0, 6);
        if (isMounted) {
          setBannerMovies(data);
          setHeroGenres(bannerMovies.map(({ genre_ids }) => genre_ids.map(id => genres?.find(el => el.id === id).name)));
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setBannerMovies(null);
          setLoading(false);
        }
      }
    };
    fetchBannerMovies();

    return () => {
      isMounted = false;
    };
  }, [genres, bannerMovies]);
  const movieArray = bannerMovies.slice(0, 6);
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
            <ul>
              {heroGenres && heroGenres[i]?.map((genre,i)=>(
                <li key={i}>{genre}</li>
              ))}
            </ul>
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
                <FavoriteButton movie={movie} />
              )}
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default HeroBanner;
