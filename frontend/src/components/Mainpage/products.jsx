import React, { useState } from 'react';
import './products.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Plus, Trash } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

export const initialProducts = [
    {
        id: 1,
        name: 'Medi-Gel Ointment',
        price: '$19.99',
        description: 'Fast-acting relief for burns and skin irritations. A must-have for first aid.',
        image: '../assets/images/rapid up.png'
    },
    {
        id: 2,
        name: 'Digital Thermometer',
        price: '$24.99',
        description: 'High-precision digital thermometer with an easy-to-read LCD screen.',
        image: 'https://via.placeholder.com/300x200/1a1a1a/FFFFFF?text=Thermometer'
    },
    {
        id: 3,
        name: 'Sterile Gauze Pads',
        price: '$9.99',
        description: 'Pack of 50 sterile gauze pads for wound dressing and cleaning.',
        image: 'https://via.placeholder.com/300x200/E53935/000000?text=Gauze+Pads'
    },
    {
        id: 4,
        name: 'Blood Pressure Monitor',
        price: '$59.99',
        description: 'Monitor your blood pressure at home with clinical accuracy.',
        image: 'https://via.placeholder.com/300x200/1a1a1a/FFFFFF?text=BP+Monitor'
    },
    {
        id: 5,
        name: 'N95 Respirator Masks',
        price: '$29.99',
        description: 'Box of 20 N95 masks for protection against airborne particles.',
        image: 'https://via.placeholder.com/300x200/E53935/000000?text=N95+Masks'
    },
    {
        id: 6,
        name: 'Hand Sanitizer (1L)',
        price: '$15.99',
        description: 'Kills 99.9% of germs. Infused with aloe to keep hands soft.',
        image: 'https://via.placeholder.com/300x200/1a1a1a/FFFFFF?text=Sanitizer'
    },
    {
        id: 7,
        name: 'First Aid Kit - Pro',
        price: '$49.99',
        description: 'Comprehensive 150-piece first aid kit for home, office, or travel.',
        image: 'https://via.placeholder.com/300x200/E53935/000000?text=First+Aid+Kit'
    },
    {
        id: 8,
        name: 'Pulse Oximeter',
        price: '$34.99',
        description: 'Measures blood oxygen saturation (SpO2) and pulse rate quickly.',
        image: 'https://via.placeholder.com/300x200/1a1a1a/FFFFFF?text=Oximeter'
    },
    {
        id: 9,
        name: 'Vitamin D3 Supplements',
        price: '$12.99',
        description: '90-day supply of Vitamin D3 to support immune health and bone strength.',
        image: 'https://via.placeholder.com/300x200/E53935/000000?text=Vitamins'
    },
    {
        id: 10,
        name: 'Elastic Bandage Wrap',
        price: '$7.99',
        description: 'Set of 2 elastic bandages for supporting sprains and strains.',
        image: 'https://via.placeholder.com/300x200/1a1a1a/FFFFFF?text=Bandage'
    }
];

const ProductList = () => {
    const [cart, setCart] = useState({});
    const navigate = useNavigate();

    const handleCardClick = (id, e) => {
        if (e.target.closest('.quantity-btn') || e.target.closest('.add-to-cart-btn')) return;
        navigate(`/product/${id}`);
    };

    const handleIncreaseQuantity = (productId) => {
        setCart(prevCart => ({ ...prevCart, [productId]: (prevCart[productId] || 0) + 1 }));
    };

    const handleDecreaseQuantity = (productId) => {
        setCart(prevCart => {
            const newQuantity = (prevCart[productId] || 0) - 1;
            if (newQuantity <= 0) {
                const { [productId]: _, ...newCart } = prevCart;
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
                    {initialProducts.map((product) => { // Use the imported products array
                        const quantity = cart[product.id] || 0;
                        return (
                            <div
                                key={product.id}
                                className="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex align-items-stretch"
                            >
                                <div
                                    className="card product-card h-100"
                                    onClick={(e) => handleCardClick(product.id, e)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="product-image-container">
                                        <img src={product.image} className="card-img-top product-image" alt={product.name} />
                                    </div>
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{product.name}</h5>
                                        {/* Use fullDescription to match the new data structure */}
                                        <p className="card-text">{product.fullDescription}</p>
                                        <div className="price-tag mt-auto">{product.price}</div>
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
