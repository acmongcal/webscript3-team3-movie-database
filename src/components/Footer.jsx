import Nav from './Nav';

function Footer() {
  return (
    <footer className="site-footer">
      <Nav className="footer-nav" />
      <p>&copy; {new Date().getFullYear()} Animovies</p>
    </footer>
  );
}

export default Footer;
