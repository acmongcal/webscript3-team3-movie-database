// React imports
import { NavLink } from 'react-router-dom';

const Nav = ({ className = '' }) => {
    const links = [
        { to: '/', label: 'Home', title: 'Go to the home page' },
        { to: '/about', label: 'About', title: 'Go to the about page' },
        { to: '/favorites', label: 'Favorites', title: 'Go to your favorite movies' },
    ];

    function blur(event) {
        event.currentTarget.blur();
    }

    return (
        <nav className={className}>
            <ul>
                {links.map(({ to, label, title }) => (
                    <li key={to}>
                        <NavLink to={to} title={title} onClick={blur}>
                            {label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Nav;
