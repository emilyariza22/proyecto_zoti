import React from 'react';
import { useLocation } from 'react-router-dom';
import InicioDeSolicitud from './InicioDeSolicitud';

const SolicitudPage = () => {
  const location = useLocation();
  const product = location.state?.product;

  return (
    <div className="bg-gray-100 min-h-screen" style={{paddingTop: '2rem'}}>
      <InicioDeSolicitud product={product} />
    </div>
  );
};

export default SolicitudPage;
