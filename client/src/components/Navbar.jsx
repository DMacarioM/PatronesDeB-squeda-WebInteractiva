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

  const scrollToTop = () => {
    window.scrollBy({
      top: -window.innerHeight*50,
      behavior:'smooth'
    });
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
          <Link to="/algorpatrones/dist/" className="logo-link" 
          onClick={() => {
            handleSelect('/')
            scrollToTop()
          }}>
            <img src="./AlgoritmosLogo.png" alt="Logo" className="logo" />
          </Link>
        )}
        {isMobile && (
          <Link to="/algorpatrones/dist/" className="logo-link-mobile" onClick={() => {
            handleSelect('/')
            scrollToTop()
          }}>
            <img src="./AlgoritmosLogo.png" alt="Logo" className="logo-mobile" />
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
              to="/algorpatrones/dist/BD"
              className={`nav-link ${selected === '/algorpatrones/dist/BD' ? 'selected' : ''}`}
              onClick={() => {
                handleSelect('/algorpatrones/dist/BD')
                scrollToTop()
              }}
            >
              Búsqueda Directa
            </Link>
            <Link
              to="/algorpatrones/dist/KMP"
              className={`nav-link ${selected === '/algorpatrones/dist/KMP' ? 'selected' : ''}`}
              onClick={() => {
                handleSelect('/algorpatrones/dist/KMP')
                scrollToTop()
              }}
            >
              KMP
            </Link>
            <Link
              to="/algorpatrones/dist/BM"
              className={`nav-link ${selected === '/algorpatrones/dist/BM' ? 'selected' : ''}`}
              onClick={() => {
                handleSelect('/algorpatrones/dist/BM')
                scrollToTop()
              }}
            >
              Boyer-Moore
            </Link>
            <Link
              to="/algorpatrones/dist/Sandbox"
              className={`nav-link ${selected === '/algorpatrones/dist/Sandbox' ? 'selected' : ''}`}
              onClick={() => {
                handleSelect('/algorpatrones/dist/Sandbox')
                scrollToTop()
              }}
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
              to="/algorpatrones/dist/BD"
              className={`nav-link ${selected === '/algorpatrones/dist/BD' ? 'selected' : ''}`}
              onClick={() => {
                handleSelect('/algorpatrones/dist/BD')
                scrollToTop()
              }}
            >
              Búsqueda Directa
            </Link>
            <Link
              to="/algorpatrones/dist/KMP"
              className={`nav-link ${selected === '/algorpatrones/dist/KMP' ? 'selected' : ''}`}
              onClick={() => {handleSelect('/algorpatrones/dist/KMP')
                scrollToTop()
              }}
            >
              KMP
            </Link>
            <Link
              to="/algorpatrones/dist/BM"
              className={`nav-link ${selected === '/algorpatrones/dist/BM' ? 'selected' : ''}`}
              onClick={() => {handleSelect('/algorpatrones/dist/BM')
                scrollToTop()
              }}
            >
              Boyer-Moore
            </Link>
            <Link
              to="/algorpatrones/dist/Sandbox"
              className={`nav-link ${selected === '/algorpatrones/dist/Sandbox' ? 'selected' : ''}`}
              onClick={() => {
                handleSelect('/algorpatrones/dist/Sandbox')
                scrollToTop()}}
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
