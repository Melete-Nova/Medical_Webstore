import React from 'react';
import './header.css';

const Header = () => {
    return (
        <header>
            <nav className="navbar">
                <div className="logo">
                    {/* Use the imported logo in the src attribute */}
                    <a href="#">
                        <img src={'../assets/images/logo.png'} alt="MediStore Logo" className="logo-image" />
                    </a>
                </div>
                <ul className="nav-links">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Cart</a></li>
                    <li><a href="#" className="signin-btn">Sign In</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;