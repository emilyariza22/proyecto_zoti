import React from 'react';

const ImpresorasPage = () => {
  return (
    <div>
      <h2>Impresoras</h2>
      <div className="product-list">
        <div className="product-card">
          <h2 className="product-title">Impresora Multifuncional HP</h2>
          <img src={require('../assets/impresora.png')} alt="Impresora Multifuncional HP" style={{maxWidth:'300px'}} />
          <div className="price">Precio: $499.000</div>
        </div>
      </div>
    </div>
  );
};

export default ImpresorasPage;
