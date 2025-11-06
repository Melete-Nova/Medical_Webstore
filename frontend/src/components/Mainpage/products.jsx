import React from 'react';
import './products.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Plus, Trash } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ products, cart, onIncreaseQuantity, onDecreaseQuantity }) => {
    const navigate = useNavigate();

    const handleCardClick = (id) => {
        navigate(`/product/${id}`);
    };

    // --- These handlers now stop the event from bubbling up ---
    const handleIncrease = (e, id) => {
        e.stopPropagation(); // Stop the click from reaching the card's onClick
        onIncreaseQuantity(id);
    };

    const handleDecrease = (e, id) => {
        e.stopPropagation(); // Stop the click from reaching the card's onClick
        onDecreaseQuantity(id);
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
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">{product.smalldescription}</p>
                                        
                                        <div className="product-footer">
                                            <div className="price-tag">{product.price}</div>
                                            <div className="cart-controls">
                                                {quantity === 0 ? (
                                                    <button className="btn add-to-cart-btn" onClick={(e) => handleIncrease(e, product.id)}>
                                                        Add to Cart
                                                    </button>
                                                ) : (
                                                    <div className="quantity-controller">
                                                        <button className="btn quantity-btn" onClick={(e) => handleDecrease(e, product.id)}>
                                                            {quantity === 1 ? <Trash size={16} /> : '-'}
                                                        </button>
                                                        <span className="quantity-display">{quantity}</span>
                                                        <button className="btn quantity-btn" onClick={(e) => handleIncrease(e, product.id)}>
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