import React, { Component } from 'react'

function HomePage() {
  return (
    <div className='container'>
      <h1 className='title'>Algoritmos de Búsqueda de Subcadenas</h1>
      <hr className='yellow-line'/>
      <p className='description'>
        ¡Bienvenido a nuestra página dedicada a los algoritmos de búsqueda de subcadenas! Aquí podrás explorar los fundamentos clave del análisis de texto, enfocándonos en cómo identificar patrones específicos dentro de cadenas de texto más extensas. Desde los algoritmos de búsqueda simple hasta las técnicas avanzadas, nuestro objetivo es hacer accesible este conocimiento crucial para estudiantes y entusiastas por igual. Prepárate para profundizar en el fascinante mundo de la búsqueda de subcadenas con nosotros.
    </p>

    <img src="/HomeFrog.png" alt="Logo" className="frogImage" />
      <h2 className='section-title'>Búsqueda de Patrones</h2>
      <hr className='yellow-line'/>
      <p className='section-content'>
      La Búsqueda de patrones de texto se refiere al proceso de encontrar ocurrencias de un patrón dado dentro de un texto más extenso. Este patrón puede ser una cadena de caracteres (subcadena) o incluso una expresión regular que describe un conjunto de cadenas posibles.
      El objetivo principal de la Búsqueda de patrones de texto es identificar todas las posiciones dentro del texto donde el patrón buscado coincide. Esto es fundamental en diversas áreas como el procesamiento de lenguaje natural, la bioinformática, la minería de datos y la compresión de datos.
      </p>
      <h2 className='section-title'>Para qué sirven</h2>
      <hr className='yellow-line'/>
      <p className='section-content'>
      La Búsqueda de patrones de texto es fundamental en numerosas disciplinas informáticas y científicas. Permite identificar ocurrencias específicas dentro de textos extensos, facilitando desde el análisis de datos en minería hasta la búsqueda de secuencias genéticas en bioinformática. Además, es crucial en el procesamiento de lenguaje natural para la extracción de información semántica y en la seguridad informática para la detección de amenazas digitales. En resumen, esta técnica es esencial para la automatización y el análisis eficiente de grandes volúmenes de datos textuales en una amplia gama de aplicaciones prácticas y científicas.
      </p>
      <div className='button-container'>
        <a href='/BD'>
            <button className="comic-button">Búsqueda Directa</button>
        </a>
        </div>
      <h2 className='section-title'>Tipos de Patrones</h2>
      <hr className='yellow-line'/>
      <p className='section-content'>
      En la Búsqueda de patrones de texto, los patrones se clasifican en simples y múltiples. Los patrones simples implican la búsqueda directa de una única cadena de caracteres dentro de un texto, fundamental para tareas básicas de análisis textual. Por otro lado, los patrones múltiples abarcan la búsqueda simultánea de varias cadenas dentro de un mismo texto, mejorando la eficiencia al permitir la identificación de múltiples elementos de interés de manera coordinada.
      </p>
      <p className='section-content'> Esta página se centra en explicar tres algoritmos clave para la búsqueda de patrones: la Búsqueda Directa, el Algoritmo de Knuth-Morris-Pratt (KMP) y el Algoritmo de Boyer-Moore (BM). La Búsqueda Directa es el método más elemental, comparando el patrón directamente con cada posible subcadena del texto. Por otro lado, KMP y BM son algoritmos más avanzados y eficientes. KMP utiliza una tabla de "salto" para evitar comparaciones redundantes, mientras que BM emplea heurísticas para realizar saltos grandes en el texto, minimizando el número de comparaciones necesarias. Estos algoritmos no solo son fundamentales para entender cómo funcionan los sistemas de búsqueda modernos, sino que también son cruciales en aplicaciones como la bioinformática, la seguridad informática y el procesamiento de lenguaje natural.</p>
        <div className='button-container'>
        <a href='/KMP'>
            <button className="comic-button">Knuth-Morris-Pratt</button>
        </a>
        <a href='/BM'>
            <button className="comic-button">Boyer Moore</button>
        </a>
        </div>
      <h2 className='section-title'>Prueba los patrones!</h2>
      <hr className='yellow-line'/>
      <p className='section-content'>
        Te invitamos a probar estos algoritmos en nuestra sección Sandbox. Allí podrás experimentar con diferentes patrones y textos para ver cómo funcionan estos algoritmos en la práctica.
      </p>
      <div className='button-container'>
        <a href='/Sandbox' className="codepen-button"><span>Sandbox</span></a>
      </div>
    </div>
  )
} 

export default HomePage
