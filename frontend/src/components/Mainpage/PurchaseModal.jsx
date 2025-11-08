import React, { useState } from 'react';
import './PurchaseModal.css';

const PurchaseModal = ({ user, items, subtotal, onClose, onConfirm }) => {
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
                <div className="modal-header">
                    <h2>Complete Your Purchase</h2>
                    <button className="close-modal-btn" onClick={onClose}>&times;</button>
                </div>
                
                <div className="purchase-body">
                    {/* Shipping Address Section */}
                    <div className="purchase-section">
                        <h3>1. Shipping Address</h3>
                        {user.addresses.map(addr => (
                            <div key={addr.id} className={`address-selection ${selectedAddressId === addr.id ? 'selected' : ''}`} onClick={() => setSelectedAddressId(addr.id)}>
                                <input type="radio" name="address" checked={selectedAddressId === addr.id} readOnly/>
                                <div>
                                    <strong>{addr.type}</strong>: {addr.line1}, {addr.city}, {addr.state}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Payment Method Section (Mock) */}
                    <div className="purchase-section">
                        <h3>2. Payment Method</h3>
                        <p className="text-muted">Payment processing is mocked for this demo.</p>
                        <div className="payment-mock">Credit/Debit Card</div>
                    </div>

                    {/* Order Summary Section */}
                    <div className="purchase-section order-summary">
                        <h3>Order Summary</h3>
                        <div className="summary-line">
                            <span>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-line">
                            <span>Shipping:</span>
                            <span>FREE</span>
                        </div>
                        <div className="summary-line total">
                            <span>Total:</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="confirm-purchase-btn" onClick={handleConfirm}>
                        Confirm Purchase
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PurchaseModal;