import React from 'react';
import Hero from './hero';
import ProductList from './products';

const HomePage = ({
  products,
  cart,
  wishlist,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onAddToWishlist,
}) => {
  return (
    <>
      <Hero />
      <ProductList
        products={products}
        cart={cart}
        wishlist={wishlist}
        onIncreaseQuantity={onIncreaseQuantity}
        onDecreaseQuantity={onDecreaseQuantity}
        onAddToWishlist={onAddToWishlist}
      />
    </>
  );
};

export default React.memo(HomePage);
