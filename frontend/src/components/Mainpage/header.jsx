import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from './ProductList.js';
import './header.css';
// import logo from 'assets/images/logo.png';

const allCategories = ['All', ...new Set(products.map(p => p.category))];

// Added wishlistCount to props
const Header = ({ cartCount = 0, wishlistCount = 0, isLoggedIn, isAdmin, handleLogout, onSearchChange, onCategoryChange }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        if (onSearchChange) { onSearchChange(e.target.value); }
    };

    const handleCategorySelect = (e) => {
        setSelectedCategory(e.target.value);
        if (onCategoryChange) { onCategoryChange(e.target.value); }
    };

    const onLogoutClick = () => {
        handleLogout();
        setDrawerOpen(false);
    };

    return (
        <header>
            <nav className="navbar">
                <div className="logo">
                    <Link to="/"><img src={'assets/images/logo.png'} alt="MediStore Logo" className="logo-image" /></Link>
                </div>
                <div className="search-filter-container">
                    {/* 2. Used Font Awesome icon */}
                    <div className="search-bar">
                        <i className="fas fa-search search-icon"></i>
                        <input type="text" placeholder="Search for products..." value={searchTerm} onChange={handleSearch}/>
                    </div>
                    {/* 2. Used Font Awesome icon */}
                    <div className="filter-dropdown">
                        <i className="fas fa-filter filter-icon"></i>
                        <select value={selectedCategory} onChange={handleCategorySelect}>
                            {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    {/* 1. Added wishlist icon */}
                    <li>
                        <Link to="/wishlist" className="cart-link">
                            <i className="fas fa-heart"></i>
                            {wishlistCount > 0 && <span className="cart-badge">{wishlistCount}</span>}
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart" className="cart-link">
                            <i className="fas fa-shopping-cart"></i>
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </Link>
                    </li>
                    {!isLoggedIn ? (
                        <li><Link to="/auth" className="signin-btn">Sign In</Link></li>
                    ) : (
                        <li>
                            <button className="user-btn" onClick={() => setDrawerOpen(true)}>
                                <i className="fas fa-user-circle" style={{ fontSize: '26px' }}></i>
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
            {drawerOpen && <div className="drawer-overlay" onClick={() => setDrawerOpen(false)}></div>}
            <div className={`side-drawer ${drawerOpen ? 'open' : ''}`}>
                <div className="drawer-header">
                    <h3>My Account</h3>
                    <i className="fas fa-times close-icon" onClick={() => setDrawerOpen(false)}></i>
                </div>
                <ul className="drawer-menu">
                    {isAdmin && <li><Link to="/admin"><i className="fas fa-tachometer-alt me-2"></i>Dashboard</Link></li>}
                    <li><Link to="/profile"><i className="fas fa-user me-2"></i>My Profile</Link></li>
                    <li><Link to="/orders"><i className="fas fa-history me-2"></i>Order History</Link></li>
                    <li><Link to="#" className="logout-link" onClick={onLogoutClick}><i className="fas fa-sign-out-alt me-2"></i>Logout</Link></li>
                </ul>
            </div>
        </header>
    );
};

export default Header;