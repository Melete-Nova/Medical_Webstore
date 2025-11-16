import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Mainpage/header';
import Footer from './components/Mainpage/Footer';
import ProductDetailPage from './components/Mainpage/ProductDetailsPage';
import CartPage from './components/Mainpage/CartPage';
import WishlistPage from './components/Mainpage/WishlistPage';
import AuthPage from './components/Auth/AuthPage';
import AdminDashboard from './components/Auth/AdminDashboard';
import ProfilePage from './components/Mainpage/ProfilePage';
import OrderPageHistory from './components/Mainpage/OrderPageHistory';
import PurchaseModal from './components/Mainpage/PurchaseModal';
import HomePage from './components/Mainpage/HomePage';
import { products as initialProducts } from './components/Mainpage/ProductList.js';
import ScrollToTop from './components/Mainpage/ScrollToTop.js';

const ScrollFix = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState(initialProducts);

  const [user, setUser] = useState({
    name: 'Amsyar G4703Q',
    email: 'amsyar.g@example.com',
    mobile: '123-456-7890',
    addresses: [{ id: 1, type: 'Home', line1: '123 Main St', city: 'Anytown', state: 'CA', zip: '12345' }]
  });

  const [isPurchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [purchaseSubtotal, setPurchaseSubtotal] = useState(0);

  const navigate = useNavigate();

  const isProfileComplete = (currentUser) =>
    currentUser.name && currentUser.email && currentUser.mobile && currentUser.addresses.length > 0;

  const handleBuyNow = (items, subtotal) => {
    if (!isLoggedIn) {
      alert("Please sign in to proceed with your purchase.");
      navigate('/auth');
      return;
    }
    if (!isProfileComplete(user)) {
      alert("Please complete your profile before purchasing.");
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

  const handleIncreaseQuantity = (productId) =>
    setCart((p) => ({ ...p, [productId]: (p[productId] || 0) + 1 }));

  const handleDecreaseQuantity = (productId) => {
    setCart((p) => {
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
      setWishlist((prev) => [...prev, productId]);
    }
  };

  const handleRemoveFromWishlist = (productId) =>
    setWishlist((prev) => prev.filter((id) => id !== productId));

  // ✅ --- START: NEW PRODUCT UPDATE LOGIC ---
  const handleProductUpdate = (productId, action) => {
    const productToUpdate = products.find(p => p.id === productId);
    if (!productToUpdate) return;

    if (action === 'delete') {
      if (window.confirm(`Are you sure you want to delete ${productToUpdate.name}? This cannot be undone.`)) {
        setProducts(prev => prev.filter(p => p.id !== productId));
        setCart(prev => {
            const { [productId]: _, ...rest } = prev;
            return rest;
        });
        setWishlist(prev => prev.filter(id => id !== productId));
      }
      return;
    }

    const newStockStatus = action === 'in-stock';
    if (newStockStatus === false && cart[productId]) {
      const { [productId]: _, ...restOfCart } = cart;
      setCart(restOfCart);
      if (!wishlist.includes(productId)) {
        setWishlist(prev => [...prev, productId]);
      }
      alert(`${productToUpdate.name} is now out of stock. It has been removed from your cart and added to your wishlist.`);
    }

    setProducts(prev => prev.map(p => p.id === productId ? { ...p, inStock: newStockStatus } : p));
  };
  // ✅ --- END: NEW PRODUCT UPDATE LOGIC ---

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCart({});
    setWishlist([]);
  };

  const cartCount = Object.values(cart).reduce((sum, count) => sum + count, 0);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.smalldescription && product.smalldescription.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <ScrollToTop />
      {isPurchaseModalOpen && (
        <PurchaseModal user={user} items={purchaseItems} subtotal={purchaseSubtotal} onClose={() => setPurchaseModalOpen(false)} onConfirm={handleConfirmPurchase} />
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
            <Route path="/" element={ <HomePage products={filteredProducts} cart={cart} wishlist={wishlist} onIncreaseQuantity={handleIncreaseQuantity} onDecreaseQuantity={handleDecreaseQuantity} onAddToWishlist={handleAddToWishlist} /> } />
            <Route path="/auth" element={<AuthPage setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />

            {/* ✅ UPDATED: Passing the new handler to AdminDashboard */}
            <Route
              path="/admin"
              element={
                isLoggedIn && isAdmin ? (
                  <AdminDashboard
                    products={products}
                    setProducts={setProducts} // For adding new products
                    onProductUpdate={handleProductUpdate} // For updating/deleting existing ones
                  />
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />

            <Route path="/profile" element={isLoggedIn ? <ProfilePage user={user} setUser={setUser} /> : <Navigate to="/auth" />} />
            <Route path="/orders" element={isLoggedIn ? <OrderPageHistory /> : <Navigate to="/auth" />} />
            <Route path="/wishlist" element={ isLoggedIn ? ( <WishlistPage wishlist={wishlist} products={products} onRemoveFromWishlist={handleRemoveFromWishlist} /> ) : ( <Navigate to="/auth" /> ) } />
            <Route path="/product/:id" element={ <ProductDetailPage cart={cart} wishlist={wishlist} onIncreaseQuantity={handleIncreaseQuantity} handleBuyNow={handleBuyNow} onAddToWishlist={handleAddToWishlist} /> } />
            <Route path="/cart" element={ <CartPage cart={cart} onIncreaseQuantity={handleIncreaseQuantity} onDecreaseQuantity={handleDecreaseQuantity} handleBuyNow={handleBuyNow} /> } />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
};

const App = () => (
  <Router>
    <ScrollFix />
    <AppContent />
  </Router>
);

export default App;