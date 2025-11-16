import React, { useEffect, useState, useRef, useMemo } from 'react';
import './products.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, cart, wishlist, handleIncrease, handleDecrease, handleWishlistToggle, handleCardClick, scrollDirection }) => {
    const cardRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { rootMargin: '0px', threshold: 0.1 }
        );

        const currentRef = cardRef.current;
        if (currentRef) observer.observe(currentRef);
        return () => { if (currentRef) observer.unobserve(currentRef); };
    }, []);

    const quantity = cart[product.id] || 0;
    const isWishlisted = wishlist && wishlist.includes(product.id);
    const animationClass = scrollDirection === 'down' ? 'scrolling-down' : 'scrolling-up';
    const statusClass = product.status === 'coming-soon' ? 'coming-soon' : !product.inStock ? 'out-of-stock' : '';

    return (
        <div ref={cardRef} className={`col-lg-3 col-md-4 col-sm-6 mb-4 product-card-wrapper ${animationClass} ${isVisible ? 'visible' : ''}`}>
            <div className={`card product-card h-100 ${statusClass}`}>
                {product.status === 'coming-soon' && <div className="coming-soon-badge">Coming Soon</div>}

                {product.status !== 'coming-soon' && (
                    <button
                        className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
                        onClick={(e) => handleWishlistToggle(e, product.id, isWishlisted)}
                        aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                        <i className="fas fa-heart"></i>
                    </button>
                )}

                <div className="clickable-area" onClick={() => handleCardClick(product.id)}>
                    <div className="product-image-container">
                        <img src={product.image} className="card-img-top product-image" alt={product.name} />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.smalldescription}</p>
                    </div>
                </div>

                <div className="card-footer product-footer">
                    {product.status !== 'coming-soon' && <div className="price-tag">₹{product.price}</div>}
                </div>

                {product.status !== 'coming-soon' && (
                    <div className="actions-overlay">
                        {product.inStock ? (
                             quantity === 0 ? (
                                <button type="button" className="btn add-to-cart-btn" onClick={(e) => handleIncrease(e, product.id)}>
                                    Add to Cart
                                </button>
                            ) : (
                                <div className="quantity-controller">
                                    <button type="button" className="btn quantity-btn" onClick={(e) => handleDecrease(e, product.id)}>
                                        {quantity === 1 ? <i className="fas fa-trash"></i> : '-'}
                                    </button>
                                    <span className="quantity-display">{quantity}</span>
                                    <button type="button" className="btn quantity-btn" onClick={(e) => handleIncrease(e, product.id)}>
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </div>
                            )
                        ) : (
                            <button type="button" className="btn btn-outline-secondary" disabled>
                                Out of Stock
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const ProductList = ({ products, cart, wishlist, onIncreaseQuantity, onDecreaseQuantity, onAddToWishlist, onRemoveFromWishlist }) => {
    const navigate = useNavigate();
    const [scrollDirection, setScrollDirection] = useState('down');
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const { inStockProducts, outOfStockProducts, comingSoonProducts } = useMemo(() => {
        const comingSoonMock = [
            { id: 9001, name: 'Herbal Vitality Tea', smalldescription: 'A rejuvenating blend of nature\'s finest herbs.', image: '../assets/images/coming_soon_1.png', inStock: false, status: 'coming-soon' },
            { id: 9002, name: 'Arctic Root Stress Relief', smalldescription: 'Harness the power of adaptogens to fight stress.', image: '../assets/images/coming_soon_2.png', inStock: false, status: 'coming-soon' },
        ];

        return {
            inStockProducts: products.filter(p => p.inStock),
            outOfStockProducts: products.filter(p => !p.inStock),
            comingSoonProducts: comingSoonMock,
        };
    }, [products]);

    const handleCardClick = (id) => navigate(`/product/${id}`);
    const handleIncrease = (e, id) => { e.stopPropagation(); onIncreaseQuantity(id); };
    const handleDecrease = (e, id) => { e.stopPropagation(); onDecreaseQuantity(id); };

    // --- MODIFIED: This function is now more robust ---
    const handleWishlistToggle = (e, id, isWishlisted) => {
        e.stopPropagation();
        if (isWishlisted) {
            // Only try to remove if the remove function exists
            if (typeof onRemoveFromWishlist === 'function') {
                onRemoveFromWishlist(id);
            } else {
                console.error("onRemoveFromWishlist prop is not a function. Check the parent component.");
            }
        } else {
            // Only try to add if the add function exists
            if (typeof onAddToWishlist === 'function') {
                onAddToWishlist(id);
            } else {
                console.error("onAddToWishlist prop is not a function. Check the parent component.");
            }
        }
    };

    const renderProductSection = (title, productList) => {
        if (!productList || productList.length === 0) return null;
        return (
            <div className="container">
                <h2 className="text-center mb-5 section-title">{title}</h2>
                <div className="row">
                    {productList.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            scrollDirection={scrollDirection}
                            cart={cart}
                            wishlist={wishlist}
                            handleIncrease={handleIncrease}
                            handleDecrease={handleDecrease}
                            handleWishlistToggle={handleWishlistToggle}
                            handleCardClick={handleCardClick}
                        />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="product-list-section py-5">
            {renderProductSection("Featured Products", inStockProducts)}
            {renderProductSection("Currently Out of Stock", outOfStockProducts)}
            {renderProductSection("Coming Soon", comingSoonProducts)}
        </div>
    );
};

export default React.memo(ProductList);