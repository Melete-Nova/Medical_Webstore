import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { Cart } from 'react-bootstrap-icons';
import './header.css';
// import logo from 'assets/images/logo.png';

const Header = ({ cartCount = 0 }) => {
    return (
        <header>
            <nav className="navbar">
                <div className="logo">
                    <Link to="/">
                        <img src={'assets/images/logo.png'} alt="MediStore Logo" className="logo-image" />
                    </Link>
                </div>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li>
                        {/* Turn the cart icon into a link */}
                        <Link to="/cart" className="cart-link">
                            <Cart size={24} />
                            {cartCount > 0 && (
                                <span className="cart-badge">{cartCount}</span>
                            )}
                        </Link>
                    </li>
                    <li><a href="#" className="signin-btn">Sign In</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;