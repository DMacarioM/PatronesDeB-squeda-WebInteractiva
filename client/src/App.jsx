import {BrowserRouter, Routes, Route} from 'react-router-dom'

import HomePage from './pages/HomePage.jsx'
import BusquedaDirectaPage from './pages/BusquedaDirectaPage.jsx'
import SandboxPage from './pages/SandboxPage.jsx'
import Navbar  from './components/Navbar.jsx';

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
            <Route path='/KMP' element={<h1>KMP Info</h1>}></Route>
            <Route path='/BM' element={<h1>Boyer-Moore Info</h1>}></Route>
            <Route path='/Sandbox' element={<SandboxPage />}></Route>
          </Routes>
      </div>
      </BrowserRouter>
    </div>
    </LogProvider>
  )
}

export default App
