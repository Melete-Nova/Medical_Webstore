import React from 'react';
import './Footer.css';
import { Facebook, Twitter, Instagram, Linkedin } from 'react-bootstrap-icons';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="row">
                    {/* Column 1: Logo and About */}
                    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <div className="footer-logo">
                            <a href="#">Medi<span>Store</span></a>
                        </div>
                        <p className="footer-about">
                            Your trusted source for high-quality medical supplies and equipment. We are committed to providing the best products to healthcare professionals and individuals.
                        </p>
                        <div className="social-icons">
                            <a href="#" aria-label="Facebook"><Facebook /></a>
                            <a href="#" aria-label="Twitter"><Twitter /></a>
                            <a href="#" aria-label="Instagram"><Instagram /></a>
                            <a href="#" aria-label="LinkedIn"><Linkedin /></a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
                        <h5 className="footer-heading">Quick Links</h5>
                        <ul className="list-unstyled footer-links">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Products</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Medical Categories */}
                    <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                        <h5 className="footer-heading">Shop by Category</h5>
                        <ul className="list-unstyled footer-links">
                            <li><a href="#">Diagnostics</a></li>
                            <li><a href="#">Surgical Supplies</a></li>
                            <li><a href="#">Personal Protective Equipment</a></li>
                            <li><a href="#">First Aid</a></li>
                            <li><a href="#">Mobility Aids</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Info */}
                    <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                        <h5 className="footer-heading">Contact Us</h5>
                        <ul className="list-unstyled contact-info">
                            <li>123 Health St, MedCity, 54321</li>
                            <li>Phone: (123) 456-7890</li>
                            <li>Email: <a href="mailto:support@medistore.com">support@medistore.com</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} MediStore. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
