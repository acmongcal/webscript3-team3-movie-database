import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { appTitle, IMAGE_BASE_URL } from "../global/globals";
import { FavoritesContext } from "../context/FavoritesContext";
import FavoriteButton from "../components/FavoriteButton";
import UnfavoriteButton from "../components/UnfavoriteButton";

const API_KEY = import.meta.env.VITE_MOVIEDB_API_KEY;

function PageDetails() {
  const { id } = useParams();
  const { isMovieFavorite } = useContext(FavoritesContext);

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = `${appTitle} - Details`;
  }, []);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        };

        const [movieResponse, creditsResponse] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}`, requestOptions),
          fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits`,
            requestOptions,
          ),
        ]);

        if (!movieResponse.ok) {
          throw new Error("Movie could not be found.");
        }

        if (!creditsResponse.ok) {
          throw new Error("Movie cast could not be loaded.");
        }

        const [movieData, creditsData] = await Promise.all([
          movieResponse.json(),
          creditsResponse.json(),
        ]);

        setMovie(movieData);
        setCast(creditsData.cast || []);
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

  const poster = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "/poster-placeholder.svg";

  return (
    <div className="movie-details-page">
      <section
        className="movie-details"
        style={{ backgroundImage: `url("${poster}")` }}
        aria-label={`${movie.title} movie details`}
      >
        <div className="movie-details-overlay">
          <div className="movie-details-content">
            <p className="movie-details-kicker">Movie details</p>
            <h1>{movie.title}</h1>

            <div className="movie-details-meta">
              <p>
                <strong>Release date</strong>
                <span>{movie.release_date || "Not available"}</span>
              </p>

              <p>
                <strong>Rating</strong>
                <span>
                  {movie.vote_average
                    ? `${Math.round(movie.vote_average * 10)}%`
                    : "Not rated"}
                </span>
              </p>
            </div>

            <div className="movie-details-favorite">
              {isMovieFavorite(movie) ? (
                <UnfavoriteButton movie={movie} />
              ) : (
                <FavoriteButton movie={movie} />
              )}
            </div>

            <div className="movie-details-overview">
              <h2>Overview</h2>
              <p>{movie.overview || "No plot summary is available."}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="movie-cast" aria-labelledby="movie-cast-heading">
        <div className="movie-cast-inner">
          <p className="movie-details-kicker">The voices behind the story</p>
          <h2 id="movie-cast-heading">Characters &amp; voice actors</h2>

          {cast.length > 0 ? (
            <div className="movie-cast-grid">
              {cast.slice(0, 20).map((actor) => {
                const profile = actor.profile_path
                  ? `${IMAGE_BASE_URL}${actor.profile_path}`
                  : "/poster-placeholder.svg";

                return (
                  <article className="movie-cast-card" key={actor.credit_id}>
                    <img
                      src={profile}
                      alt={`${actor.name}, voice actor for ${actor.character}`}
                    />
                    <div>
                      <h3>{actor.character || "Unknown character"}</h3>
                      <p>{actor.name}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="movie-cast-empty">
              No cast information is available.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default PageDetails;
