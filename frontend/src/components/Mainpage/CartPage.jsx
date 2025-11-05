import React from 'react';
import { Link } from 'react-router-dom';
import { products } from './ProductList.js';
import { Plus, Trash } from 'react-bootstrap-icons';
import './CartPage.css';

const CartPage = ({ cart, onIncreaseQuantity, onDecreaseQuantity }) => {
    // Get full product details for items in the cart
    const cartItems = Object.keys(cart).map(id => {
        const product = products.find(p => p.id === parseInt(id));
        return {
            ...product,
            quantity: cart[id],
        };
    });

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Calculate the subtotal
    const subtotal = cartItems.reduce((total, item) => {
        // Convert price string (e.g., "$19.99") to a number
        const price = parseFloat(item.price.replace('$', ''));
        return total + (price * item.quantity);
    }, 0);

    if (cartItems.length === 0) {
        return (
            <div className="container my-5 text-center">
                <h2>Your Shopping Cart is Empty</h2>
                <p className="text-muted">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/" className="btn btn-primary mt-3">Continue Shopping</Link>
            </div>
        );
    }

    return (
        <div className="cart-page-container container my-5">
            <div className="row">
                {/* Cart Items Column */}
                <div className="col-lg-8">
                    <div className="cart-items-card">
                        <h1 className="mb-4">Shopping Cart</h1>
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h5 className="cart-item-title">{item.name}</h5>
                                    <p className="text-muted">{item.smalldescription}</p>
                                    <p className={`fw-bold ${item.inStock ? 'text-success' : 'text-danger'}`}>
                                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                                    </p>
                                    <div className="quantity-controller-cart">
                                        <button className="btn quantity-btn-cart" onClick={() => onDecreaseQuantity(item.id)}>
                                            {item.quantity === 1 ? <Trash size={16} /> : '-'}
                                        </button>
                                        <span className="quantity-display-cart">{item.quantity}</span>
                                        <button className="btn quantity-btn-cart" onClick={() => onIncreaseQuantity(item.id)}>
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div className="cart-item-price">
                                    <h5>{item.price}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Subtotal Column */}
                <div className="col-lg-4">
                    <div className="subtotal-card">
                        <h4>Subtotal ({totalItems} items):</h4>
                        <h2 className="subtotal-amount">${subtotal.toFixed(2)}</h2>
                        <p className="text-success small">
                            <i className="bi bi-check-circle-fill"></i> Your order qualifies for FREE delivery.
                        </p>
                        <button className="btn btn-warning w-100 proceed-btn">Proceed to Buy</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;