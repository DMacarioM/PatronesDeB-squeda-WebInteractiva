import {BrowserRouter, Routes, Route} from 'react-router-dom'

import HomePage from './pages/HomePage.jsx'
import BusquedaDirectaPage from './pages/BusquedaDirectaPage.jsx'
import SandboxPage from './pages/SandboxPage.jsx'
import KMPPage from './pages/KMPPage.jsx'
import BMPage from './pages/BMPage.jsx'
import Navbar  from './components/Navbar.jsx';

import './css/HomePage.css';

import {LogProvider} from './context/LogProvider.tsx';

function App() {
  return (
    <LogProvider>
    <div className="app-container">
    <BrowserRouter>
    <Navbar />
      <div className="content">
          <Routes>
            <Route path='/' element={<HomePage />}></Route> 
            <Route path='/BD' element={<BusquedaDirectaPage />}></Route>
            <Route path='/KMP' element={<KMPPage />}></Route>
            <Route path='/BM' element={<BMPage />}></Route>
            <Route path='/Sandbox' element={<SandboxPage />}></Route>
          </Routes>
      </div>
      </BrowserRouter>
    </div>
    </LogProvider>
  )
}

export default App
