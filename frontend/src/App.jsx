import React, { useEffect, useRef, useState } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom';

import CategoryCard from './components/CategoryCard';
import FilterSidebar from './components/FilterSidebar';
import Navbar from './components/Navbar';
import {
  PaginationDemo,
  ProductDetailCard,
  ProductDetailCard2,
  ProductDetailCard3,
  ProductDetailCard4,
  ProductDetailCard5,
} from './components/ProductCard';

import AudioPage from './components/AudioPage';
import CamarasPage from './components/CamarasPage';
import CelularesPage from './components/CelularesPage';
import ComputadoresPage from './components/ComputadoresPage';
import ImpresorasPage from './components/ImpresorasPage';
import MonitoresPage from './components/MonitoresPage';
import SmartwatchPage from './components/SmartwatchPage';
import SolicitudPage from './components/SolicitudPage';
import TvPage from './components/TvPage';

import Configuraciones from './pages/Configuraciones';
import Login from './pages/Login';
import Recuperar from './pages/Recuperar';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';

import './App.css';

const categories = [
  { title: 'Celulares', image: '/src/assets/iphone-15 azul.webp' },
  { title: 'Computadores', image: '/src/assets/lenovo.avif' },
  { title: 'Monitores', image: '/src/assets/monitor odyssey.webp' },
  { title: 'Tv', image: '/src/assets/tv samsung.webp' },
  { title: 'Smartwatch', image: '/src/assets/apple watch.png' },
  { title: 'Impresoras', image: '/src/assets/impresora.png' },
  { title: 'Audio', image: '/src/assets/airpods-pro-2.png' },
  { title: 'Cámaras', image: '/src/assets/QNV.png' },
];

function MainApp() {
  const [page, setPage] = useState(0);
  const location = useLocation();
  const solicitudRef = useRef(null);

  useEffect(() => {
    if (location.state?.scrollTo === 'solicitud-compra' && solicitudRef.current) {
      solicitudRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [location]);

  const productCards = [
    <ProductDetailCard key="1" />,
    <ProductDetailCard2 key="2" />,
    <ProductDetailCard3 key="3" />,
    <ProductDetailCard4 key="4" />,
    <ProductDetailCard5 key="5" />,
    <ProductDetailCard2 key="6" />,
    <ProductDetailCard3 key="7" />,
    <ProductDetailCard4 key="8" />,
    <ProductDetailCard key="9" />,
    <ProductDetailCard2 key="10" />,
    <ProductDetailCard3 key="11" />,
    <ProductDetailCard4 key="12" />,
    <ProductDetailCard key="13" />,
    <ProductDetailCard2 key="14" />,
    <ProductDetailCard3 key="15" />,
    <ProductDetailCard4 key="16" />,
    <ProductDetailCard key="17" />,
    <ProductDetailCard2 key="18" />,
    <ProductDetailCard3 key="19" />,
    <ProductDetailCard4 key="20" />,
    <ProductDetailCard key="21" />,
    <ProductDetailCard2 key="22" />,
    <ProductDetailCard3 key="23" />,
    <ProductDetailCard4 key="24" />,
  ];

  const productsPerPage = 5;

  const productsToShow = productCards
    .slice((page === 0 ? 0 : (page - 1) * productsPerPage), (page === 0 ? 5 : page * productsPerPage))
    .map((card, idx) => (
      <React.Fragment key={idx}>
        {card}
        <div style={{ height: '2rem' }} />
      </React.Fragment>
    ));

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          padding: '2rem',
          maxWidth: '1300px',
          margin: 'auto',
        }}
      >
        <FilterSidebar />
        <section style={{ flex: 1 }}>
          {page === 0 && (
            <div className="product-grid">
              {categories.map((cat, index) => (
                <CategoryCard key={index} title={cat.title} image={cat.image} />
              ))}
            </div>
          )}
          <div className="product-list">{productsToShow}</div>
          <div style={{ height: '2rem' }} />
          <div ref={solicitudRef} id="solicitud-compra">
            <PaginationDemo currentPage={page} setPage={setPage} />
          </div>
        </section>
      </main>
    </div>
  );
}

// App principal con enrutamiento
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas de autenticación */}
        <Route path="/inicio-sesion" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/recuperar" element={<Recuperar />} />
        <Route path="/configuraciones" element={<Configuraciones />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Rutas de productos */}
        <Route path="/solicitud" element={<SolicitudPage />} />
        <Route path="/celulares" element={<CelularesPage />} />
        <Route path="/computadores" element={<ComputadoresPage />} />
        <Route path="/monitores" element={<MonitoresPage />} />
        <Route path="/tv" element={<TvPage />} />
        <Route path="/smartwatch" element={<SmartwatchPage />} />
        <Route path="/impresoras" element={<ImpresorasPage />} />
        <Route path="/audio" element={<AudioPage />} />
        <Route path="/camaras" element={<CamarasPage />} />

        {/* Página principal: catálogo */}
        <Route path="/home" element={<MainApp />} />

        {/* 👇 Ahora redirige la raíz directamente al catálogo */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Ruta no encontrada */}
        <Route
          path="*"
          element={
            <div style={{ padding: '2rem' }}>
              <h2>Página no encontrada</h2>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}