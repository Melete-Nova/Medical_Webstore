import React, { useEffect } from 'react';
import './products.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const ProductList = ({
    products,
    cart,
    wishlist,
    onIncreaseQuantity,
    onDecreaseQuantity,
    onAddToWishlist,
}) => {
    window.onscroll = () => console.log('scrollY:', window.scrollY);

    const navigate = useNavigate();

    // --- Navigate to product page ---
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

    // --- Preserve Scroll Position on Update ---
    useEffect(() => {
        const currentScroll = window.scrollY;
        window.scrollTo(0, currentScroll);
    }, [cart]);

    if (!products || products.length === 0) {
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
                        const isWishlisted =
                            wishlist && wishlist.includes(product.id);

                        return (
                            <div
                                key={product.id}
                                className="col-lg-3 col-md-4 col-sm-6 mb-4"
                            >
                                <div className="card product-card h-100">
                                    {/* Clickable Area (only image + name) */}
                                    <div
                                        className="clickable-area"
                                        onClick={() => handleCardClick(product.id)}
                                    >
                                        <div className="product-image-container">
                                            <img
                                                src={product.image}
                                                className="card-img-top product-image"
                                                alt={product.name}
                                            />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {product.name}
                                            </h5>
                                            <p className="card-text">
                                                {product.smalldescription}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Footer (buttons & price, NOT clickable area) */}
                                    <div className="card-footer product-footer">
                                        <div className="price-tag">
                                            ₹{product.price}
                                        </div>

                                        <div className="cart-controls">
                                            {product.inStock ? (
                                                quantity === 0 ? (
                                                    <button
                                                        type="button"
                                                        className="btn add-to-cart-btn"
                                                        onClick={(e) =>
                                                            handleIncrease(
                                                                e,
                                                                product.id
                                                            )
                                                        }
                                                    >
                                                        Add to Cart
                                                    </button>
                                                ) : (
                                                    <div className="quantity-controller">
                                                        <button
                                                            type="button"
                                                            className="btn quantity-btn"
                                                            onClick={(e) =>
                                                                handleDecrease(
                                                                    e,
                                                                    product.id
                                                                )
                                                            }
                                                        >
                                                            {quantity === 1 ? (
                                                                <i className="fas fa-trash"></i>
                                                            ) : (
                                                                '-'
                                                            )}
                                                        </button>
                                                        <span className="quantity-display">
                                                            {quantity}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            className="btn quantity-btn"
                                                            onClick={(e) =>
                                                                handleIncrease(
                                                                    e,
                                                                    product.id
                                                                )
                                                            }
                                                        >
                                                            <i className="fas fa-plus"></i>
                                                        </button>
                                                    </div>
                                                )
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={(e) =>
                                                        handleAddToWishlist(
                                                            e,
                                                            product.id
                                                        )
                                                    }
                                                    disabled={isWishlisted}
                                                >
                                                    <i className="fas fa-heart me-2"></i>
                                                    {isWishlisted
                                                        ? 'In Wishlist'
                                                        : 'Add to Wishlist'}
                                                </button>
                                            )}
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

export default React.memo(ProductList);
