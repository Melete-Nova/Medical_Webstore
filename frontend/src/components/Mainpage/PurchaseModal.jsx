import React, { useState } from 'react';
import './PurchaseModal.css';

const PurchaseModal = ({ user, items, subtotal, onClose, onConfirm }) => {
    // Default to the first address, or null if none exist
    const [selectedAddressId, setSelectedAddressId] = useState(user.addresses.length > 0 ? user.addresses[0].id : null);

    const handleConfirm = () => {
        if (!selectedAddressId) {
            alert('Please select a shipping address.');
            return;
        }
        onConfirm();
    };

    return (
        <div className="modal-overlay">
            <div className="purchase-modal-content">
                {/* --- Left Column: Shipping & Payment --- */}
                <div className="purchase-details-column">
                    <div className="modal-header">
                        <h2>Checkout</h2>
                        <button className="close-modal-btn" onClick={onClose}>&times;</button>
                    </div>
                    
                    <div className="purchase-body">
                        {/* Shipping Address Section */}
                        <div className="purchase-section">
                            <h3><i className="fas fa-map-marker-alt me-2"></i>Shipping Address</h3>
                            {user.addresses.map(addr => (
                                <div 
                                    key={addr.id} 
                                    className={`address-selection ${selectedAddressId === addr.id ? 'selected' : ''}`} 
                                    onClick={() => setSelectedAddressId(addr.id)}
                                >
                                    <span className="radio-icon"></span>
                                    <div>
                                        <strong>{addr.type}</strong>
                                        <p>{addr.line1}, {addr.city}, {addr.state}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Payment Method Section (Improved Mock) */}
                        <div className="purchase-section">
                            <h3><i className="fas fa-credit-card me-2"></i>Payment Method</h3>
                            <p className="text-muted">This is a demo. No real payment will be processed.</p>
                            <div className="payment-mock-selected">
                                <span>Credit / Debit Card</span>
                                <div className="card-icons">
                                    <i className="fab fa-cc-visa"></i>
                                    <i className="fab fa-cc-mastercard"></i>
                                    <i className="fab fa-cc-amex"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Right Column: Order Summary --- */}
                <div className="order-summary-column">
                    <h3>Order Summary</h3>
                    
                    {/* You can map over actual items here if available */}
                    {/* For now, using a summary line */}
                    <div className="summary-line">
                        <span>Items ({items.length})</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-line">
                        <span>Shipping</span>
                        <span className="text-success">FREE</span>
                    </div>

                    <div className="summary-divider"></div>

                    <div className="summary-line total">
                        <span>Total</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="modal-footer">
                        <button className="confirm-purchase-btn" onClick={handleConfirm}>
                            Confirm & Pay ${subtotal.toFixed(2)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseModal;