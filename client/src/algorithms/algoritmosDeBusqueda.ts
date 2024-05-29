import {PasoDelAlgoritmo} from '../classes/PasoDelAlgoritmo'



//Los algoritmos deben devolver una Lista de pasos, con cada uno su mensaje,t.ejec (Posiciones)

//TODO: Para los mensajes, puedo devolver una lista de mensajes, y en logComponent Imprimo uno a uno los mensajes de un mismo paso, pero como en tres salidas (dentro de la misma section)

export const fuerzaBruta = (motherString, pattern) => {
    // Crea una lista vacía para almacenar los pasos
    const pasos: PasoDelAlgoritmo[]  = [];

    const n = motherString.length;
    const m = pattern.length;
    let exitos=0;

    for (let i = 0; i <= n - m; i++) {
        let j;
        for (j = 0; j < m; j++) {
          //Paso  
          if (motherString[i + j] !== pattern[j]) {
            pasos.push({
              message: ("Comprueba '" + pattern[j]  + "'("+j+" en patrón) con '" + motherString[i + j] + "'("+(i + j)+" en cadena madre). Como ha fallado, aumenta la posición en la cadena madre, ahora es: "+(i+1)),
              motherString: motherString,
              pattern: pattern,
              status: 'Fallo',
              posEnCMadre: i,
              posEnPatron: j,
              patronDeBusqueda: "Fuerza Bruta"
            });
            break;
          }
          if (j == m-1) {
            //resultados.push(i); 
            pasos.push({
              message: ("Comprueba '"+pattern[j]+ "'("+j+" en patrón) con '"+motherString[i + j]+"'("+(i + j)+" en cadena madre). Patrón encontrado!\n Ahora aumenta la posición en la cadena madre, ahora es: "+(i+1)),
              motherString: motherString,
              pattern: pattern,
              status: 'EXITO',
              posEnCMadre: i,
              posEnPatron: j,
              patronDeBusqueda: "Fuerza Bruta"
            });
            // Se encontró una ocurrencia (es correcta la ultima posición del patrón(j=longitud de pat))
            exitos++;
          }else{
            //El caracter coincide
            pasos.push({
              message: ("Comprueba '"+pattern[j]+  "'("+j+" en patrón) con '"+motherString[i + j]+"'("+(i + j)+" en cadena madre). Acierto! Ahora comprueba la posición "+j+" del patrón con el siguiente caracter de la cadena madre, ahora es: "+(i+1)),
              motherString: motherString,
              pattern: pattern,
              status: 'Acierto',
              posEnCMadre: i,
              posEnPatron: j,
              patronDeBusqueda: "Fuerza Bruta"
            });
          }
        }
    }

    pasos.push({
      message: ("Fin de la ejecución. Patrón encontrado "+ exitos +" veces"),
      motherString: motherString,
      pattern: pattern,
      status: 'FIN',
      patronDeBusqueda: "Fuerza Bruta"
    });//Este paso lo puedo utilizar para remarcar los patrones encontrados en la cadena madre
    return pasos;
  };





  // Función para generar la tabla de malos caracteres
function generateBadCharTable(pattern: string) {
  const badCharTable = {};
  for (let i = 0; i < pattern.length; i++) {
    badCharTable[pattern[i]] = i;
  }
  return badCharTable;
}

  // Función para generar la tabla de buenos sufijos
  function generateGoodSuffixTable(pattern: string) {
    const m = pattern.length;
    let lastPrefixIndex = m;
    const goodSuffixTable = new Array(m);
    for (let i = m - 1; i >= 0; i--) {
      if (isPrefix(pattern, i + 1)) {
        lastPrefixIndex = i + 1;
      }
      goodSuffixTable[i] = lastPrefixIndex + m - i - 1;
    }
    for (let i = 0; i < m - 1; i++) {
      const suffixLen = suffixLength(pattern, i);
      goodSuffixTable[suffixLen] = m - 1 - i + suffixLen;
    }
    return goodSuffixTable;
  }

  // Función para verificar si el patrón es un prefijo del patrón
  function isPrefix(pattern: string, p: number) {
    for (let i = p, j = 0; i < pattern.length; i++, j++) {
      if (pattern[i] != pattern[j]) {
        return false;
      }
    }
    return true;
  }

  // Función para obtener la longitud del sufijo más largo que es también un prefijo
  function suffixLength(pattern: string, p: number) {
    let len = 0;
    for (let i = p, j = pattern.length - 1; i >= 0 && pattern[i] == pattern[j]; i--, j--) {
      len += 1;
    }
    return len;
  }

  // Algoritmo de Boyer-Moore
  export const bmAlgorithm = (motherString: string, pattern: string) => {
    const pasos: PasoDelAlgoritmo[]  = [];
    const n = motherString.length;
    const m = pattern.length;
    let exitos = 0;

    //TODO: Añadir también los pasos de las tablas
    const badCharTable = generateBadCharTable(pattern);
    const goodSuffixTable = generateGoodSuffixTable(pattern);

    console.log(badCharTable);
    console.log(goodSuffixTable);

    let s = 0; // s es el desplazamiento del patrón con respecto al texto
    while (s <= (n - m)) {
      let j = m - 1;
      let matchFound = false;

      console.log(pattern[j] +" y "+ motherString[s+j]);
      console.log(goodSuffixTable[j] +" y "+ (j - badCharTable[motherString[s+j]]));
      while (j >= 0 && pattern[j] == motherString[s+j]) {
        //Compara de derecha a izquierda

        //El si compara un caracter mayor que con pos>=0 y coincide, es un acierto
        pasos.push({
          message: ("Comprueba '" + pattern[j]  + "' con '" + motherString[s + j] + "'."),
          motherString: motherString,
          pattern: pattern,
          status: 'Acierto',
          posEnCMadre: s,
          posEnPatron: j,
          patronDeBusqueda: "Booyer-Moore"
        });
        j--;
        if (j < 0) {
          matchFound = true;
        }
      }
      if (matchFound) {
        /*pasos.push({
          message: ("Comprueba '" + pattern[j]  + "' con '" + motherString[s + j] + "'. POS - "+s),
          motherString: motherString,
          pattern: pattern,
          status: 'EXITO',
          posEnCMadre: s,
          posEnPatron: j,
          patronDeBusqueda: "Boyer-Moore"
        });*/
        //Cambia el estado del paso anterior
        pasos[pasos.length - 1].status = 'EXITO';
        exitos++;
        s += (s+m < n) ? goodSuffixTable[0] : 1; 
      } else {
        pasos.push({
          message: ("Comprueba '" + pattern[j]  + "' con '" + motherString[s + j] + "'."),
          motherString: motherString,
          pattern: pattern,
          status: 'Fallo',
          posEnCMadre: s,
          posEnPatron: j,
          patronDeBusqueda: "Booyer-Moore"
        });
        const badCharShift = badCharTable[motherString[s+j]] !== undefined ? j - badCharTable[motherString[s+j]] : j + 1;
        s += Math.max(goodSuffixTable[j], badCharShift);
      }
    }

    pasos.push({
      message: ("Fin de la ejecución. Patrón encontrado "+ exitos +" veces"),
      motherString: motherString,
      pattern: pattern,
      status: 'FIN',
      patronDeBusqueda: "Boyer-Moore"
    });

    return pasos;
  };

    