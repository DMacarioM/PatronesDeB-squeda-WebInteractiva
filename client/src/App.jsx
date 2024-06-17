import { HashRouter,BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import BusquedaDirectaPage from './pages/BusquedaDirectaPage.jsx';
import SandboxPage from './pages/SandboxPage.jsx';
import KMPPage from './pages/KMPPage.jsx';
import BMPage from './pages/BMPage.jsx';
import Navbar from './components/Navbar.jsx';

import './css/HomePage.css';

import { LogProvider } from './context/LogProvider.tsx';

function App() {
  return (
    <LogProvider>
      <div className="app-container">
        <BrowserRouter>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path='/algorpatrones/dist' element={<HomePage />} />
              <Route path='/algorpatrones/dist/BD' element={<BusquedaDirectaPage />} />
              <Route path='/algorpatrones/dist/KMP' element={<KMPPage />} />
              <Route path='/algorpatrones/dist/BM' element={<BMPage />} />
              <Route path='/algorpatrones/dist/Sandbox' element={<SandboxPage />} />
              <Route path='/algorpatrones/dist/*' element={<Navigate to="/algorpatrones/dist/" />} />
              <Route path='/*' element={<Navigate to="/algorpatrones/dist/" />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </LogProvider>
  );
}

export default App;
