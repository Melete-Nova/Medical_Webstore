import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cart, Search, Filter, PersonCircle, X } from 'react-bootstrap-icons';
import { products } from './ProductList.js';
import './header.css';
// import logo from 'assets/images/logo.png';

const allCategories = ['All', ...new Set(products.map(p => p.category))];

// Receive isAdmin and handleLogout props
const Header = ({ cartCount = 0, isLoggedIn, isAdmin, handleLogout, onSearchChange, onCategoryChange }) => {
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
                <div className="logo"><Link to="/"><img src={'assets/images/logo.png'} alt="MediStore Logo" className="logo-image" /></Link></div>
                <div className="search-filter-container">
                    <div className="search-bar"><Search className="search-icon" /><input type="text" placeholder="Search for products..." value={searchTerm} onChange={handleSearch}/></div>
                    <div className="filter-dropdown"><Filter className="filter-icon" /><select value={selectedCategory} onChange={handleCategorySelect}>{allCategories.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                </div>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/cart" className="cart-link"><Cart size={24} />{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}</Link></li>
                    {!isLoggedIn ? (<li><Link to="/auth" className="signin-btn">Sign In</Link></li>) : (<li><button className="user-btn" onClick={() => setDrawerOpen(true)}><PersonCircle size={26} /></button></li>)}
                </ul>
            </nav>
            {drawerOpen && <div className="drawer-overlay" onClick={() => setDrawerOpen(false)}></div>}
            <div className={`side-drawer ${drawerOpen ? 'open' : ''}`}>
                <div className="drawer-header"><h3>My Account</h3><X className="close-icon" size={22} onClick={() => setDrawerOpen(false)} /></div>
                <ul className="drawer-menu">
                    {/* Conditionally render Dashboard link if user is admin */}
                    {isAdmin && <li><Link to="/admin">Dashboard</Link></li>}
                    {/* Add the profile link here */}
                    <li><Link to="/profile">My Profile</Link></li>
                    <li><Link to="/orders">Order History</Link></li>
                    <li><Link to="#" className="logout-link" onClick={onLogoutClick}>Logout</Link></li>
                </ul>
            </div>
        </header>
    );
};

export default Header;