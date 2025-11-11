import React from 'react';
import { Link } from 'react-router-dom';

const WishlistPage = ({ wishlist, products, onRemoveFromWishlist }) => {
    const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

    return (
        <div className="container py-5">
            <h2 className="text-center mb-5">My Wishlist</h2>
            {wishlistedProducts.length === 0 ? (
                <div className="text-center">
                    <p>Your wishlist is empty.</p>
                    <Link to="/" className="btn btn-primary">Continue Shopping</Link>
                </div>
            ) : (
                <div className="list-group">
                    {wishlistedProducts.map(product => (
                        <div key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <img src={product.image} alt={product.name} style={{ width: '80px', marginRight: '20px' }} />
                                <div>
                                    <h5>{product.name}</h5>
                                    {product.stock > 0 ? (
                                        <span className="text-success">Back in Stock!</span>
                                    ) : (
                                        <span className="text-muted">Out of Stock</span>
                                    )}
                                </div>
                            </div>
                            <div>
                                {product.stock > 0 && (
                                    <Link to={`/product/${product.id}`} className="btn btn-success me-2">
                                        View Item
                                    </Link>
                                )}
                                <button className="btn btn-danger" onClick={() => onRemoveFromWishlist(product.id)}>
                                    Remove
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