import React, { useState } from 'react';
import './ProfilePage.css';
import { PencilSquare, Trash, PlusCircle } from 'react-bootstrap-icons';

const ProfilePage = ({ user, setUser }) => {
    const [editingField, setEditingField] = useState(null);
    const [tempValue, setTempValue] = useState('');
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [newAddress, setNewAddress] = useState({ type: 'Home', line1: '', city: '', state: '', zip: '' });
    const [editingAddressId, setEditingAddressId] = useState(null);

    const handleEdit = (field, currentValue) => {
        setEditingField(field);
        setTempValue(currentValue);
    };

    const handleSave = () => {
        setUser({ ...user, [editingField]: tempValue });
        setEditingField(null);
    };

    const handleAddressChange = (e) => {
        setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    };

    const handleSaveNewAddress = () => {
        const addressToAdd = { ...newAddress, id: Date.now() };
        setUser({ ...user, addresses: [...user.addresses, addressToAdd] });
        setIsAddingAddress(false);
        setNewAddress({ type: 'Home', line1: '', city: '', state: '', zip: '' });
    };

    const handleDeleteAddress = (addressId) => {
        const updatedAddresses = user.addresses.filter(addr => addr.id !== addressId);
        setUser({ ...user, addresses: updatedAddresses });
    };

    return (
        // This wrapper applies the dark background to the page
        <div className="profile-page-body">
            <div className="profile-container container">
                <h1 className="profile-header">My Profile</h1>

                <div className="profile-section">
                    <h2>Personal Details</h2>
                    <div className="detail-item">
                        <span className="detail-label">Name:</span>
                        {editingField === 'name' ? (
                            <div className="edit-mode">
                                <input type="text" value={tempValue} onChange={(e) => setTempValue(e.target.value)} />
                                <button onClick={handleSave}>Save</button>
                                <button className="cancel" onClick={() => setEditingField(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div className="display-mode">
                                <span>{user.name}</span>
                                <PencilSquare className="edit-icon" onClick={() => handleEdit('name', user.name)} />
                            </div>
                        )}
                    </div>
                    {/* Add more fields here (email, mobile) following the same pattern */}
                </div>

                <div className="profile-section">
                    <h2>My Addresses</h2>
                    {user.addresses.map(addr => (
                        <div key={addr.id} className="address-card">
                            <h5>{addr.type}</h5>
                            <p>{addr.line1}, {addr.city}, {addr.state} - {addr.zip}</p>
                            <div className="address-actions">
                                <button className="edit-address">Edit</button>
                                <button className="delete-address" onClick={() => handleDeleteAddress(addr.id)}><Trash /></button>
                            </div>
                        </div>
                    ))}
                    {isAddingAddress ? (
                        <div className="add-address-form">
                            <input name="line1" placeholder="Address Line 1" value={newAddress.line1} onChange={handleAddressChange} />
                            <input name="city" placeholder="City" value={newAddress.city} onChange={handleAddressChange} />
                            <input name="state" placeholder="State" value={newAddress.state} onChange={handleAddressChange} />
                            <input name="zip" placeholder="ZIP Code" value={newAddress.zip} onChange={handleAddressChange} />
                            <button onClick={handleSaveNewAddress}>Save Address</button>
                            <button className="cancel" onClick={() => setIsAddingAddress(false)}>Cancel</button>
                        </div>
                    ) : (
                        <button className="add-address-btn" onClick={() => setIsAddingAddress(true)}>
                            <PlusCircle /> Add New Address
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;