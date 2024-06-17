import React, { Component } from 'react'
import CodeComponent from "../components/CodeComponent";
import { Link } from 'react-router-dom';

const scrollToTop = () => {
  window.scrollBy({
    top: -window.innerHeight*50,
    behavior:'smooth'
  });
};

function BusquedaDirectaPage() {
  return (
    <div className='container'>
      <h1 className='title'>Búsqueda directa</h1>
      <hr className='yellow-line'/>
      <p className='description'>
      La búsqueda directa es un método elemental utilizado en informática para encontrar todas las ocurrencias de una subcadena dentro de un texto más extenso. Este algoritmo compara el patrón buscado con cada posible subcadena del texto de manera secuencial, desde el inicio hasta el final del texto. Es simple de implementar pero puede ser ineficiente para textos grandes debido a su enfoque de comparación exhaustiva. A pesar de su simplicidad, la búsqueda directa sienta las bases para algoritmos más sofisticados que optimizan la búsqueda mediante técnicas como el uso de estructuras de datos auxiliares o heurísticas avanzadas para reducir el número de comparaciones necesarias.</p>

    <img src={`./HomeFrog.png`} alt="Logo" className="frogImage" />
      <h2 className='section-title'>Código</h2>
      <hr className='yellow-line'/>
      <p className='section-content'>
      </p>
      <CodeComponent />
      <h2 className='section-title'>Explicación del código</h2>
      <hr className='yellow-line'/>
      <p className='section-content'>
      El algoritmo de búsqueda directa, también conocido como fuerza bruta, funciona recorriendo el texto en el que se busca el patrón y comparando cada subcadena de longitud igual al patrón con el propio patrón. Comienza en la primera posición del texto y compara carácter por carácter con el patrón. Si encuentra una discrepancia, avanza a la siguiente posición del texto y repite el proceso. Este enfoque garantiza que todas las posibles posiciones del patrón en el texto sean evaluadas, lo que asegura encontrar todas las ocurrencias del patrón si existen.
      </p><p className='section-content'>A pesar de su simplicidad y facilidad de implementación, el algoritmo de búsqueda directa puede ser ineficiente para textos grandes o patrones largos, ya que en el peor de los casos realiza una cantidad de comparaciones proporcional al producto de las longitudes del texto y el patrón (O(n*m)). Sin embargo, su claridad y falta de necesidad de preprocesamiento hacen que sea útil en situaciones donde los textos son cortos o las búsquedas se realizan de manera esporádica. Su principal ventaja es la sencillez y la falta de complejidad en su lógica, haciéndolo fácil de entender y aplicar en una variedad de lenguajes de programación.
      </p>

        <div className='button-container'>
          
      <Link to="/algorpatrones/dist/Sandbox"className="comic-button" onClick={() => {scrollToTop()}}>Volver al Inicio</Link>
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

export default BusquedaDirectaPage
