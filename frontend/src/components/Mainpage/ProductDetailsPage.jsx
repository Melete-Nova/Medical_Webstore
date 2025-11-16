import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products } from './ProductList.js';
import './ProductDetailsPage.css';

const ProductDetailPage = ({ cart, wishlist, onIncreaseQuantity, handleBuyNow, onAddToWishlist }) => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    const [mainImage, setMainImage] = useState('');
    const [showRatingPopover, setShowRatingPopover] = useState(false);

    useEffect(() => {
        if (product) {
            setMainImage(product.image);
        }
    }, [product]);

    if (!product) {
        return <div className="container my-5"><h2>Product not found!</h2></div>;
    }
    
    const isWishlisted = wishlist && wishlist.includes(product.id);
    const imageGallery = [product.image, 'assets/images/product-thumb-1.png', 'assets/images/product-thumb-2.png'];
    const subtotal = parseFloat(product.price.replace('$', ''));

    const handleLinkClick = (e) => {
        e.preventDefault();
        console.log("Link clicked, navigation prevented.");
    };

    return (
        <div className="product-detail-page-amazon">
            <div className="product-detail-layout">
                {/* --- Columns 1 & 2 --- */}
                <div className="thumbnail-column">
                    {imageGallery.map((img, index) => (
                        <div key={index} className={`thumbnail-image-container ${mainImage === img ? 'active' : ''}`} onMouseEnter={() => setMainImage(img)}>
                            <img src={img} alt={`thumbnail ${index + 1}`} className="thumbnail-image" />
                        </div>
                    ))}
                </div>
                <div className="main-content-column">
                    <div className="main-image-container">
                        <img src={mainImage} alt={product.name} className="main-image" />
                    </div>
                    <div className="product-description-amazon">
                        <h3>Product Description</h3>
                        <p>{product.fullDescription}</p>
                    </div>
                </div>

                {/* --- Column 3: Info & Purchase Box --- */}
                <div className="info-purchase-column">
                    <h1>{product.name}</h1>
                    <a href="#" onClick={handleLinkClick} className="brand-link">Visit the {product.category} Store</a>

                    <div className="rating-section" onMouseEnter={() => setShowRatingPopover(true)} onMouseLeave={() => setShowRatingPopover(false)}>
                        <span>{product.rating}</span> 
                        <i className="fas fa-star star-icon"></i>
                        <a href="#" onClick={handleLinkClick}>{product.reviews} ratings</a>
                        {showRatingPopover && (
                            <div className="rating-popover">
                                <strong>{product.rating} out of 5</strong>
                                <div className="rating-bar"><div className="bar"><div className="fill" style={{width: '57%'}}></div></div> 57%</div>
                            </div>
                        )}
                    </div>
                    
                    <hr />

                    <div className="price-section">
                        <span className="price">₹{product.price}</span>
                        <span className="per-unit"> (₹19.98 / 100g)</span>
                    </div>

                    <div className="delivery-info">
                        <strong>FREE delivery</strong> Saturday, November 15
                    </div>

                    <div className="purchase-box">
                        <p className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </p>
                        <label htmlFor="quantity">Quantity:</label>
                        <select id="quantity" className="quantity-dropdown" defaultValue="1" disabled={!product.inStock}>
                            {[...Array(5).keys()].map(i => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
                        </select>
                        
                        <button className="btn btn-add-to-cart" onClick={() => onIncreaseQuantity(product.id)} disabled={!product.inStock}>Add to Cart</button>
                        <button className="btn btn-buy-now" onClick={() => handleBuyNow([product], subtotal)} disabled={!product.inStock}>Buy Now</button>

                        {/* --- THIS IS THE MODIFIED BUTTON WITH VISIBILITY FIXES --- */}
                        <button 
                            className="btn btn-light w-100 mt-2" 
                            style={{ border: '1px solid #adb5bd' }} 
                            onClick={() => onAddToWishlist(product.id)}
                            disabled={isWishlisted}
                        >
                            <i className={`fas fa-heart me-2 ${isWishlisted ? 'text-danger' : ''}`}></i>
                            {isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;