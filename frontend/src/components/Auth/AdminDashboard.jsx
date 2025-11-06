import React, { useState } from 'react';
import { PlusCircleFill } from 'react-bootstrap-icons';
import './AdminDashboard.css';

// This component receives the product list and a function to update it
const AdminDashboard = ({ products, setProducts }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        id: Date.now(), // Simple unique ID
        name: '',
        price: '',
        smalldescription: '',
        fullDescription: '',
        image: '',
        rating: 0,
        reviews: 0,
        inStock: true,
        category: ''
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        // Add the new product to the list in the parent component
        setProducts(prevProducts => [...prevProducts, { ...newProduct, id: Date.now() }]);
        setIsModalOpen(false); // Close modal
        // Reset form
        setNewProduct({
            id: Date.now(), name: '', price: '', smalldescription: '', fullDescription: '',
            image: '', rating: 0, reviews: 0, inStock: true, category: ''
        });
    };

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <button className="add-product-btn" onClick={() => setIsModalOpen(true)}>
                    <PlusCircleFill size={20} />
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
                            <th>Stock</th>
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
                                    <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Product Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Add a New Product</h2>
                            <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleAddProduct} className="add-product-form">
                            <input name="name" value={newProduct.name} onChange={handleInputChange} placeholder="Product Name" required />
                            <input name="category" value={newProduct.category} onChange={handleInputChange} placeholder="Category" required />
                            <input name="price" value={newProduct.price} onChange={handleInputChange} placeholder="Price (e.g., $19.99)" required />
                            <input name="smalldescription" value={newProduct.smalldescription} onChange={handleInputChange} placeholder="Short Description" required />
                            <textarea name="fullDescription" value={newProduct.fullDescription} onChange={handleInputChange} placeholder="Full Description" required />
                            <input name="image" value={newProduct.image} onChange={handleInputChange} placeholder="Image Path (e.g., ../assets/images/product.png)" required />
                            <label className="checkbox-label">
                                <input type="checkbox" name="inStock" checked={newProduct.inStock} onChange={handleInputChange} />
                                In Stock
                            </label>
                            <button type="submit">Add Product</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;