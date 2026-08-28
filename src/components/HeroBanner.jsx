import { Carousel, Image, Button } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { IMAGE_BASE_URL, setOptions } from "../global/globals";
import posterPlaceholder from "../assets/images/poster-placeholder.svg";
import FavoriteButton from "./FavoriteButton";
import UnfavoriteButton from "./UnfavoriteButton";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import useIsMobile from "../hooks/useIsMobile";
const API_KEY = import.meta.env.VITE_MOVIEDB_API_KEY;

function HeroBanner({ movies }) {
  const isMobile = useIsMobile();
  const { isMovieFavorite } = useContext(FavoritesContext);
  const [heroGenres, setHeroGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isExcerpt, setIsExcerpt] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setIsExcerpt(false);
    }
    else{
      setIsExcerpt(true);
    }
  }, [isMobile]);

  useEffect(() => {
    let isMounted = true;
    const fetchGenres = async () => {
      setLoading(true);
      setError(null);
      const options = setOptions(API_KEY);

      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en",
          options,
        );

        if (!response.ok) {
          throw new Error("Genres not found");
        }

        const initialJson = await response.json();
        const data = initialJson.genres;
        if (isMounted) {
          setLoading(false);
          setHeroGenres(
            movies.map(({ genre_ids }) =>
              genre_ids.map((id) => data?.find((el) => el.id === id).name),
            )
          );
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };
    fetchGenres();

    return () => {
      isMounted = false;
    };
  }, [movies]);

  

  // if(loading){
  //   return  <div>Loading banner...</div>
  // }
  const bannerArray = movies.length > 7 ? movies?.slice(0, 7) : movies;
  return (
    <Carousel controls={false} interval={4000}>
      {bannerArray?.map((movie, i) => (
        <Carousel.Item key={i}>
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
            <div className="banner-details">
              <h2>{movie.title}</h2>
              <ul className="hero-genre">
                {heroGenres &&
                  heroGenres[i]?.map((genre, i) => 
                  <li key={i}>{genre}</li>
                  )}
              </ul>

              {isExcerpt ? (
                <p>
                  {movie.overview
                    ? movie.overview.length > 90
                      ? movie.overview.slice(0, 90) + "..."
                      : movie.overview
                    : "No description available."}
                </p>
              ) : (
                <p>
                  {movie.overview
                    ? movie.overview
                    : "No description available."}
                </p>
              )}
            </div>
            <div className="banner-button-grp">
              <Button
                as={Link}
                to={`/movie-details/${movie.id}`}
                variant="dark"
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
