import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Mainpage/header';
import Hero from './components/Mainpage/hero';
import ProductList from './components/Mainpage/products';
import Footer from './components/Mainpage/Footer';
import ProductDetailPage from './components/Mainpage/ProductDetailsPage';
import CartPage from './components/Mainpage/CartPage';
import AuthPage from './components/Auth/AuthPage';
import AdminDashboard from './components/Auth/AdminDashboard';
import ProfilePage from './components/Mainpage/ProfilePage';
import OrderPageHistory from './components/Mainpage/OrderPageHistory';
import PurchaseModal from './components/Mainpage/PurchaseModal'; // Import the modal
import { products as initialProducts } from './components/Mainpage/ProductList.js';

// App component needs to be a child of Router to use hooks
const AppContent = () => {
  const [cart, setCart] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState(initialProducts);

  const [user, setUser] = useState({
      name: 'Amsyar G4703Q', email: 'amsyar.g@example.com', mobile: '123-456-7890',
      addresses: [{ id: 1, type: 'Home', line1: '123 Main St', city: 'Anytown', state: 'CA', zip: '12345' }]
  });
  
  // --- State for Purchase Modal ---
  const [isPurchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [purchaseSubtotal, setPurchaseSubtotal] = useState(0);

  const navigate = useNavigate(); // Hook for navigation

  const isProfileComplete = (currentUser) => {
    return currentUser.name && currentUser.email && currentUser.mobile && currentUser.addresses.length > 0;
  };

  // --- Re-adding the handleBuyNow function ---
  const handleBuyNow = (items, subtotal) => {
    if (!isLoggedIn) {
        alert("Please sign in to proceed with your purchase.");
        navigate('/auth');
        return;
    }
    if (!isProfileComplete(user)) {
        alert("Please complete your profile (name, email, mobile, and at least one address) before purchasing.");
        navigate('/profile');
        return;
    }
    setPurchaseItems(items);
    setPurchaseSubtotal(subtotal);
    setPurchaseModalOpen(true);
  };

  const handleConfirmPurchase = () => {
      alert("Purchase confirmed! Thank you for your order.");
      setPurchaseModalOpen(false);
      setCart({}); // Empty the cart after purchase
  };
  
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
                          (product.smalldescription && product.smalldescription.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const Home = () => (
      <><Hero /><ProductList products={filteredProducts} cart={cart} onIncreaseQuantity={handleIncreaseQuantity} onDecreaseQuantity={handleDecreaseQuantity}/></>
  );

  return (
    <>
      {isPurchaseModalOpen && (
          <PurchaseModal 
              user={user} 
              items={purchaseItems}
              subtotal={purchaseSubtotal}
              onClose={() => setPurchaseModalOpen(false)}
              onConfirm={handleConfirmPurchase}
          />
      )}
      <div className="App">
        <Header 
          cartCount={cartCount} onSearchChange={setSearchTerm} onCategoryChange={setSelectedCategory}
          isLoggedIn={isLoggedIn} isAdmin={isAdmin} handleLogout={handleLogout}
        />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
            
            <Route path="/admin" element={isLoggedIn && isAdmin ? <AdminDashboard products={products} setProducts={setProducts} /> : <Navigate to="/auth" />} />
            <Route path="/profile" element={isLoggedIn ? <ProfilePage user={user} setUser={setUser} /> : <Navigate to="/auth" />} />
            <Route path="/orders" element={isLoggedIn ? <OrderPageHistory /> : <Navigate to="/auth" />} />

            <Route path="/product/:id" element={<ProductDetailPage cart={cart} onIncreaseQuantity={handleIncreaseQuantity} onDecreaseQuantity={handleDecreaseQuantity} handleBuyNow={handleBuyNow} />} />
            <Route path="/cart" element={<CartPage cart={cart} onIncreaseQuantity={handleIncreaseQuantity} onDecreaseQuantity={handleDecreaseQuantity} handleBuyNow={handleBuyNow} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

// Wrapper component to provide Router context
const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;