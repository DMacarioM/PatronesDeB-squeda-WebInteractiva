import {BrowserRouter, Routes, Route} from 'react-router-dom'

import SandboxPage from './pages/SandboxPage.jsx'

import {LogProvider} from './components/LogComponent/LogProvider.jsx';

function App() {
  return (
    <LogProvider>
    <div>
      <h1>Navbar (Investigar que sea lateral)</h1>
      <div className="container mx-auto px-4">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={

                <SandboxPage />
          
              }>
            </Route> 
            <Route path='/BD' element={<h1>Busqueda directa Info</h1>}></Route>
            <Route path='/KMP' element={<h1>KMP Info</h1>}></Route>
            <Route path='/BM' element={<h1>BM Info</h1>}></Route>
            <Route path='/Sandbox' element={<SandboxPage />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
    </LogProvider>
  )
}

export default App
