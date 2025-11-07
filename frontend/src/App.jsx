import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Mainpage/header';
import Hero from './components/Mainpage/hero';
import ProductList from './components/Mainpage/products';
import Footer from './components/Mainpage/Footer';
import ProductDetailPage from './components/Mainpage/ProductDetailsPage';
import CartPage from './components/Mainpage/CartPage';
import AuthPage from './components/Auth/AuthPage';
import AdminDashboard from './components/Auth/AdminDashboard';
import ProfilePage from './components/Mainpage/ProfilePage'; // Import ProfilePage
import OrderPageHistory from './components/Mainpage/OrderPageHistory'; // Import OrderHistoryPage
import { products as initialProducts } from './components/Mainpage/ProductList.js';

const App = () => {
  const [cart, setCart] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState(initialProducts);

  // --- Mock user state for the profile page ---
  const [user, setUser] = useState({
      name: 'Amsyar G4703Q',
      email: 'amsyar.g@example.com',
      mobile: '123-456-7890',
      addresses: [
          { id: 1, type: 'Home', line1: '123 Main St', city: 'Anytown', state: 'CA', zip: '12345' }
      ]
  });

  const handleIncreaseQuantity = (productId) => setCart(p => ({ ...p, [productId]: (p[productId] || 0) + 1 }));
  const handleDecreaseQuantity = (productId) => {
    setCart(p => {
      const newQty = (p[productId] || 0) - 1;
      if (newQty <= 0) { const { [productId]: _, ...rest } = p; return rest; }
      return { ...p, [productId]: newQty };
    });
  };

  const handleLogout = () => {
      setIsLoggedIn(false);
      setIsAdmin(false);
  };
  
  const cartCount = Object.values(cart).reduce((sum, count) => sum + count, 0);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.smalldescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const Home = () => (
      <><Hero /><ProductList products={filteredProducts} cart={cart} onIncreaseQuantity={handleIncreaseQuantity} onDecreaseQuantity={handleDecreaseQuantity}/></>
  );

  return (
    <Router>
      <div className="App">
        <Header 
          cartCount={cartCount}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
          handleLogout={handleLogout}
        />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
            
            {/* Protected Routes */}
            <Route 
              path="/admin" 
              element={isLoggedIn && isAdmin ? <AdminDashboard products={products} setProducts={setProducts} /> : <Navigate to="/auth" />} 
            />
            <Route 
              path="/profile" 
              element={isLoggedIn ? <ProfilePage user={user} setUser={setUser} /> : <Navigate to="/auth" />}
            />
            <Route 
              path="/orders" 
              element={isLoggedIn ? <OrderPageHistory /> : <Navigate to="/auth" />}
            />

            {/* Public Routes */}
            <Route path="/product/:id" element={<ProductDetailPage cart={cart} onIncreaseQuantity={handleIncreaseQuantity} onDecreaseQuantity={handleDecreaseQuantity} />} />
            <Route path="/cart" element={<CartPage cart={cart} onIncreaseQuantity={handleIncreaseQuantity} onDecreaseQuantity={handleDecreaseQuantity} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;