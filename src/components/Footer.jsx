// React imports
import { Link } from "react-router-dom";
import Nav from "./Nav";

// Component imports
import TmdbAttribution from "./TmdbAttribution";

//Assets Import 
import alanProfile from "../assets/images/alan.png";
import johnnyProfile from "../assets/images/johnny.png";
import scottProfile from "../assets/images/scott.png";
function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-intro">
          <h2>
            <Link className="footer-title-link" to="/" title="Go to the home page">
              Animovies
            </Link>
          </h2>
          <p className="footer-description">
            An anime movie database created for fans who want an easy way to
            discover and explore animated films from Japan.
          </p>
        </div>
        <section className="footer-links">
          <div className="footer-nav-group">
            <h3>Explore</h3>
            <Nav className="footer-nav" />
          </div>
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <div id="footer-contact-us">
              <a href="https://kuuhakudev.com"><img src={alanProfile} alt="avatar for alan" /></a>
              <a href="https://johnzhu.ca"><img src={johnnyProfile} alt="avatar for johnny" /></a>
              <a href="https://scottouellette.com"><img src={scottProfile} alt="avatar for scott" /></a>
            </div>
          </div>
        </section>
      </div>
      <TmdbAttribution />
      <p className="footer-copyright">
        &copy; {new Date().getFullYear()} Animovies
      </p>
    </footer>
  );
}

export default Footer;
