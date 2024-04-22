import React, { useContext,useState  } from 'react';
import {PasoDelAlgoritmo} from '../classes/PasoDelAlgoritmo'



//Los algoritmos deben devolver una Lista de pasos, con cada uno su mensaje,t.ejec (Posiciones)

export const fuerzaBruta = (motherString, pattern) => {
    // Crea una lista vacía para almacenar los pasos
    const pasos: PasoDelAlgoritmo[]  = [];

    const n = motherString.length;
    const m = pattern.length;

    for (let i = 0; i <= n - m; i++) {
        let j;
        for (j = 0; j < m; j++) {
          //Paso  
          if (motherString[i + j] !== pattern[j]) {
            pasos.push({
              message: ("Comprueba '"+motherString[i + j]+ "' con '"+pattern[j]+"'."),
              motherString: motherString,
              pattern: pattern,
              status: 'Fallo',
              posi:i,
              posj:j
            });
            break;
          }
          if (j == m-1) {
            //resultados.push(i); 
            pasos.push({
              message: ("Comprueba '"+motherString[i + j]+ "' con '"+pattern[j]+"'."),
              motherString: motherString,
              pattern: pattern,
              status: 'Patrón encontrado!',
              posi:i,
              posj:j,
            });
            // Se encontró una ocurrencia (es correcta la ultima posición del patrón(j=longitud de pat))
          }else{
            //El caracter coincide
            pasos.push({
              message: ("Comprueba '"+motherString[i + j]+ "' con '"+pattern[j]+"'."),
              motherString: motherString,
              pattern: pattern,
              status: 'Acierto'
            });
          }
        }
    }

    return pasos;
  };
  
  //Algoritmo BM
  export const bmAlgorithm = (motherString, pattern) => {
    // Crea una lista vacía para almacenar los pasos
    const pasos: PasoDelAlgoritmo[]  = [];

    const n = motherString.length;
    const m = pattern.length;

    return pasos;
  };
  