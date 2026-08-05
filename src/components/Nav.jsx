import { NavLink } from 'react-router-dom';

const Nav = ({ className = '' }) => {
    function blur(event) {
        event.currentTarget.blur();
    }

    return (
        <nav className={className}>
            <ul>
                <li><NavLink to="/" onClick={blur}>Home</NavLink></li>
                <li><NavLink to="/about" onClick={blur}>About</NavLink></li>
                <li><NavLink to="/favorites" onClick={blur}>Favorites</NavLink></li>
            </ul>
        </nav>
    );
};

export default Nav;
