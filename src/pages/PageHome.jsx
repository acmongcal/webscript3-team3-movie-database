// React imports
import { useEffect, useState } from "react";

// Javascript imports
import {
  appTitle,
  nowPlayingEndpoint,
  animeFilterEndpoint,
  baseURL,
} from "../global/globals";
import { setOptions, setMetaDescription } from "../utilities/functions";
import HomeFilterNavigation from "../components/HomeFilterNavigation";

// Component imports
import MovieSection from "../components/MovieSection";
import HeroBanner from "../components/HeroBanner";

//Constants
const API_KEY = import.meta.env.VITE_MOVIEDB_API_KEY;

function PageHome() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState(nowPlayingEndpoint);

  useEffect(() => {
    let isMounted = true;
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      const options = setOptions(API_KEY);

      try {
        const response = await fetch(
          `${baseURL}${animeFilterEndpoint}&page=${pageNumber}&${filter}`,
          options,
        );

        if (!response.ok) {
          throw new Error("Movies not found");
        }

        const initialJson = await response.json();
        setTotalPages(initialJson.total_pages);
        const data = initialJson.results;
        if (isMounted) {
          setMovies(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setMovies(null);
          setLoading(false);
        }
      }
    };
    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, [filter, pageNumber]);

  useEffect(() => {
    document.title = `${appTitle} - Home`;
    setMetaDescription("Discover anime movies, explore detailed movie information, and save your favourites with Animovies.");
  }, []);
  if (error) {
    return (
      <main className="movie-details-error" role="alert">
        <h1>{error}</h1>
      </main>
    );
  }

  return (
    <section>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <HeroBanner movies={movies} />
      )}
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="page-content">
          <HomeFilterNavigation
            setFilter={setFilter}
            setPageNumber={setPageNumber}
            totalPages={totalPages}
            currentPageNumber={pageNumber}
          />
          <MovieSection title="" movies={movies} />
        </div>
      )}
    </section>
  );
}

export default PageHome;
