import React, { Component } from 'react'
import '../css/BusquedaDirectaPage.css';

function BusquedaDirectaPage() {
  return (
    <div className='container'>
      <h1 className='title'>Búsqueda directa</h1>
      <hr className='yellow-line'/>
      <p className='description'>
      La búsqueda directa es un método elemental utilizado en informática para encontrar todas las ocurrencias de una subcadena dentro de un texto más extenso. Este algoritmo compara el patrón buscado con cada posible subcadena del texto de manera secuencial, desde el inicio hasta el final del texto. Es simple de implementar pero puede ser ineficiente para textos grandes debido a su enfoque de comparación exhaustiva. A pesar de su simplicidad, la búsqueda directa sienta las bases para algoritmos más sofisticados que optimizan la búsqueda mediante técnicas como el uso de estructuras de datos auxiliares o heurísticas avanzadas para reducir el número de comparaciones necesarias.</p>

    <img src="/HomeFrog.png" alt="Logo" className="frogImage" />
      <h2 className='section-title'>Código</h2>
      <hr className='yellow-line'/>
      <p className='section-content'>
        Coodigo
      </p>
      <h2 className='section-title'>Ejemplo</h2>
      <hr className='yellow-line'/>
      <p className='section-content'>
      Animación simple o algo así?
      </p>

        <div className='button-container'>
        <a href='/KMP'>
            <button class="comic-button">Volver al Inicio</button>
        </a>
        </div>
      <h2 className='section-title'>Pruebalo!</h2>
      <hr className='yellow-line'/>
      <p className='section-content'>
        Te invitamos a probar estos algoritmos en nuestra sección Sandbox. Allí podrás experimentar con diferentes patrones y textos para ver cómo funcionan estos algoritmos en la práctica.
      </p>
      <div className='button-container'>
        <a href='/Sandbox' class="codepen-button"><span>Sandbox</span></a>
      </div>
    </div>
  )
} 

export default BusquedaDirectaPage
