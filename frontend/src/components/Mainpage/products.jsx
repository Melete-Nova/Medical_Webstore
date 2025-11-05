import React from 'react';
import './products.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Plus, Trash } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { products } from './ProductList.js';

const ProductList = ({ cart, onIncreaseQuantity, onDecreaseQuantity }) => {
    const navigate = useNavigate();

    const handleCardClick = (id, e) => {
        if (e.target.closest('.quantity-btn') || e.target.closest('.add-to-cart-btn')) return;
        navigate(`/product/${id}`);
    };

    return (
        <div className="product-list-section py-5">
            <div className="container">
                <h2 className="text-center mb-5 section-title">Featured Products</h2>
                <div className="row">
                    {products.map((product) => {
                        const quantity = cart[product.id] || 0;
                        return (
                            <div
                                key={product.id}
                                className="col-lg-3 col-md-4 col-sm-6 mb-4"
                            >
                                <div
                                    className="card product-card h-100"
                                    onClick={(e) => handleCardClick(product.id, e)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="product-image-container">
                                        <img src={product.image} className="card-img-top product-image" alt={product.name} />
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">{product.smalldescription}</p>
                                        
                                        {/* This new div pushes the price and button to the bottom */}
                                        <div className="product-footer">
                                            <div className="price-tag">{product.price}</div>
                                            <div className="cart-controls">
                                                {quantity === 0 ? (
                                                    <button className="btn add-to-cart-btn" onClick={() => onIncreaseQuantity(product.id)}>
                                                        Add to Cart
                                                    </button>
                                                ) : (
                                                    <div className="quantity-controller">
                                                        <button className="btn quantity-btn" onClick={() => onDecreaseQuantity(product.id)}>
                                                            {quantity === 1 ? <Trash size={16} /> : '-'}
                                                        </button>
                                                        <span className="quantity-display">{quantity}</span>
                                                        <button className="btn quantity-btn" onClick={() => onIncreaseQuantity(product.id)}>
                                                            <Plus size={20} />
                                                        </button>
                                                    </div>
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