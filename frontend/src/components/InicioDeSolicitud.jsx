import React, { useState } from 'react';
import iphone16Img from '../assets/iphone 16.webp';

const defaultProduct = {
  name: 'iPhone 16 Pro Max 256 GB Titanio Natural',
  price: 6969010,
  image: iphone16Img
};

const InicioDeSolicitud = ({ product }) => {
  const [cantidad, setCantidad] = useState(1);
  const prod = product || defaultProduct;
  const total = prod.price * cantidad;

  return (
    <div className="solicitud-bg">
      <div className="solicitud-card">
        <div className="solicitud-img-area">
          <img src={prod.image} alt={prod.name} className="solicitud-img" />
        </div>
        <div className="solicitud-info-area">
          <h1 className="solicitud-title">{prod.name}</h1>
          <div className="solicitud-price">${prod.price.toLocaleString('es-CO')}</div>
          <div className="solicitud-cantidad-row">
            <label htmlFor="cantidad" className="solicitud-cantidad-label">Cantidad</label>
            <select
              id="cantidad"
              value={cantidad}
              onChange={e => setCantidad(Number(e.target.value))}
              className="solicitud-cantidad-select"
            >
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div className="solicitud-total-row">
            <span>Total:</span>
            <span className="solicitud-total">${total.toLocaleString('es-CO')}</span>
          </div>
          <button className="solicitud-btn">Agrega a tu bolsa</button>
        </div>
      </div>
    </div>
  );
};

export default InicioDeSolicitud;
