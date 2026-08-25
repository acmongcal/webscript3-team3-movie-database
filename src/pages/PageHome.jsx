import { useEffect, useState } from "react";
import { appTitle, setOptions, min_date, max_date } from "../global/globals";
import HomeFilterNavigation from "../components/HomeFilterNavigation";
import MovieSection from "../components/MovieSection";
import HeroBanner from "../components/HeroBanner";
const API_KEY = import.meta.env.VITE_MOVIEDB_API_KEY;

function PageHome() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [filter, setFilter] = useState(
    `&sort_by=popularity.desc&with_release_type=1|2|3&primary_release_date.gte=${min_date}&primary_release_date.lte=${max_date}`,
  );

  useEffect(() => {
    let isMounted = true;
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      const options = setOptions(API_KEY);
      console.log(options);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false$&language=en-US&page=${pageNumber}&${filter}&with_original_language=ja&with_origin_country=JP&with_keywords=210024`,
          options,
        );

        if (!response.ok) {
          throw new Error("Movies not found");
        }

        const initialJson = await response.json();
        const data = initialJson.results;

        if (isMounted) {
          setMovies(data);
          setLoading(false);

          console.log(data);
          console.log(filter);
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
        <HomeFilterNavigation setFilter={setFilter} />
        <MovieSection title="" movies={movies} />
      </div>
    </section>
  );
}

export default PageHome;
