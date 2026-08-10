import Nav from "./Nav";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-intro">
          <h2>Animovies</h2>
          <p className="footer-description">
            an anime movie database created for fans who want an easy way to
            discover and explore animated films from Japan.
          </p>
        </div>
        <section className="footer-links">
          <Nav className="footer-nav" />
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <div id="footer-contact-us">Contact links images</div>
          </div>
        </section>
      </div>
      <p className="footer-copyright">
        &copy; {new Date().getFullYear()} Animovies
      </p>
    </footer>
  );
}

export default Footer;
