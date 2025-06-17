import React from 'react';
import { ProductDetailCard4, ProductDetailCard5 } from './ProductCard';

const CelularesPage = () => {
  return (
    <div>
      <h2>Celulares</h2>
      <div className="product-list">
        <ProductDetailCard4 />
        <div style={{ height: '2rem' }} />
        <ProductDetailCard5 />
      </div>
    </div>
  );
};

export default CelularesPage;
