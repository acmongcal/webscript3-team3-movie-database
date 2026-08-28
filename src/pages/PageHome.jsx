import { useEffect, useState } from "react";
import { appTitle,nowPlayingEndpoint, animeFilterEndpoint } from "../global/globals";
import { setOptions } from "../utilities/functions";
import HomeFilterNavigation from "../components/HomeFilterNavigation";
import MovieSection from "../components/MovieSection";
import HeroBanner from "../components/HeroBanner";
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
          `${animeFilterEndpoint}&page=${pageNumber}&${filter}`,
          options,
        );

        if (!response.ok) {
          throw new Error("Movies not found");
        }

        const initialJson = await response.json();
        setTotalPages(initialJson.total_pages);
        // console.log(initialJson.total_results);
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
  }, []);
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section>
      {loading && <div>Loading movies...</div>}
      <HeroBanner movies={movies} />
      <div className="page-content">
        <HomeFilterNavigation 
         setFilter={setFilter}
         setPageNumber={setPageNumber}
         totalPages={totalPages}
         currentPageNumber={pageNumber}
        />
        <MovieSection title="" movies={movies} />
      </div>
    </section>
  );
}

export default PageHome;
