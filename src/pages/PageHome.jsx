import { useEffect, useState } from "react";
import { setOptions } from "./global/globals";
import { min_date } from "./global/globals";
import { max_date } from "./global/globals";

const API_KEY = import.meta.env.VITE_MOVIEDB_API_KEY;


function PageHome() {
  const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("primary_release_date.desc");
  
    useEffect(() => {
      let isMounted = true;
      const fetchMovies = async () => {
        setLoading(true);
        setError(null);
        const options = setOptions(API_KEY);
        console.log(options);
  
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?include_adult=false&${filter}&with_original_language=ja&with_origin_country=JP&with_keywords=210024`,
  
            options,
          );
  
          if (!response.ok) {
            console.log(response);
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
    }, [filter]);
    if (loading) {
      return <div>Loading movies...</div>;
    }
    if (error) {
      return <div>Error: {error}</div>;
    }
  
  return (
    <section>
      <h2>Home</h2>
      <button
        onClick={() =>
          setFilter(`with_release_type=1|2|3&primary_release_date.gte=${min_date}&primary_release_date.lte=${max_date}`)
        }
      >
        Now Playing
      </button>
      <button onClick={() => setFilter("sort_by=popularity.desc")}>Popular</button>
      <button onClick={() => setFilter("sort_by=primary_release_date.desc")}>
        Upcoming
      </button>
      <button onClick={() => setFilter("sort_by=vote_average.desc&vote_count.gte=200")}>Top Rated</button>
      {movies.length > 0 && (
        <ul>
          {movies.map((movie, i) => (
            <li key={i} value={movie.title}>
              {movie.title}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default PageHome;
