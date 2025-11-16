import React from 'react';
import { Link } from 'react-router-dom';
import './WishlistPage.css';

const WishlistPage = ({ wishlist, products, onRemoveFromWishlist }) => {
    // Filter products based on the wishlist array
    const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

    return (
        <div className="container py-5 wishlist-page">
            <h2 className="text-center mb-5 section-title">My Wishlist</h2>
            
            {wishlistedProducts.length === 0 ? (
                <div className="text-center empty-wishlist">
                    <i className="fas fa-heart-broken fa-3x text-muted mb-3"></i>
                    <h4>Your wishlist is empty.</h4>
                    <p className="text-muted">Looks like you haven’t added anything to your wishlist yet.</p>
                    <Link to="/" className="btn btn-primary mt-3">
                        <i className="fas fa-shopping-bag me-2"></i>Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="wishlist-items-container">
                    {wishlistedProducts.map(product => (
                        <div key={product.id} className="wishlist-item-card">
                            <div className="d-flex align-items-center">
                                <Link to={`/product/${product.id}`}>
                                    <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className="wishlist-item-image" 
                                    />
                                </Link>
                                <div className="item-details">
                                    <Link to={`/product/${product.id}`} className="item-name-link">
                                        <h5>{product.name}</h5>
                                    </Link>
                                    {product.inStock ? (
                                        <span className="badge bg-success">In Stock</span>
                                    ) : (
                                        <span className="badge bg-secondary">Out of Stock</span>
                                    )}
                                </div>
                            </div>
                            <div className="item-actions">
                                {/* MODIFIED: The "View Item" button now appears for all items */}
                                <Link 
                                    to={`/product/${product.id}`} 
                                    className={`btn ${product.inStock ? 'btn-outline-success' : 'btn-outline-secondary'} me-2`}
                                >
                                    {/* Use a different icon for out-of-stock items for better UX */}
                                    <i className={`fas ${product.inStock ? 'fa-shopping-cart' : 'fa-eye'} me-2`}></i>
                                    View Item
                                </Link>
                                
                                <button className="btn btn-outline-danger" onClick={() => onRemoveFromWishlist(product.id)}>
                                    <i className="fas fa-trash-alt me-2"></i>Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;