import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../global.css';

// Importamos los componentes necesarios
import MenuAdmin from '../components/MenuAdmin';
import loadingIcon from '../assets/loading-icon.svg';

const PurchaseRequests = () => {
  // Usuario actual simulado para mostrar en el header
  const currentUser = {
    name: 'Catalina Toro Ramirez',
    role: 'Administrador',
    avatar: 'https://i.pravatar.cc/100?img=5' // Avatar simulado
  };
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  // Estado del filtro está definido pero no se usa en la UI actual
  const [statusFilter] = useState('all');
  // Los estatus disponibles están definidos directamente donde se necesitan
  const navigate = useNavigate();

  useEffect(() => {
    // NOTA: Comprobación de autenticación desactivada temporalmente para pruebas
    // Comentamos este código para permitir acceso a la vista sin autenticación
    /*
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (!userData.token || userData.role !== 'admin') {
      navigate('/inicio-sesion');
      return;
    }
    */

    // Load purchase requests
    const fetchRequests = async () => {
      try {
        // Usamos un token simulado para pruebas
        const token = 'test-token-for-admin';
        const response = await fetch('http://localhost:3002/api/purchase-requests', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          mode: 'cors' // Asegurarnos que se use el modo CORS
        });
        
        if (!response.ok) {
          throw new Error('Error fetching purchase requests');
        }
        
        const data = await response.json();
        const requests = (data.data || []).map(request => ({
          ...request,
          editingStatus: false // Inicialmente no estamos en modo edición
        }));
        setRequests(requests);
        
        // Usamos los estados predefinidos del ENUM y no los extraemos de la base de datos
        // Esto asegura que siempre tengamos todos los estados posibles disponibles
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [navigate]);

  // Function to get the class based on status
  const getStatusClass = (status) => {
    if (!status) return '';
    
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'sent':
        return 'status-sent';
      case 'in_process':
        return 'status-in_process';
      case 'canceled':
        return 'status-canceled';
      default:
        return '';
    }
  };
  
  // La función de formato ahora está integrada en el componente StatusDisplay
  
  // Esta conversión ya no es necesaria porque los estados se manejan directamente en inglés en la UI

  // Función para actualizar el estado de una solicitud
  const handleStatusChange = async (requestId, status) => {
    try {
      const token = 'test-token-for-admin'; // Token para pruebas
      const response = await fetch(`http://localhost:3002/api/purchase-requests/${requestId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      
      if (!response.ok) {
        throw new Error('Error al actualizar el estado');
      }
      
      const data = await response.json();
      
      // Actualizar el estado local
      setRequests(requests.map(request => 
        request.request_id === requestId 
          ? { ...request, status: status } 
          : request
      ));
      
      // Mostrar mensaje de éxito (puedes implementar un sistema de notificaciones)
      console.log('Estado actualizado correctamente:', data);
      
    } catch (error) {
      console.error('Error:', error);
      // Mostrar mensaje de error (puedes implementar un sistema de notificaciones)
      alert('Error al actualizar el estado: ' + error.message);
    }
  };

  // Filter requests by status
  const filteredRequests = statusFilter === 'all' 
    ? requests 
    : requests.filter(request => {
        const status = request.status;
        return status && status.toLowerCase() === statusFilter.toLowerCase();
      });

  // Pagination
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Esta función se usará si implementamos un filtro en la UI más adelante
  // const handleStatusFilterChange = (e) => {
  //   setStatusFilter(e.target.value);
  //   setCurrentPage(1);
  // };   setCurrentPage(1);
  // };

  const handleNewRequest = () => {
    navigate('/new-request');
  };

  // Componente para mostrar el estado con un icono grande y dropdown integrado
  const StatusDisplay = ({ status, onStatusChange, requestId }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState('bottom');
    const dropdownRef = useRef(null);
    const containerRef = useRef(null);
    
    // Efecto para cerrar el dropdown cuando el usuario hace clic fuera
    useEffect(() => {
      function handleClickOutside(event) {
        // Cerrar el dropdown si se hace clic fuera del dropdown
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setShowDropdown(false);
        }
      }
      
      if (showDropdown) {
        document.addEventListener('mousedown', handleClickOutside);
      }
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [showDropdown]);

    // Función para calcular la posición del dropdown
    const calculateDropdownPosition = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const bottomSpace = windowHeight - rect.bottom;
        const dropdownHeight = 200; // Altura aproximada del dropdown con 4 opciones
        
        // Si hay menos espacio abajo que la altura del dropdown, lo mostramos arriba
        if (bottomSpace < dropdownHeight) {
          setDropdownPosition('top');
        } else {
          setDropdownPosition('bottom');
        }
      }
    };

    // Manejador para mostrar/ocultar el dropdown
    const toggleDropdown = (e) => {
      e.stopPropagation(); // Evita que el clic se propague al documento
      
      if (!showDropdown) {
        calculateDropdownPosition();
        setShowDropdown(true);
      } else {
        // Si ya está abierto, lo cerramos
        setShowDropdown(false);
      }
    };
    
    // Determinar el icono y texto según el estado
    const getStatusInfo = () => {
      switch(status) {
        case 'in_process':
          return { 
            icon: <img src={loadingIcon} alt="En proceso" className="process-icon" />, 
            text: 'EN PROCESO', 
            description: 'Solicitud en procesamiento' 
          };
        case 'sent':
          return { icon: '🚚', text: 'ENVIADO', description: 'Solicitud enviada al proveedor' };
        case 'completed':
          return { icon: '✅', text: 'FINALIZADO', description: 'Solicitud completada' };
        case 'canceled':
          return { icon: '❌', text: 'CANCELADO', description: 'Solicitud cancelada' };
        default:
          return { icon: '❓', text: 'DESCONOCIDO', description: 'Estado desconocido' };
      }
    };

    const statusInfo = getStatusInfo();

    const handleDropdownSelect = (newStatus, e) => {
      if (e) e.stopPropagation(); // Evita la propagación del clic
      onStatusChange(requestId, newStatus);
      setShowDropdown(false);
    };

    return (
      <div className="status-dropdown-container" ref={containerRef}>
        <div 
          className={`status-display ${getStatusClass(status)}`}
          onClick={toggleDropdown}
          title="Haz clic para cambiar el estado"
        >
          <div className="status-icon">{statusInfo.icon}</div>
          <div className="status-text">
            <div className="status-name">{statusInfo.text}</div>
            <div className="status-description">{statusInfo.description}</div>
          </div>
        </div>
        
        {showDropdown && (
          <div className={`status-dropdown-menu status-dropdown-${dropdownPosition}`} ref={dropdownRef}>
            <div 
              className="status-option status-in_process" 
              onClick={(e) => handleDropdownSelect('in_process', e)}
            >
              <div className="option-icon">🔄</div>
              <div className="option-text">EN PROCESO</div>
            </div>
            <div 
              className="status-option status-sent" 
              onClick={(e) => handleDropdownSelect('sent', e)}
            >
              <div className="option-icon">🚚</div>
              <div className="option-text">ENVIADO</div>
            </div>
            <div 
              className="status-option status-completed" 
              onClick={(e) => handleDropdownSelect('completed', e)}
            >
              <div className="option-icon">✅</div>
              <div className="option-text">FINALIZADO</div>
            </div>
            <div 
              className="status-option status-canceled" 
              onClick={(e) => handleDropdownSelect('canceled', e)}
            >
              <div className="option-icon">❌</div>
              <div className="option-text">CANCELADO</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="admin-layout">
        <div className="admin-header">
          <div className="logo-container">
            <img src="/src/assets/logo ti360 blanco.png" alt="TI360 Logo" className="admin-logo" />
            <span className="admin-slogan">Una Visión Integral a su Negocio</span>
          </div>
          <div className="admin-user-info">
            <div className="notification-bell">🔔</div>
            <div className="user-details">
              <div className="user-name">{currentUser.name}</div>
              <div className="user-role">{currentUser.role}</div>
            </div>
            <div className="user-avatar">
              <img src={currentUser.avatar} alt="User Avatar" />
            </div>
          </div>
        </div>
        <MenuAdmin />
        <div className="admin-content">
          <div className="loading-spinner">Cargando solicitudes...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-layout">
        <div className="admin-header">
          <div className="logo-container">
            <img src="/src/assets/logo ti360 blanco.png" alt="TI360 Logo" className="admin-logo" />
            <span className="admin-slogan">Una Visión Integral a su Negocio</span>
          </div>
          <div className="admin-user-info">
            <div className="notification-bell">🔔</div>
            <div className="user-details">
              <div className="user-name">{currentUser.name}</div>
              <div className="user-role">{currentUser.role}</div>
            </div>
            <div className="user-avatar">
              <img src={currentUser.avatar} alt="User Avatar" />
            </div>
          </div>
        </div>
        <MenuAdmin />
        <div className="admin-content">
          <div className="error-message">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {/* Header del Admin con Logo y Perfil de Usuario */}
      <div className="admin-header">
        <div className="logo-container">
          <img src="/src/assets/logo ti360 blanco.png" alt="TI360 Logo" className="admin-logo" />
          <span className="admin-slogan">Una Visión Integral a su Negocio</span>
        </div>
        <div className="admin-user-info">
          <div className="notification-bell">🔔</div>
          <div className="user-details">
            <div className="user-name">{currentUser.name}</div>
            <div className="user-role">{currentUser.role}</div>
          </div>
          <div className="user-avatar">
            <img src={currentUser.avatar} alt="User Avatar" />
          </div>
        </div>
      </div>

      {/* Menú de Navegación Admin */}        <MenuAdmin />

      {/* Contenido Principal */}
      <div className="admin-content">
        <div className="solicitudes-container">
          {/* Cabecera de la sección */}
          <div className="solicitudes-header">
            <h1 className="solicitudes-title">Solicitudes de compra</h1>
            <button className="add-button" onClick={handleNewRequest}>
              + Nueva Solicitud
            </button>
          </div>

          {/* Tabla de Solicitudes */}
          {currentRequests.length === 0 ? (
            <div className="no-data-message">
              No se encontraron solicitudes de compra.
            </div>
          ) : (
            <table className="solicitudes-table">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Cliente</th>
                  <th>Emision</th>
                  <th>Desc</th>
                  <th>Neto</th>
                  <th>IVA</th>
                  <th>Total</th>
                  <th>Vendedor</th>
                  <th>Producto</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {currentRequests.map((request) => (
                  <tr key={request.request_id}>
                    <td>{request.request_code || `#PR-${request.request_id}`}</td>
                    <td>Cliente {request.user_id}</td>
                    <td>{new Date(request.created_at).toLocaleDateString('es-ES')}</td>
                    <td>{request.total_discount || '0%'}</td>
                    <td>${(parseFloat(request.total) * 0.81).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                    <td>X</td>
                    <td>${parseFloat(request.total).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                    <td>Vendedor {(request.request_id % 3) + 1}</td>
                    <td style={{maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                      Producto Tecnológico Premium
                    </td>
                    <td>
                      <StatusDisplay 
                        status={request.status} 
                        requestId={request.request_id}
                        onStatusChange={handleStatusChange}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                « Anterior
              </button>
              
              {[...Array(totalPages).keys()].map(number => (
                <button
                  key={number + 1}
                  className={`pagination-button ${currentPage === number + 1 ? 'active' : ''}`}
                  onClick={() => handlePageChange(number + 1)}
                >
                  {number + 1}
                </button>
              ))}
              
              <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Siguiente »
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseRequests;
