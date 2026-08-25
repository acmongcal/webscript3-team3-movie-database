const TMDB_LOGO_URL =
  "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg";

function TmdbAttribution() {
  return (
    <div className="tmdb-attribution">
      <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer">
        <img src={TMDB_LOGO_URL} alt="The Movie Database (TMDB)" />
      </a>
      <p>
        This product uses the TMDB API but is not endorsed or certified by
        TMDB.
      </p>
    </div>
  );
}

export default TmdbAttribution;
