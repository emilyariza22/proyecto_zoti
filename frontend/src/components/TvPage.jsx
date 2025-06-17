import React from 'react';

const TvPage = () => {
  return (
    <div>
      <h2>Tv</h2>
      <div className="product-list">
        <div className="product-card">
          <h2 className="product-title">TV Samsung 55" 4K UHD</h2>
          <img src={require('../assets/tv samsung.webp')} alt="TV Samsung 55 4K UHD" style={{maxWidth:'300px'}} />
          <div className="price">Precio: $2.499.000</div>
        </div>
      </div>
    </div>
  );
};

export default TvPage;
