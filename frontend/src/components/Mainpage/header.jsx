import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cart, PersonCircle, X } from 'react-bootstrap-icons';
import './header.css';

const Header = ({ cartCount = 0, isLoggedIn, setIsLoggedIn }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setDrawerOpen(false);
    };

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
                        <Link to="/cart" className="cart-link">
                            <Cart size={24} />
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </Link>
                    </li>

                    {!isLoggedIn ? (
                        <li><Link to="/auth" className="signin-btn">Sign In</Link></li>
                    ) : (
                        <li>
                            <button className="user-btn" onClick={() => setDrawerOpen(true)}>
                                <PersonCircle size={26} />
                            </button>
                        </li>
                    )}
                </ul>
            </nav>

            {/* Overlay for blur background */}
            {drawerOpen && <div className="drawer-overlay" onClick={() => setDrawerOpen(false)}></div>}

            {/* Drawer */}
            <div className={`side-drawer ${drawerOpen ? 'open' : ''}`}>
                <div className="drawer-header">
                    <h3>My Account</h3>
                    <X className="close-icon" size={22} onClick={() => setDrawerOpen(false)} />
                </div>
                <ul className="drawer-menu">
                    <li><Link to="#">Order History</Link></li>
                    <li><Link to="#" className="logout-link" onClick={handleLogout}>Logout</Link></li>
                </ul>

            </div>
        </header>
    );
};

export default Header;
