import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo ti360 blanco.png';

const Navbar = () => {
  const navigate = useNavigate(); // 👈 Hook para navegar

  const categories = [
    { name: 'Celulares', path: '/celulares' },
    { name: 'Computadores', path: '/computadores' },
    { name: 'Monitores', path: '/monitores' },
    { name: 'Tv', path: '/tv' },
    { name: 'Smartwatch', path: '/smartwatch' },
    { name: 'Impresoras', path: '/impresoras' },
    { name: 'Audio', path: '/audio' },
    { name: 'Cámaras', path: '/camaras' },
  ];

  return (
    <nav className="navbar">
      <div className="logo" style={{ minWidth: 'unset', marginRight: '1.5rem', display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="Logo TI360" style={{ height: '72px', maxWidth: '180px', width: 'auto' }} />
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Buscar productos..." />
        <span className="search-icon">🔍</span>
      </div>

      <div className="header-icons" style={{ gap: '1.5rem', display: 'flex', alignItems: 'center' }}>
        <span className="icon" style={iconStyle}>🤍</span>
        <span className="icon" style={iconStyle}>🛒</span>

        {/* Ícono de usuario con navegación */}
        <span
          className="icon"
          style={iconStyle}
          onClick={() => navigate('/inicio-sesion')}
        >
          👤
        </span>
      </div>

      <ul className="category-nav">
        {categories.map((cat, idx) => (
          <li key={idx}>
            <Link to={cat.path}>{cat.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Estilo general para los íconos
const iconStyle = {
  background: 'linear-gradient(135deg, #00c6fb 60%, #005bea 100%)',
  boxShadow: '0 2px 12px #00b0f055',
  border: '2px solid #fff',
  width: 56,
  height: 56,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2rem',
  transition: 'transform 0.2s, box-shadow 0.2s',
  cursor: 'pointer',
  borderRadius: '8px',
};

export default Navbar;

