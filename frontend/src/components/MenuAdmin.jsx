import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../global.css';

const MenuAdmin = () => {
  const location = useLocation();
  
  // Estilos para la barra de navegación de administrador
  const navStyle = {
    display: 'flex',
    backgroundColor: '#1e3a8a', // Color azul oscuro como en la imagen
    width: '100%',
    padding: '0',
    margin: '0',
    borderBottom: '3px solid #1c2d6b',
    height: '70px', // Altura fija para el menú, más grande
    justifyContent: 'space-around', // Distribuir elementos uniformemente
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  // Estilos para cada elemento del menú
  const menuItemStyle = (isActive) => ({
    padding: '15px 30px',
    color: 'white',
    textDecoration: 'none',
    fontSize: '20px', // Fuente más grande
    fontWeight: isActive ? 'bold' : 'normal',
    backgroundColor: isActive ? '#2563eb' : 'transparent',
    borderTop: isActive ? '4px solid #60a5fa' : '4px solid transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, // Ocupa todo el espacio disponible por igual
    textAlign: 'center',
    transition: 'all 0.2s ease',
  });

  // Iconos para cada elemento del menú
  const getIcon = (name) => {
    switch (name) {
      case 'home':
        return <span style={{ marginRight: '12px', fontSize: '24px' }}>🏠</span>;
      case 'clients':
        return <span style={{ marginRight: '12px', fontSize: '24px' }}>👥</span>;
      case 'requests':
        return <span style={{ marginRight: '12px', fontSize: '24px' }}>📊</span>;
      case 'tasks':
        return <span style={{ marginRight: '12px', fontSize: '24px' }}>📋</span>;
      case 'settings':
        return <span style={{ marginRight: '12px', fontSize: '24px' }}>⚙️</span>;
      default:
        return null;
    }
  };

  // Comprobar qué menú está activo
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav style={navStyle}>
      <Link to="/home" style={menuItemStyle(isActive('/home'))}>
        {getIcon('home')}
        Inicio
      </Link>
      <Link to="/clientes" style={menuItemStyle(isActive('/clientes'))}>
        {getIcon('clients')}
        Clientes
      </Link>
      <Link to="/purchase-requests" style={menuItemStyle(isActive('/purchase-requests'))}>
        {getIcon('requests')}
        Solicitud de compra
      </Link>
      <Link to="/panel-tareas" style={menuItemStyle(isActive('/panel-tareas'))}>
        {getIcon('tasks')}
        Panel de tareas
      </Link>
      <Link to="/configuraciones" style={menuItemStyle(isActive('/configuraciones'))}>
        {getIcon('settings')}
        Configuraciones
      </Link>
    </nav>
  );
};

export default MenuAdmin;
