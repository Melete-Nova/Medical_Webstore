import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Mainpage/header';
import Hero from './components/Mainpage/hero';
import ProductList from './components/Mainpage/products';
import Footer from './components/Mainpage/Footer';
import ProductDetailPage from './components/Mainpage/ProductDetailsPage'; // Import the new page

const Home = () => (
    <>
        <Hero />
        <ProductList />
    </>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;