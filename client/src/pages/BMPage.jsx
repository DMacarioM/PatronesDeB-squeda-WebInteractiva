import React, { Component } from 'react'
import CodeComponentBM from '../components/CodeComponentBM';
import { Link } from 'react-router-dom';

const scrollToTop = () => {
  window.scrollBy({
    top: -window.innerHeight*50,
    behavior:'smooth'
  });
};

function BMPage() {
  return (
    <div className='container'>
      <h1 className='title'>Boyer-Moore</h1>
      <hr className='yellow-line'/>
      <p className='description'>
      El algoritmo de Boyer-Moore (BM) es una técnica avanzada para encontrar todas las ocurrencias de una subcadena dentro de un texto más extenso. A diferencia de la búsqueda directa, que compara el patrón con cada subcadena posible en secuencia, BM utiliza dos tablas precalculadas: una tabla de caracteres mal colocados (badChar) y una tabla de sufijos buenos (goodSuffix). Estas tablas permiten al algoritmo saltar sobre posiciones del texto que no coinciden con el patrón, reduciendo así la cantidad de comparaciones necesarias y mejorando considerablemente la eficiencia, especialmente en textos largos con patrones repetitivos. La clave de la eficacia de BM radica en su capacidad para calcular saltos grandes en el texto basándose en información precalculada, evitando así la reevaluación de caracteres ya comparados y acelerando significativamente el proceso de búsqueda de subcadenas. En resumen, Boyer-Moore representa una mejora significativa sobre la búsqueda directa al utilizar estrategias inteligentes para minimizar comparaciones innecesarias y optimizar la búsqueda de patrones en contextos de procesamiento de texto avanzado.</p>
    <img src="./HomeFrog.png" alt="Logo" className="frogImage" />
      <h2 className='section-title'>Código</h2>
      <hr className='yellow-line'/>
      <p className='section-content'>
      </p>
      <CodeComponentBM />
      <h2 className='section-title'>Explicación del código</h2>
      <hr className='yellow-line'/>
      <p className='section-content'>
      El algoritmo de Boyer-Moore mejora significativamente la eficiencia de la búsqueda de patrones al utilizar dos estrategias principales: tablas de desplazamiento para caracteres malos (badChar) y sufijos buenos (goodSuffix).</p>
      <h2 className='section-content-title'>Tabla de malos caracteres</h2>
      <p className='section-content-section'>Esta tabla almacena la última posición de cada carácter en el patrón. Cuando se encuentra una discrepancia entre el texto y el patrón, el algoritmo utiliza esta información para saltar al máximo posible de caracteres basado en la posición del carácter en el patrón. Esto minimiza las comparaciones innecesarias.</p>
      <h2 className='section-content-title'>Tabla de Sufijos Buenos</h2>
      <p className='section-content-section'>Esta tabla ayuda a decidir cuántos caracteres del texto se pueden saltar cuando se encuentra una discrepancia basada en sufijos coincidentes en el patrón. Si hay una coincidencia parcial en el sufijo del patrón, el algoritmo aprovecha esta información para avanzar más rápidamente en la búsqueda.</p>
     
     <p className='section-content'>
     Durante la búsqueda, el algoritmo comienza desde el final del patrón y compara con el texto de derecha a izquierda. Si hay una discrepancia, utiliza las tablas badChar y goodSuffix para calcular el máximo desplazamiento posible antes de intentar una nueva comparación. Esto reduce significativamente la cantidad de comparaciones en comparación con otros algoritmos de búsqueda, especialmente en patrones largos y textos extensos. En el peor de los casos, la complejidad temporal del algoritmo de Boyer-Moore es O(n*m), donde n es la longitud del texto y m es la longitud del patrón, pero en la práctica puede ser mucho más rápido que otros algoritmos como el de fuerza bruta.</p>
        <div className='button-container'>
        <Link to="/algorpatrones/dist/"className="comic-button" onClick={() => {scrollToTop()}}> Volver al Inicio</Link>
        </div>
      <h2 className='section-title'>Pruebalo!</h2>
      <hr className='yellow-line'/>
      <p className='section-content'>
        Te invitamos a probar este algoritmosen nuestra sección Sandbox. Allí podrás experimentar con diferentes patrones y textos para ver cómo funcionan estos algoritmos en la práctica.
      </p>
      <div className='button-container'>
      <Link to="/algorpatrones/dist/Sandbox"className="codepen-button" onClick={() => {scrollToTop()}}><span>Sandbox</span></Link>
      </div>
    </div>
  )
} 

export default BMPage
