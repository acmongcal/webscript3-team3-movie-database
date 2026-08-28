// React imports
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";

// Javascript imports
import {
  appTitle,
  IMAGE_BASE_URL,
  ytUrl,
  vimeoUrl,
  baseURL,
} from "../global/globals";
import { setOptions } from "../utilities/functions";

// Asset imports
import posterPlaceholder from "../assets/images/poster-placeholder.svg";

// Component imports
import FavoriteButton from "../components/FavoriteButton";
import UnfavoriteButton from "../components/UnfavoriteButton";

//Constants
const API_KEY = import.meta.env.VITE_MOVIEDB_API_KEY;
const INITIAL_CAST_COUNT = 5;
const MAX_CAST_COUNT = 20;

function PageDetails() {
  const { id } = useParams();
  const { isMovieFavorite } = useContext(FavoritesContext);

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [isCastExpanded, setIsCastExpanded] = useState(false);
  const [director, setDirector] = useState("Not available");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = `${appTitle} - Details`;
  }, []);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const options = setOptions(API_KEY);

        const movieResponse = await fetch(
          `${baseURL}movie/${id}?append_to_response=keywords,videos`,
          options,
        );

        if (!movieResponse.ok) {
          throw new Error("Movie could not be found.");
        }

        const movieData = await movieResponse.json();
        const isAnimeMovie =
          movieData.original_language === "ja" &&
          movieData.origin_country?.includes("JP") &&
          movieData.keywords?.keywords?.some(
            (keyword) => keyword.id === 210024,
          );

        if (!isAnimeMovie) {
          throw new Error("This movie is not available in the anime database.");
        }

        const creditsResponse = await fetch(
          `${baseURL}movie/${id}/credits`,
          options,
        );

        if (!creditsResponse.ok) {
          throw new Error("Movie cast could not be loaded.");
        }

        const creditsData = await creditsResponse.json();

        setMovie(movieData);
        setCast(creditsData.cast || []);
        setDirector(
          creditsData.crew
            ?.filter((crewMember) => crewMember.job === "Director")
            .map((crewMember) => crewMember.name)
            .join(", ") || "Not available",
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  if (loading) {
    return <div className="loader"></div>;
  }

  if (error) {
    return (
      <main className="movie-details-error" role="alert">
        <h1>We could not find that movie</h1>
      </main>
    );
  }

  const poster = movie.backdrop_path
    ? IMAGE_BASE_URL + movie.backdrop_path
    : movie.poster_path
      ? IMAGE_BASE_URL + movie.poster_path
      : posterPlaceholder;

  function getMovieTrailer(movie) {
    const trailerVid = movie.videos?.results?.find(
      (video) =>
        (video.site === "YouTube" || video.site === "Vimeo") &&
        video.type === "Trailer" &&
        video.key,
    );
    const teaserVid = movie.videos?.results?.find(
      (video) =>
        (video.site === "YouTube" || video.site === "Vimeo") &&
        video.type === "Teaser" &&
        video.key,
    );
    const clipVid = movie.videos?.results?.find(
      (video) =>
        (video.site === "YouTube" || video.site === "Vimeo") &&
        video.type === "Clip" &&
        video.key,
    );

    const actualTrailer = trailerVid
      ? trailerVid
      : teaserVid
        ? teaserVid
        : clipVid
          ? clipVid
          : "";

    if (actualTrailer) {
      if (actualTrailer.site === "YouTube") {
        return `${ytUrl}${actualTrailer.key}`;
      } else if (actualTrailer.site === "Vimeo") {
        return `${vimeoUrl}${actualTrailer.key}`;
      } else {
        return "";
      }
    } else {
      return actualTrailer;
    }
  }
  const trailer = getMovieTrailer(movie);

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

              <p>
                <strong>Director</strong>
                <span>{director}</span>
              </p>

              <p>
                <strong>Runtime</strong>
                <span>
                  {movie.runtime ? `${movie.runtime} minutes` : "Not available"}
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

            <div className="movie-details-genres" aria-label="Genres">
              {(movie.genres || []).map((genre) => (
                <span className="movie-details-genre" key={genre.id}>
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {trailer && (
          <aside className="movie-details-trailer" aria-label="Movie trailer">
            <iframe
              src={trailer}
              title={`${movie.title} trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </aside>
        )}
      </section>

      <section className="movie-cast" aria-labelledby="movie-cast-heading">
        <div className="movie-cast-inner">
          <p className="movie-details-kicker">The voices behind the story</p>
          <h2 id="movie-cast-heading">Cast</h2>

          {cast.length > 0 ? (
            <>
              <div className="movie-cast-grid">
                {cast
                  .slice(
                    0,
                    isCastExpanded ? MAX_CAST_COUNT : INITIAL_CAST_COUNT,
                  )
                  .map((actor) => {
                    const profile = actor.profile_path
                      ? `${IMAGE_BASE_URL}${actor.profile_path}`
                      : posterPlaceholder;

                    return (
                      <article
                        className="movie-cast-card"
                        key={actor.credit_id}
                      >
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
              {cast.length > INITIAL_CAST_COUNT && (
                <button
                  className="movie-cast-show-more"
                  type="button"
                  onClick={() => setIsCastExpanded((isExpanded) => !isExpanded)}
                >
                  {isCastExpanded ? "Show less" : "Show more"}
                </button>
              )}
            </>
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
