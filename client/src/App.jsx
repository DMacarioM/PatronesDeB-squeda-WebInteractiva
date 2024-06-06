import {BrowserRouter, Routes, Route} from 'react-router-dom'

import SandboxPage from './pages/SandboxPage.jsx'

import {LogProvider} from './context/LogProvider.tsx';

function App() {
  return (
    <LogProvider>
    <div className='flex-col'>
      {/*TODO: Gestion de rutas <h1>Navbar (Investigar que sea lateral)</h1> */}
      <div className="flex-col container mx-auto px-4">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={

                <SandboxPage />
          
              }>
            </Route> 
            <Route path='/BD' element={<h1>Busqueda directa Info</h1>}></Route>
            <Route path='/KMP' element={<h1>KMP Info</h1>}></Route>
            <Route path='/BM' element={<h1>Boyer-Moore Info</h1>}></Route>
            <Route path='/Sandbox' element={<SandboxPage />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
    </LogProvider>
  )
}

export default App
