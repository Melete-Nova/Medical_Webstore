import React from 'react';
import './products.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ products, cart, wishlist, onIncreaseQuantity, onDecreaseQuantity, onAddToWishlist }) => {
    const navigate = useNavigate();

    const handleCardClick = (id) => {
        navigate(`/product/${id}`);
    };

    // --- Cart Handlers ---
    const handleIncrease = (e, id) => {
        e.stopPropagation();
        e.preventDefault();
        onIncreaseQuantity(id);
    };

    const handleDecrease = (e, id) => {
        e.stopPropagation();
        e.preventDefault();
        onDecreaseQuantity(id);
    };
    
    // --- Wishlist Handler ---
    const handleAddToWishlist = (e, id) => {
        e.stopPropagation();
        e.preventDefault();
        onAddToWishlist(id);
    };


    if (products.length === 0) {
        return (
            <div className="container py-5 text-center">
                <h3>No products found</h3>
                <p className="text-muted">Try adjusting your search or filter.</p>
            </div>
        );
    }

    return (
        <div className="product-list-section py-5">
            <div className="container">
                <h2 className="text-center mb-5 section-title">Featured Products</h2>
                <div className="row">
                    {products.map((product) => {
                        const quantity = cart[product.id] || 0;
                        const isWishlisted = wishlist && wishlist.includes(product.id);

                        return (
                            <div
                                key={product.id}
                                className="col-lg-3 col-md-4 col-sm-6 mb-4"
                            >
                                <div
                                    className="card product-card h-100"
                                    onClick={() => handleCardClick(product.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="product-image-container">
                                        <img src={product.image} className="card-img-top product-image" alt={product.name} />
                                    </div>
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text flex-grow-1">{product.smalldescription}</p>
                                        
                                        <div className="product-footer">
                                            <div className="price-tag">{product.price}</div>
                                            <div className="cart-controls">
                                                {/* 1. Check if product is in stock */}
                                                {product.inStock ? (
                                                    quantity === 0 ? (
                                                        <button 
                                                            type="button" 
                                                            className="btn add-to-cart-btn" 
                                                            onClick={(e) => handleIncrease(e, product.id)}
                                                        >
                                                            Add to Cart
                                                        </button>
                                                    ) : (
                                                        <div className="quantity-controller">
                                                            <button 
                                                                type="button" 
                                                                className="btn quantity-btn" 
                                                                onClick={(e) => handleDecrease(e, product.id)}
                                                            >
                                                                {/* Using Font Awesome icons */}
                                                                {quantity === 1 ? <i className="fas fa-trash"></i> : '-'}
                                                            </button>
                                                            <span className="quantity-display">{quantity}</span>
                                                            <button 
                                                                type="button" 
                                                                className="btn quantity-btn" 
                                                                onClick={(e) => handleIncrease(e, product.id)}
                                                            >
                                                                <i className="fas fa-plus"></i>
                                                            </button>
                                                        </div>
                                                    )
                                                ) : (
                                                    // 2. If out of stock, show Add to Wishlist button
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-secondary"
                                                        onClick={(e) => handleAddToWishlist(e, product.id)}
                                                        disabled={isWishlisted}
                                                    >
                                                        <i className="fas fa-heart me-2"></i>
                                                        {isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProductList;