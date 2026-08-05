import { useEffect, useState } from "react";
import { setOptions } from "./global/globals";
const API_KEY = import.meta.env.VITE_MOVIEDB_API_KEY;
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
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&sort_by=${filter}&with_origin_country=JP`,
          options,
        );

        if (!response.ok) {
          console.log(response);
          throw new Error("Movies not found");
        }

        const data = await response.json();

        if (isMounted) {
          setMovies(data.results);
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
      {movies.length > 0 && (
        <ul>
          {movies.map((movie, i) => (
            <li key={i} value={movie.title}>{movie.title}</li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
