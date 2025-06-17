import React from 'react';

const MonitoresPage = () => {
  return (
    <div>
      <h2>Monitores</h2>
      <div className="product-list">
        <div className="product-card">
          <h2 className="product-title">Monitor Samsung Odyssey</h2>
          <img src={require('../assets/monitor odyssey.webp')} alt="Monitor Samsung Odyssey" style={{maxWidth:'300px'}} />
          <div className="price">Precio: $1.299.000</div>
        </div>
      </div>
    </div>
  );
};

export default MonitoresPage;
