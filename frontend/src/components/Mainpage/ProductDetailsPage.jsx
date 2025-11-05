import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from './ProductList.js';
import { Plus, Trash } from 'react-bootstrap-icons'; // Import icons
import './ProductDetailsPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDetailPage = ({ cart, onIncreaseQuantity, onDecreaseQuantity }) => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return <div className="container my-5"><h2>Product not found!</h2></div>;
    }

    // Get the quantity of this specific product from the cart state
    const quantity = cart[product.id] || 0;

    return (
        <div className="product-detail-container container my-5">
            <div className="row">
                {/* Product Image Column */}
                <div className="col-md-6">
                    <img src={product.image} alt={product.name} className="img-fluid product-main-image" />
                </div>

                {/* Product Details Column */}
                <div className="col-md-6">
                    <div className="product-info">
                        <h1 className="product-title">{product.name}</h1>
                        
                        <div className="product-rating my-3">
                            <span>{product.rating} ★</span>
                            <a href="#" className="ms-2">{product.reviews} reviews</a>
                        </div>
                        
                        <div className="product-price">
                            <span className="current-price">{product.price}</span>
                        </div>
                        
                        <p className="product-description my-4">
                            {product.fullDescription}
                        </p>

                        <div className="action-box p-3">
                            <div className="price-in-box mb-3">{product.price}</div>
                            {product.inStock ? (
                                <p className="text-success fw-bold">In Stock</p>
                            ) : (
                                <p className="text-danger fw-bold">Out of Stock</p>
                            )}
                            
                            {/* --- Conditional Cart UI --- */}
                            {quantity === 0 ? (
                                <button 
                                    className="btn add-to-cart-detail-btn w-100 mb-2"
                                    onClick={() => onIncreaseQuantity(product.id)}
                                    disabled={!product.inStock}
                                >
                                    Add to Cart
                                </button>
                            ) : (
                                <div className="quantity-controller-detail">
                                    <button className="btn quantity-btn-detail" onClick={() => onDecreaseQuantity(product.id)}>
                                        {quantity === 1 ? <Trash size={20} /> : '-'}
                                    </button>
                                    <span className="quantity-display-detail">{quantity}</span>
                                    <button className="btn quantity-btn-detail" onClick={() => onIncreaseQuantity(product.id)}>
                                        <Plus size={24} />
                                    </button>
                                </div>
                            )}

                            <button className="btn btn-primary buy-now-btn w-100" disabled={!product.inStock}>
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;