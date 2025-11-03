import React, { useState } from 'react';
import './products.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Plus, Trash } from 'react-bootstrap-icons';

// Sample data for 10 products
const initialProducts = [
    {
        id: 1,
        name: 'Medi-Gel Ointmentk',
        price: '$19.99',
        description: 'Fast-acting relief for burns and skin irritations. A must-have for first aid.',
        image: 'data:image/jpeg;base64,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' 
    },
    // ... (other products remain the same)
    {
        id: 2,
        name: 'Digital Thermometer',
        price: '$24.99',
        description: 'High-precision digital thermometer with an easy-to-read LCD screen.',
        image: 'https://via.placeholder.com/150x150/1a1a1a/FFFFFF?text=Thermometer'
    },
    {
        id: 3,
        name: 'Sterile Gauze Pads',
        price: '$9.99',
        description: 'Pack of 50 sterile gauze pads for wound dressing and cleaning.',
        image: 'https://via.placeholder.com/150x150/E53935/000000?text=Gauze+Pads'
    },
    {
        id: 4,
        name: 'Blood Pressure Monitor',
        price: '$59.99',
        description: 'Monitor your blood pressure at home with clinical accuracy.',
        image: 'https://via.placeholder.com/150x150/1a1a1a/FFFFFF?text=BP+Monitor'
    },
    {
        id: 5,
        name: 'N95 Respirator Masks',
        price: '$29.99',
        description: 'Box of 20 N95 masks for protection against airborne particles.',
        image: 'https://via.placeholder.com/150x150/E53935/000000?text=N95+Masks'
    },
    {
        id: 6,
        name: 'Hand Sanitizer (1L)',
        price: '$15.99',
        description: 'Kills 99.9% of germs. Infused with aloe to keep hands soft.',
        image: 'https://via.placeholder.com/150x150/1a1a1a/FFFFFF?text=Sanitizer'
    },
    {
        id: 7,
        name: 'First Aid Kit - Pro',
        price: '$49.99',
        description: 'Comprehensive 150-piece first aid kit for home, office, or travel.',
        image: 'https://via.placeholder.com/150x150/E53935/000000?text=First+Aid+Kit'
    },
    {
        id: 8,
        name: 'Pulse Oximeter',
        price: '$34.99',
        description: 'Measures blood oxygen saturation (SpO2) and pulse rate quickly.',
        image: 'https://via.placeholder.com/150x150/1a1a1a/FFFFFF?text=Oximeter'
    },
    {
        id: 9,
        name: 'Vitamin D3 Supplements',
        price: '$12.99',
        description: '90-day supply of Vitamin D3 to support immune health and bone strength.',
        image: 'https://via.placeholder.com/150x150/E53935/000000?text=Vitamins'
    },
    {
        id: 10,
        name: 'Elastic Bandage Wrap',
        price: '$7.99',
        description: 'Set of 2 elastic bandages for supporting sprains and strains.',
        image: 'https://via.placeholder.com/150x150/1a1a1a/FFFFFF?text=Bandage'
    }
];

const ProductList = () => {
    const [cart, setCart] = useState({});

    const handleIncreaseQuantity = (productId) => {
        setCart(prevCart => ({
            ...prevCart,
            [productId]: (prevCart[productId] || 0) + 1
        }));
    };

    const handleDecreaseQuantity = (productId) => {
        setCart(prevCart => {
            const newQuantity = (prevCart[productId] || 0) - 1;
            if (newQuantity <= 0) {
                const newCart = { ...prevCart };
                delete newCart[productId];
                return newCart;
            } else {
                return { ...prevCart, [productId]: newQuantity };
            }
        });
    };

    return (
        <div className="product-list-section py-5">
            <div className="container">
                <h2 className="text-center mb-5 section-title">Featured Products</h2>
                <div className="row">
                    {initialProducts.map((product) => {
                        const quantity = cart[product.id] || 0;
                        return (
                            <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                                <div className="card product-card">
                                    <div className="product-image-container">
                                        <img src={product.image} className="product-image" alt={product.name} />
                                    </div>
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">{product.description}</p>
                                        <div className="price-tag">{product.price}</div>
                                        
                                        <div className="cart-controls">
                                            {quantity === 0 ? (
                                                <button className="btn add-to-cart-btn" onClick={() => handleIncreaseQuantity(product.id)}>
                                                    Add to Cart
                                                </button>
                                            ) : (
                                                <div className="quantity-controller">
                                                    <button className="btn quantity-btn" onClick={() => handleDecreaseQuantity(product.id)}>
                                                        {quantity === 1 ? <Trash size={16} /> : '-'}
                                                    </button>
                                                    <span className="quantity-display">{quantity}</span>
                                                    <button className="btn quantity-btn" onClick={() => handleIncreaseQuantity(product.id)}>
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
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

export default ProductList;