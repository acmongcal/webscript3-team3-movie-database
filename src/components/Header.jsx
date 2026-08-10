import { useState } from "react";
import Nav from "./Nav";

function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  function toggleMenu() {
    setMenuIsOpen((isOpen) => !isOpen);
  }

  return (
    <header className="site-header">
      <h1>Animovies</h1>

      <button
        className="menu-toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={menuIsOpen}
        aria-controls="header-navigation"
        onClick={toggleMenu}
      >
        <span aria-hidden="true">&#9776;</span>
      </button>

      <div id="header-navigation" className={menuIsOpen ? "menu-is-open" : ""}>
        <Nav className="header-nav" />
      </div>
    </header>
  );
}

export default Header;
