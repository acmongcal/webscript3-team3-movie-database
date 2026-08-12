import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { appTitle } from "../global/globals";

const API_KEY = import.meta.env.VITE_MOVIEDB_API_KEY;

function PageDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = `${appTitle} - Details`;
  }, []);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Movie could not be found.");
        }

        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  if (loading) {
    return <p>Loading movie...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="movie-details">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://placehold.co/500x750?text=No+Poster"
        }
        alt={
          movie.poster_path ? `${movie.title} poster` : "No poster available"
        }
      />

      <div>
        <h2>{movie.title}</h2>

        <p>
          <strong>Release date:</strong> {movie.release_date || "Not available"}
        </p>

        <p>
          <strong>Rating:</strong>{" "}
          {movie.vote_average
            ? `${Math.round(movie.vote_average * 10)}%`
            : "Not rated"}
        </p>

        <h3>Overview</h3>
        <p>{movie.overview || "No plot summary is available."}</p>
      </div>
    </section>
  );
}

export default PageDetails;
