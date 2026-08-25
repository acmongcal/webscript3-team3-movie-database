import { useEffect, useState } from "react";
import { appTitle, setOptions,nowPlayingEndpoint, animeFilterEndpoint } from "../global/globals";
import HomeFilterNavigation from "../components/HomeFilterNavigation";
import MovieSection from "../components/MovieSection";
import HeroBanner from "../components/HeroBanner";
const API_KEY = import.meta.env.VITE_MOVIEDB_API_KEY;

function PageHome() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [heroGenres, setHeroGenres] = useState([]);
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
        const data = initialJson.results;
        if (isMounted) {
          setMovies(data);
          try{
            for (let index = 0; index < 6; index++) {
              const response = await fetch(`https://api.themoviedb.org/3/movie/${data[index].id}?language=en-US`,options,
              );
              if(!response.ok){
                throw new Error("Genre not found");
              }
              const initialJson = await response.json();
              setHeroGenres([...heroGenres,[initialJson.genres]]);
            }
            console.log(heroGenres);
          }
          catch(err){
            setError(err.message);
            setHeroGenres([]);
            setLoading(false);
          }
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
        <HomeFilterNavigation setFilter={setFilter} />
        <MovieSection title="" movies={movies} />
      </div>
    </section>
  );
}

export default PageHome;
