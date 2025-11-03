import React from 'react';
import './header.css';

const Header = () => {
    return (
        <header>
            <nav className="navbar">
                <div className="logo">
                    <a href="#">Medi<span>Store</span></a>
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