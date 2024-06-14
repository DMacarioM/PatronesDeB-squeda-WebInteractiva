import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 900);
  };

  const handleSelect = (path) => {
    if (path === '/') {
      setSelected('');
    } else {
      setSelected(path);
    }
    setIsSidebarOpen(false); // Cerrar sidebar al seleccionar
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className={`navbar ${isMobile ? 'navbar-mobile' : ''}`}>
        {!isMobile && (
          <Link to="/" className="logo-link" onClick={() => handleSelect('/')}>
            <img src="/AlgoritmosLogo.png" alt="Logo" className="logo" />
          </Link>
        )}
        {isMobile && (
          <Link to="/" className="logo-link-mobile" onClick={() => handleSelect('/')}>
            <img src="/AlgoritmosLogo.png" alt="Logo" className="logo-mobile" />
          </Link>
        )}
        {isMobile && (
          <button
            className={`menu-button ${isSidebarOpen ? 'open' : ''}`}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
        )}
        {!isMobile && (
          <>
            <Link
              to="/BD"
              className={`nav-link ${selected === '/BD' ? 'selected' : ''}`}
              onClick={() => handleSelect('/BD')}
            >
              Búsqueda Directa
            </Link>
            <Link
              to="/KMP"
              className={`nav-link ${selected === '/KMP' ? 'selected' : ''}`}
              onClick={() => handleSelect('/KMP')}
            >
              KMP
            </Link>
            <Link
              to="/BM"
              className={`nav-link ${selected === '/BM' ? 'selected' : ''}`}
              onClick={() => handleSelect('/BM')}
            >
              Boyer-Moore
            </Link>
            <Link
              to="/Sandbox"
              className={`nav-link ${selected === '/Sandbox' ? 'selected' : ''}`}
              onClick={() => handleSelect('/Sandbox')}
            >
              Sandbox
            </Link>
          </>
        )}
      </div>
      {isMobile && (
        <div ref={sidebarRef} className={`sidebar-mobile-overlay ${isSidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-mobile">
            <Link
              to="/BD"
              className={`nav-link ${selected === '/BD' ? 'selected' : ''}`}
              onClick={() => handleSelect('/BD')}
            >
              Búsqueda Directa
            </Link>
            <Link
              to="/KMP"
              className={`nav-link ${selected === '/KMP' ? 'selected' : ''}`}
              onClick={() => handleSelect('/KMP')}
            >
              KMP
            </Link>
            <Link
              to="/BM"
              className={`nav-link ${selected === '/BM' ? 'selected' : ''}`}
              onClick={() => handleSelect('/BM')}
            >
              Boyer-Moore
            </Link>
            <Link
              to="/Sandbox"
              className={`nav-link ${selected === '/Sandbox' ? 'selected' : ''}`}
              onClick={() => handleSelect('/Sandbox')}
            >
              Sandbox
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
