import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Mainpage/header';
import Hero from './components/Mainpage/hero';
import ProductList from './components/Mainpage/products';
import Footer from './components/Mainpage/Footer';
import ProductDetailPage from './components/Mainpage/ProductDetailsPage';
import CartPage from './components/Mainpage/CartPage';
import WishlistPage from './components/Mainpage/WishlistPage';
import AuthPage from './components/Auth/AuthPage';
import AdminDashboard from './components/Auth/AdminDashboard';
import ProfilePage from './components/Mainpage/ProfilePage';
import OrderPageHistory from './components/Mainpage/OrderPageHistory';
import PurchaseModal from './components/Mainpage/PurchaseModal';
import { products as initialProducts } from './components/Mainpage/ProductList.js';

const AppContent = () => {
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState(initialProducts);

  const [user, setUser] = useState({
      name: 'Amsyar G4703Q', email: 'amsyar.g@example.com', mobile: '123-456-7890',
      addresses: [{ id: 1, type: 'Home', line1: '123 Main St', city: 'Anytown', state: 'CA', zip: '12345' }]
  });
  
  const [isPurchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [purchaseSubtotal, setPurchaseSubtotal] = useState(0);

  const navigate = useNavigate();

  const isProfileComplete = (currentUser) => {
    return currentUser.name && currentUser.email && currentUser.mobile && currentUser.addresses.length > 0;
  };

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
      setCart({});
  };
  
  const handleIncreaseQuantity = (productId) => setCart(p => ({ ...p, [productId]: (p[productId] || 0) + 1 }));
  const handleDecreaseQuantity = (productId) => {
    setCart(p => {
      const newQty = (p[productId] || 0) - 1;
      if (newQty <= 0) { const { [productId]: _, ...rest } = p; return rest; }
      return { ...p, [productId]: newQty };
    });
  };

  const handleAddToWishlist = (productId) => {
      if (!isLoggedIn) {
          alert("Please sign in to add items to your wishlist.");
          navigate('/auth');
          return;
      }
      if (!wishlist.includes(productId)) {
          setWishlist(prevWishlist => [...prevWishlist, productId]);
      }
  };

  const handleRemoveFromWishlist = (productId) => {
      setWishlist(prevWishlist => prevWishlist.filter(id => id !== productId));
  };
  
  const handleLogout = () => {
      setIsLoggedIn(false);
      setIsAdmin(false);
      setCart({});
      setWishlist([]);
  };
  
  const cartCount = Object.values(cart).reduce((sum, count) => sum + count, 0);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (product.smalldescription && product.smalldescription.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const Home = () => (
      <><Hero /><ProductList products={filteredProducts} cart={cart} wishlist={wishlist} onIncreaseQuantity={handleIncreaseQuantity} onDecreaseQuantity={handleDecreaseQuantity} onAddToWishlist={handleAddToWishlist} /></>
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
          cartCount={cartCount}
          wishlistCount={wishlist.length}
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
            
            <Route path="/admin" element={isLoggedIn && isAdmin ? <AdminDashboard products={products} setProducts={setProducts} /> : <Navigate to="/auth" />} />
            <Route path="/profile" element={isLoggedIn ? <ProfilePage user={user} setUser={setUser} /> : <Navigate to="/auth" />} />
            <Route path="/orders" element={isLoggedIn ? <OrderPageHistory /> : <Navigate to="/auth" />} />
            <Route 
                path="/wishlist" 
                element={isLoggedIn ? <WishlistPage wishlist={wishlist} products={products} onRemoveFromWishlist={handleRemoveFromWishlist} /> : <Navigate to="/auth" />} 
            />
            
            {/* --- THIS IS THE CORRECTED ROUTE --- */}
            <Route 
                path="/product/:id" 
                element={
                    <ProductDetailPage 
                        cart={cart}
                        wishlist={wishlist}
                        onIncreaseQuantity={handleIncreaseQuantity}
                        handleBuyNow={handleBuyNow}
                        onAddToWishlist={handleAddToWishlist}
                    />
                } 
            />

            <Route path="/cart" element={<CartPage cart={cart} onIncreaseQuantity={handleIncreaseQuantity} onDecreaseQuantity={handleDecreaseQuantity} handleBuyNow={handleBuyNow} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;