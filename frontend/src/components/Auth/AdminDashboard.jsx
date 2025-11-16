import React, { useState } from 'react';
import './AdminDashboard.css';

// The component now receives 'onProductUpdate' instead of 'setProducts'
const AdminDashboard = ({ products, setProducts, onProductUpdate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '', price: '', smalldescription: '', fullDescription: '',
        image: null, imagePreview: null, rating: 0, reviews: 0, inStock: true, category: ''
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewProduct({ ...newProduct, [name]: type === 'checkbox' ? checked : value });
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (newProduct.imagePreview) URL.revokeObjectURL(newProduct.imagePreview);
            setNewProduct(prev => ({ ...prev, image: file, imagePreview: URL.createObjectURL(file) }));
        }
    };
    
    const handleAddProduct = (e) => {
        e.preventDefault();
        setProducts(prev => [...prev, { ...newProduct, id: Date.now(), image: newProduct.imagePreview }]);
        setIsModalOpen(false);
        setNewProduct({
            name: '', price: '', smalldescription: '', fullDescription: '',
            image: null, imagePreview: null, rating: 0, reviews: 0, inStock: true, category: ''
        });
    };

    // This function now calls the new handler from props
    const handleProductAction = (productId, action) => {
        onProductUpdate(productId, action);
    };

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <button className="add-product-btn" onClick={() => setIsModalOpen(true)}>
                    <i className="fas fa-plus-circle me-2"></i>
                    <span>Add New Product</span>
                </button>
            </div>

            <div className="product-table-container">
                <h2>Current Products</h2>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.price}</td>
                                <td>
                                    <select
                                        className="form-select"
                                        value={product.inStock ? 'in-stock' : 'out-of-stock'}
                                        onChange={(e) => handleProductAction(product.id, e.target.value)}
                                    >
                                        <option value="in-stock">In Stock</option>
                                        <option value="out-of-stock">Out of Stock</option>
                                        <option value="delete" style={{ color: 'red' }}>Delete Product</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                 <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Add New Product</h2>
                        <form onSubmit={handleAddProduct} className="add-product-form">
                            <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleInputChange} required />
                            <input type="text" name="category" placeholder="Product Category" value={newProduct.category} onChange={handleInputChange} required />
                            <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleInputChange} required />
                            <textarea name="smalldescription" placeholder="Short Description" value={newProduct.smalldescription} onChange={handleInputChange} required />
                            <textarea name="fullDescription" placeholder="Full Description" value={newProduct.fullDescription} onChange={handleInputChange} required />
                            
                            <label htmlFor="image-upload">Product Image</label>
                            <input id="image-upload" type="file" onChange={handleImageChange} accept="image/*" required />
                            {newProduct.imagePreview && <img src={newProduct.imagePreview} alt="Preview" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
                            
                            <div className="form-actions">
                                <button type="submit" className="btn-submit">Add Product</button>
                                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;