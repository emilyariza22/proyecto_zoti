import React, { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

import imacImg from "../assets/imac 24.webp";
import airpodsMaxImg from "../assets/AirPods Max - Medianoche.gif";
import lenovoImg from "../assets/lenovo.avif";
import iphoneImg from "../assets/iphone-15 azul.webp";
import iphone16Img from "../assets/iphone 16.webp";

function ProductDetailCard() {
  const navigate = useNavigate();
  const product = {
    name: 'iMac 24" Retina 4,5K Chip M3 Apple CPU 8 núcleos GPU 8 núcleos 256GB Plateado',
    price: 8199000,
    image: imacImg
  };
  return (
    <div className="product-card" style={{cursor:'pointer'}} onClick={() => navigate('/solicitud', { state: { product } })}>
      <h2 className="product-title">
        iMac 24" Retina 4,5K Chip M3 Apple CPU 8 núcleos GPU 8 núcleos 256GB Plateado
      </h2>
      <div className="product-content">
        <img src={imacImg} alt="iMac" />
        <table className="specs-table">
          <tbody>
            <tr><td>Memoria RAM</td><td>8 GB</td></tr>
            <tr><td>Marca del Procesador</td><td>Apple</td></tr>
            <tr><td>Capacidad de Disco</td><td>Estado Sólido SSD 256 GB</td></tr>
            <tr><td>Procesador</td><td>APPLE M3</td></tr>
            <tr><td>Sistema Operativo</td><td>MacOS</td></tr>
          </tbody>
        </table>
      </div>
      <div className="price">Precio: $8.199.000</div>
    </div>
  );
}

function ProductDetailCard2() {
  const navigate = useNavigate();
  const product = {
    name: 'Audífonos APPLE AirPods Max Medianoche',
    price: 2699010,
    image: airpodsMaxImg
  };
  return (
    <div className="product-card" style={{cursor:'pointer'}} onClick={() => navigate('/solicitud', { state: { product } })}>
      <h2 className="product-title">
        Audífonos APPLE AirPods Max Medianoche
      </h2>
      <div className="product-content">
        <img src={airpodsMaxImg} alt="AirPods Max - Medianoche" />
        <table className="specs-table">
          <tbody>
            <tr><td>Duracion de la Bateria</td><td>20  Horas Aproximadas</td></tr>
            <tr><td>Sistema Operativo Compatible</td><td>iOS</td></tr>
            <tr><td>Opciones de Conectividad</td><td>Bluetooth</td></tr>
            <tr><td>Tipo de Audifonos</td><td>Cancelación de Ruido Over Ear</td></tr>
          </tbody>
        </table>
      </div>
      <div className="price">Precio: $2.699.010</div>
    </div>
  );
}

function ProductDetailCard3() {
  const navigate = useNavigate();
  const product = {
    name: 'Lenovo ThinkPad X1 Carbon Gen 11 Intel i7 16GB 512GB SSD 14" WUXGA',
    price: 7499000,
    image: lenovoImg
  };
  return (
    <div className="product-card" style={{cursor:'pointer'}} onClick={() => navigate('/solicitud', { state: { product } })}>
      <h2 className="product-title">
        Lenovo ThinkPad X1 Carbon Gen 11 Intel i7 16GB 512GB SSD 14" WUXGA
      </h2>
      <div className="product-content">
        <img src={lenovoImg} alt="Lenovo ThinkPad X1 Carbon" />
        <table className="specs-table">
          <tbody>
            <tr><td>Memoria RAM</td><td>16 GB</td></tr>
            <tr><td>Procesador</td><td>Intel Core i7 13th Gen</td></tr>
            <tr><td>Capacidad de Disco</td><td>SSD 512 GB</td></tr>
            <tr><td>Pantalla</td><td>14" WUXGA (1920x1200)</td></tr>
            <tr><td>Sistema Operativo</td><td>Windows 11 Pro</td></tr>
          </tbody>
        </table>
      </div>
      <div className="price">Precio: $7.499.000</div>
    </div>
  );
}

function ProductDetailCard4() {
  const navigate = useNavigate();
  const product = {
    name: 'iPhone 15 128GB Azul Pantalla Super Retina XDR 6.1" Chip A16 Bionic',
    price: 4499000,
    image: iphoneImg
  };
  return (
    <div className="product-card" style={{cursor:'pointer'}} onClick={() => navigate('/solicitud', { state: { product } })}>
      <h2 className="product-title">
        iPhone 15 128GB Azul Pantalla Super Retina XDR 6.1" Chip A16 Bionic
      </h2>
      <div className="product-content">
        <img src={iphoneImg} alt="iPhone 15 Azul" />
        <table className="specs-table">
          <tbody>
            <tr><td>Pantalla</td><td>6.1" Super Retina XDR</td></tr>
            <tr><td>Procesador</td><td>Apple A16 Bionic</td></tr>
            <tr><td>Almacenamiento</td><td>128 GB</td></tr>
            <tr><td>Cámara Principal</td><td>48 MP + 12 MP</td></tr>
            <tr><td>Sistema Operativo</td><td>iOS 17</td></tr>
          </tbody>
        </table>
      </div>
      <div className="price">Precio: $4.499.000</div>
    </div>
  );
}

function ProductDetailCard5() {
  const navigate = useNavigate();
  const product = {
    name: 'iPhone 16 Pro Max 256 GB Titanio Natural',
    price: 6969010,
    image: iphone16Img
  };
  return (
    <div className="product-card" style={{cursor:'pointer'}} onClick={() => navigate('/solicitud', { state: { product } })}>
      <h2 className="product-title">
        iPhone 16 Pro Max 256 GB Titanio Natural
      </h2>
      <div className="product-content">
        <img src={iphone16Img} alt="iPhone 16 Pro Max" />
        <table className="specs-table">
          <tbody>
            <tr><td>Memoria Interna</td><td>256 GB</td></tr>
            <tr><td>Marca del Procesador</td><td>Apple</td></tr>
            <tr><td>Sistema Operativo</td><td>iOS</td></tr>
            <tr><td>Version Sistema Operativo</td><td>iOS 18</td></tr>
          </tbody>
        </table>
      </div>
      <div className="price">Precio: $6.969.010</div>
    </div>
  );
}

// PAGINATION DEMO VISUAL
function PaginationDemo({ currentPage, setPage }) {
  const totalPages = 5; // O hazlo dinámico si lo necesitas
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '2.5rem 0' }}>
      <nav className="pagination">
        <span
          className={`page${currentPage === 0 ? ' active' : ''}`}
          onClick={() => setPage(0)}
          style={{ cursor: 'pointer' }}
        >
          Inicio
        </span>
        {pages.map((num) => (
          <span
            key={num}
            className={`page${currentPage === num ? ' active' : ''}`}
            onClick={() => setPage(num)}
            style={{ cursor: 'pointer' }}
          >
            {num}
          </span>
        ))}
        <span
          className="next-page"
          onClick={() => setPage(Math.min(currentPage + 1, totalPages))}
          style={{ cursor: 'pointer' }}
        >
          Siguiente <span style={{ fontWeight: 'bold' }}>&#9654;</span>
        </span>
      </nav>
    </div>
  );
}

export { ProductDetailCard, ProductDetailCard2, ProductDetailCard3, ProductDetailCard4, ProductDetailCard5, PaginationDemo };