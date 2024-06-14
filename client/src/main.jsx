import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/reset.css'
import './css/index.css'
import './css/HomePage.css'
import './css/CodeComponent.css'
import {NextUIProvider} from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <NextUIProvider>
        <main className="">
          <App />
        </main>
      </NextUIProvider>
    </React.StrictMode>
)

