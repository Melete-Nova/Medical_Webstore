import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products } from './ProductList.js';
import { StarFill } from 'react-bootstrap-icons';
import './ProductDetailsPage.css'; // Import the new, rewritten CSS

const ProductDetailPage = ({ cart, onIncreaseQuantity, onDecreaseQuantity, handleBuyNow }) => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    // State for image gallery and rating popover
    const [mainImage, setMainImage] = useState('');
    const [showRatingPopover, setShowRatingPopover] = useState(false);

    useEffect(() => {
        if (product) {
            setMainImage(product.image); // Set initial main image
        }
    }, [product]);

    if (!product) {
        return <div className="container my-5"><h2>Product not found!</h2></div>;
    }

    // Mock images for the thumbnail gallery
    const imageGallery = [product.image, 'assets/images/product-thumb-1.png', 'assets/images/product-thumb-2.png'];
    const subtotal = parseFloat(product.price.replace('$', ''));

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        // This is a simplified handler. A real implementation would be more complex.
        // For now, we'll just use it to show the value.
    };

    return (
        <div className="product-detail-page-amazon">
            <div className="product-detail-layout">
                {/* --- Column 1: Image Thumbnails --- */}
                <div className="thumbnail-column">
                    {imageGallery.map((img, index) => (
                        <div key={index} className={`thumbnail-image-container ${mainImage === img ? 'active' : ''}`} onMouseEnter={() => setMainImage(img)}>
                            <img src={img} alt={`thumbnail ${index + 1}`} className="thumbnail-image" />
                        </div>
                    ))}
                </div>

                {/* --- Column 2: Main Image & Description --- */}
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
                    <a href="#" className="brand-link">Visit the {product.category} Store</a>

                    <div className="rating-section" onMouseEnter={() => setShowRatingPopover(true)} onMouseLeave={() => setShowRatingPopover(false)}>
                        <span>{product.rating}</span> <StarFill className="star-icon" />
                        <a href="#">{product.reviews} ratings</a>
                        {showRatingPopover && (
                            <div className="rating-popover">
                                <strong>{product.rating} out of 5</strong>
                                <div className="rating-bar"><div className="bar"><div className="fill" style={{width: '57%'}}></div></div> 57%</div>
                                {/* Mock data for rating bars */}
                            </div>
                        )}
                    </div>
                    
                    <hr />

                    <div className="price-section">
                        <span className="price">{product.price}</span>
                        <span className="per-unit"> ($19.98 / 100g)</span>
                    </div>

                    <div className="delivery-info">
                        <strong>FREE delivery</strong> Saturday, November 15
                    </div>

                    <div className="purchase-box">
                        <p className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </p>
                        <label htmlFor="quantity">Quantity:</label>
                        <select id="quantity" className="quantity-dropdown" defaultValue="1" onChange={handleQuantityChange}>
                            {[...Array(5).keys()].map(i => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
                        </select>
                        
                        <button className="btn btn-add-to-cart" onClick={() => onIncreaseQuantity(product.id)} disabled={!product.inStock}>Add to Cart</button>
                        <button className="btn btn-buy-now" onClick={() => handleBuyNow([product], subtotal)} disabled={!product.inStock}>Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;