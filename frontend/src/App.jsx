import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Mainpage/header';
import Hero from './components/Mainpage/hero';
import ProductList from './components/Mainpage/products';
import Footer from './components/Mainpage/Footer';
import ProductDetailPage from './components/Mainpage/ProductDetailsPage';

const App = () => {
  const [cart, setCart] = useState({});

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
  
  const cartCount = Object.values(cart).reduce((total, count) => total + count, 0);

  const Home = () => (
      <>
          <Hero />
          <ProductList 
            cart={cart}
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
          />
      </>
  );

  return (
    <Router>
      <div className="App">
        <Header cartCount={cartCount} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* --- Pass cart state and handlers to the details page --- */}
            <Route 
              path="/product/:id" 
              element={
                <ProductDetailPage 
                  cart={cart}
                  onIncreaseQuantity={handleIncreaseQuantity}
                  onDecreaseQuantity={handleDecreaseQuantity}
                />
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;