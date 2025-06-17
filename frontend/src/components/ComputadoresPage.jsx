import React from 'react';
import { ProductDetailCard, ProductDetailCard3 } from './ProductCard';

const ComputadoresPage = () => {
  return (
    <div>
      <h2>Computadores</h2>
      <div className="product-list">
        <ProductDetailCard />
        <div style={{ height: '2rem' }} />
        <ProductDetailCard3 />
      </div>
    </div>
  );
};

export default ComputadoresPage;
