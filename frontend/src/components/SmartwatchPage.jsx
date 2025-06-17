import React from 'react';

const SmartwatchPage = () => {
  return (
    <div>
      <h2>Smartwatch</h2>
      <div className="product-list">
        <div className="product-card">
          <h2 className="product-title">Apple Watch Series 9</h2>
          <img src={require('../assets/apple watch.png')} alt="Apple Watch Series 9" style={{maxWidth:'300px'}} />
          <div className="price">Precio: $2.199.000</div>
        </div>
      </div>
    </div>
  );
};

export default SmartwatchPage;
