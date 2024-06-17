import React, { Component } from 'react'
import CodeComponentKMP from '../components/CodeComponentKMP';
import { Link } from 'react-router-dom';

const scrollToTop = () => {
  window.scrollBy({
    top: -window.innerHeight*50,
    behavior:'smooth'
  });
};

function KMPPage() {
  return (
    <div className='container'>
      <h1 className='title'>Knuth-Morris-Pratt</h1>
      <hr className='yellow-line'/>
      <p className='description'>
      El algoritmo de Knuth-Morris-Pratt (KMP) es un método eficiente para encontrar todas las ocurrencias de una subcadena en un texto más extenso. A diferencia de la búsqueda directa que compara el patrón con cada subcadena posible de manera secuencial, KMP utiliza una tabla de fallos para saltar sobre las posiciones del texto que sabe que no coincidirán, evitando así comparaciones innecesarias. Aunque su implementación es más compleja, KMP es preferido para operaciones de búsqueda de subcadenas en aplicaciones de procesamiento de texto debido a su eficiencia, especialmente con textos grandes y patrones con repeticiones. La clave de su eficiencia radica en evitar la revisión de los caracteres del texto que ya han sido comparados, utilizando para ello una tabla de fallos que registra la longitud del prefijo propio más largo que también es sufijo para cada posición en el patrón. Esta tabla se utiliza para determinar cuánto debe desplazarse el patrón cuando se encuentra una discrepancia. En resumen, KMP es un método sofisticado y eficiente que mejora la búsqueda directa al evitar comparaciones innecesarias y acelerar la búsqueda utilizando información de las comparaciones anteriores.
    </p>
    <img src={`./HomeFrog.png`} alt="Logo" className="frogImage" />
      <h2 className='section-title'>Código</h2>
      <hr className='yellow-line'/>
      <p className='section-content'>
      </p>
      <CodeComponentKMP />
      <h2 className='section-title'>Explicación del código</h2>
      <hr className='yellow-line'/>
      <p className='section-content'>
      El algoritmo KMP (Knuth-Morris-Pratt) mejora la eficiencia de la búsqueda de patrones al utilizar información sobre el patrón para reducir el número de comparaciones necesarias. Antes de comenzar la búsqueda, KMP realiza un preprocesamiento del patrón para construir el arreglo lps (longest prefix suffix). Este arreglo almacena las longitudes del sufijo más largo que también es un prefijo para cada subcadena del patrón. Esto permite que cuando se encuentra una discrepancia, el algoritmo pueda saltar partes del texto que ya han sido comparadas, en lugar de reiniciar la comparación desde el siguiente carácter del texto.
      </p>
      
     <p className='section-content'>
     Durante la búsqueda, KMP recorre el texto y el patrón simultáneamente. Si los caracteres coinciden, se avanza en ambos. Si hay una discrepancia, el algoritmo usa el arreglo lps para determinar cuántos caracteres del patrón se pueden omitir. Esto evita comparaciones redundantes y acelera la búsqueda, especialmente en textos largos. En el peor de los casos, el tiempo de ejecución de KMP es lineal con respecto a la suma de las longitudes del texto y el patrón, O(n + m), lo que lo hace significativamente más eficiente que el algoritmo de búsqueda directa en muchos casos.
     </p>
        <div className='button-container'>
        <Link to="/algorpatrones/dist/"className="comic-button" onClick={() => {scrollToTop()}}>Volver al inicio</Link>
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

export default KMPPage
