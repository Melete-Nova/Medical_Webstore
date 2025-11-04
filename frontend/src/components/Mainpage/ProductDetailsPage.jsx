import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { initialProducts as products } from './products'; // Import data from your new file
import './ProductDetailsPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDetailPage = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return <div className="container my-5"><h2>Product not found!</h2></div>;
    }

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
                                <p className="text-success">In Stock</p>
                            ) : (
                                <p className="text-danger">Out of Stock</p>
                            )}
                            <button className="btn btn-warning w-100 mb-2">Add to Cart</button>
                            <button className="btn btn-primary w-100">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;