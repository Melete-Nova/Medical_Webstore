import React from 'react';
import { Cart } from 'react-bootstrap-icons'; // Import the Cart icon
import './header.css';
// import logo from '../assets/images/logo.png'; // Import the logo to ensure it's processed correctly

/**
 * The Header component.
 * @param {object} props - The component props.
 * @param {number} props.cartCount - The total number of items in the cart.
 */
const Header = ({ cartCount = 0 }) => {
    return (
        <header>
            <nav className="navbar">
                <div className="logo">
                    <a href="#">
                        <img src={'../assets/images/logo.png'} alt="MediStore Logo" className="logo-image" />
                    </a>
                </div>
                <ul className="nav-links">
                    <li><a href="#">Home</a></li>
                    <li>
                        <a href="#" className="cart-link">
                            <Cart size={24} />
                            {cartCount > 0 && (
                                <span className="cart-badge">{cartCount}</span>
                            )}
                        </a>
                    </li>
                    <li><a href="#" className="signin-btn">Sign In</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;