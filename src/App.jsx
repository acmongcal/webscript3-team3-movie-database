import { useEffect, useState } from "react";
import { setOptions } from "./global/globals";
const API_KEY = import.meta.env.VITE_MOVIEDB_API_KEY;

const min_date = new Date().toLocaleDateString();
const max_date = new Date(
  Date.now() + 7 * 24 * 60 * 60 * 1000,
).toLocaleDateString();

function App() {
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
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&sort_by=${filter}&with_original_language=ja&with_origin_country=JP`,

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
    <main>
      <h1>Test</h1>
      <button
        onClick={() =>
          setFilter(`with_release_type=1|2|3&primary_release_date.gte=${min_date}&primary_release_date.lte=${max_date}`)
        }
      >
        Now Playing
      </button>
      <button onClick={() => setFilter("popularity.desc")}>Popular</button>
      <button onClick={() => setFilter("primary_release_date.desc")}>
        Upcoming
      </button>
      <button onClick={() => setFilter("vote_average.desc")}>Top Rated</button>
      {movies.length > 0 && (
        <ul>
          {movies.map((movie, i) => (
            <li key={i} value={movie.title}>
              {movie.title}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
