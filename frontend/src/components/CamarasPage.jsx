import React from 'react';

const CamarasPage = () => {
  return (
    <div>
      <h2>Cámaras</h2>
      <div className="product-list">
        <div className="product-card">
          <h2 className="product-title">Cámara de Seguridad QNV</h2>
          <img src={require('../assets/QNV.png')} alt="Cámara de Seguridad QNV" style={{maxWidth:'300px'}} />
          <div className="price">Precio: $399.000</div>
        </div>
      </div>
    </div>
  );
};

export default CamarasPage;
