import { useEffect } from "react";
import { appTitle } from "../global/globals";
import filmHero from "../assets/images/film-hero.jpg";
import japaneseGarden from "../assets/images/japaneseGarden.jpg";
function PageAbout() {
  useEffect(() => {
    document.title = `${appTitle} - About`;
    document.body.classList.add("about-background");
    document.body.style.backgroundImage = `url(${japaneseGarden})`;

    return () => {
      document.body.classList.remove("about-background");
      document.body.style.backgroundImage = "";
    };
  }, []);
  return (
    <section className="about-page">
      <div className="about-wrapper">
        <h2>About Animovies</h2>
        <img className="about-hero" src={filmHero} alt="Film hero" />
        <article className="about-content">
          <section>
            <h3>Our Story</h3>
            <p>
              Welcome to Animovies, an anime movie database created for fans who
              want an easy way to discover and explore animated films from Japan.
              Our platform brings together information on popular classics, modern
              releases, and hidden gems, making it simple to find your next movie
              to watch.
            </p>
          </section>

          <section>
            <h3>What You Can Explore</h3>
            <p>
              At Animovies, you can browse detailed movie pages featuring story
              summaries, genres, release dates, studios, runtimes, ratings, and
              trailers. Whether you're a longtime anime fan or just beginning your
              journey, our goal is to provide accurate information through a clean
              and easy-to-use experience.
            </p>
          </section>

          <section>
            <h3>Our Mission</h3>
            <p>
              We believe every anime movie has a story worth discovering. That's
              why we're committed to building a reliable database where fans can
              explore new releases, revisit timeless classics, and learn more
              about the films and creators behind them.
            </p>
          </section>
        </article>
      </div>
    </section>
  );
}

export default PageAbout;
