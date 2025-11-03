// import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Mainpage/header";
import Hero from "./components/Mainpage/hero";
import ProductList from "./components/Mainpage/products";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const hostname = window.location.hostname;
  let subdomain = null;
  const parts = hostname.split(".");
  if (parts.length > 2) subdomain = parts[0];

  return (
    <div className="App">
      <Header />
      <Hero />
      <ProductList /> {/* Add the ProductList component here */}
      {/* You can add a footer or other sections below */}
    </div>
  );
}

export default App;