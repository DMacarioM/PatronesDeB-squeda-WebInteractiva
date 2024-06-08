import {PasoDelAlgoritmo} from '../classes/PasoDelAlgoritmo'

 /******
   * 
   * TODO: Devolver cantidad de comprobaciones
   * TODO: Devolver la tablas
   * 
   * Algoritmo Fuerza BRUTA
   * 
   * 
   */

export const fuerzaBruta = (motherString, pattern) => {
    // Crea una lista vacía para almacenar los pasos
    const pasos: PasoDelAlgoritmo[]  = [];

    const n = motherString.length;
    const m = pattern.length;
    let exitos=0;
    let comprobaciones=0;
    for (let i = 0; i <= n - m; i++) {
        let j;
        for (j = 0; j < m; j++) {
          comprobaciones++;
          //Paso  
          if (motherString[i + j] !== pattern[j]) {
            pasos.push({
              message: ("Comprueba '" + pattern[j]  + "' ["+j+" en patrón] con '" + motherString[i + j] + "'["+(i + j)+" en cadena madre]. Como ha fallado, aumenta la posición inicial en la cadena madre, ahora es: ["+(i+1)+"]"),
              motherString: motherString,
              pattern: pattern,
              status: 'Fallo',
              posEnCMadre: i,
              posComienzoPatron: i,
              posEnPatron: j,
              patronDeBusqueda: "Fuerza Bruta"
            });
            break;
          }
          if (j == m-1) {
            //resultados.push(i); 
            pasos.push({
              message: ("Comprueba '"+pattern[j]+ "' ["+j+" en patrón] con '"+motherString[i + j]+"' ["+(i + j)+" en cadena madre]. Patrón encontrado!\n Ahora aumenta la posición inicial en la cadena madre, ahora es: ["+(i+1)+"]"),
              motherString: motherString,
              pattern: pattern,
              status: 'EXITO',
              posEnCMadre: i,
              posEnPatron: j,
              posComienzoPatron: i,
              patronDeBusqueda: "Fuerza Bruta"
            });
            // Se encontró una ocurrencia (es correcta la ultima posición del patrón(j=longitud de pat))
            exitos++;
          }else{
            //El caracter coincide
            pasos.push({
              message: ("Comprueba '"+pattern[j]+"' ["+j+" en patrón] con '"+motherString[i + j]+"' ["+(i + j)+" en cadena madre]. Acierto! Ahora comprueba la posición ["+(j+1)+"] del patrón con el siguiente caracter de la cadena madre: Posición["+(i+j+1)+"]"),
              motherString: motherString,
              pattern: pattern,
              status: 'Acierto',
              posEnCMadre: i,
              posEnPatron: j,             
              posComienzoPatron: i,
              patronDeBusqueda: "Fuerza Bruta"
            });
          }
        }
    }

    pasos.push({
      message: ("Fin de la ejecución. Patrón encontrado[ "+ exitos +" ]veces. Número de Comprobaciones[ " +comprobaciones+ " ]. Como el patrón ya no cabe en la cadena madre. Finaliza la ejecución" ),
      motherString: motherString,
      pattern: pattern,
      status: 'FIN',
      patronDeBusqueda: "Fuerza Bruta"
    });//Este paso lo puedo utilizar para remarcar los patrones encontrados en la cadena madre
    return pasos;
  };


   /******
   * 
   * 
   * 
   * Algoritmo KMP
   * 
   * SE EJECUTA PERO NO CORRECTAMENTE, EL PATRON LO ENCUENTRA PERO EL OUTPUT NO TIENE SENTIDO (HACER OTRA FUNCION ESTABLECERDIBUJO?)
   */

   export const  kmpAlgorithm= (motherString, pattern) =>{
    const patternLength = pattern.length;
    const motherStringLength = motherString.length;
    const pasos: PasoDelAlgoritmo[] = [];
    const lps = computeLPSArray(pattern, patternLength,pasos);
    //console.log("lps "+lps);
    let i = 0; // index for text[]
    let j = 0; // index for pattern[]
    let posPatron=0;
    
    let exitos = 0;
    let comprobaciones=0

    while (i < motherStringLength) {
      comprobaciones++;
        if (pattern[j] === motherString[i]) {
            pasos.push({
              message: ("Comprueba '" + pattern[j]  +"' ["+j+" en patrón] con '" + motherString[i] + "' ["+(i)+" en cadena madre]. Acierto! Ahora comprueba la posición ["+(j+1)+"] del patrón con el siguiente caracter de la cadena madre: Posición ["+(i+1)+"]"),
              motherString: motherString,
              pattern: pattern,
              status: 'Acierto',
              posEnCMadre: (i),
              posEnPatron: j,
              posComienzoPatron: (i-j),
              patronDeBusqueda: "KMP"
            });
            j++;
            i++;
        }
        if (j === patternLength) {
            pasos[pasos.length - 1].status = 'EXITO';
            pasos[pasos.length - 1].message = ("Comprueba '"+pattern[j]+ "' ["+j+" en patrón] con '"+motherString[i + j]+"' ["+(i + j)+" en cadena madre]. Patrón encontrado!\n Ahora aumenta la posición a comprobar la cadena madre, ahora es: ["+(i+1)+"]"),
            pasos[pasos.length - 1].posEnCMadre= i-1;
            //console.log(`Éxito en la posición ${i - j} de la cadena madre`);
            exitos++;
            j = lps[j - 1];
        } else if (i < motherStringLength && pattern[j] !== motherString[i]) {
            //console.log(`Fallo en la posición ${i} de la cadena madre`);
            if (j !== 0) {
              pasos.push({
                message: ("Comprueba '" + pattern[j]  + "' ["+j+" en patrón] con '" + motherString[i] + "'["+(i)+" en cadena madre]. Como ha fallado, Busca en la tabla Siguiente el valor del carácter que ha fallado y aumenta la posición del patrón esas posiciones, El valor de "+pattern[j]+" en la tabla es: ["+lps[j - 1]+"]"),
                motherString: motherString,
                pattern: pattern,
                status: 'Fallo',
                posEnCMadre: (i),
                posEnPatron: j,
                posComienzoPatron: (i-j),
                patronDeBusqueda: "KMP"
              });
              //console.log(`Saltando a la posición ${lps[j - 1]} del patrón`);
                j = lps[j - 1];
            } else {
              pasos.push({
                message: ("Comprueba '" + pattern[j]  + "' ["+j+" en patrón] con '" + motherString[i] + "'["+(i)+" en cadena madre]. Como ha fallado, Busca en la tabla Siguiente el valor del carácter que ha fallado. En este caso, si el valor en la tabla es 0 o -1, y aumenta la posición inicial del patrón una posición Pos["+(i+1)+"]"),
                motherString: motherString,
                pattern: pattern,
                status: 'Fallo',
                posEnCMadre: (i),
                posEnPatron: j,
                posComienzoPatron: (i-j),
                patronDeBusqueda: "KMP"
              });
                i = i + 1;
            }
        }
    }
    pasos.push({
      message: ("Fin de la ejecución. Patrón encontrado "+ exitos +" veces. Número de Comprobaciones: " +comprobaciones+ ". Como el patrón ya no cabe en la cadena madre. Finaliza la ejecución" ),
      motherString: motherString,
      pattern: pattern,
      status: 'FIN',
      patronDeBusqueda: "KMP"
    });

    return pasos;
}

function computeLPSArray(pattern: string, patternLength: number , pasos: PasoDelAlgoritmo[]): number[] {
  let length = 0;
  let i = 1;
  let lps = new Array(patternLength).fill(0);

  while (i < patternLength) {
      if (pattern[i] === pattern[length]) {
          length++;
          lps[i] = length;
          pasos.push({
            message: `El carácter en la posición ${i} del patrón (${pattern[i]}) coincide con el carácter en la posición actual de la longitud del prefijo más largo (${length}). Por lo tanto, incrementamos la longitud en uno y asignamos este valor a TablaSiguiente[${i}].`,
            pattern: pattern,
            posEnPatron:i,
            status: 'TABLA',
            patronDeBusqueda: "KMP",
            tablaSgte: [...lps],
          });
          i++;
      } else {
          if (length !== 0) {
              pasos.push({
                message: `El carácter en la posición ${i} del patrón (${pattern[i]}) no coincide con el carácter en la posición actual de la longitud del prefijo más largo (${length}). Sin embargo, la longitud no es cero, por lo que actualizamos la longitud al valor de TablaSiguiente en la posición length - 1 (TablaSiguiente[${length - 1}]).`,
                pattern: pattern,
                status: 'TABLA',
                posEnPatron:i,
                patronDeBusqueda: "KMP",
                tablaSgte: [...lps],
              });
              length = lps[length - 1];
          } else {
              lps[i] = 0;
              pasos.push({
                message: `El carácter en la posición ${i} del patrón (${pattern[i]}) no coincide con el carácter en la posición actual de la longitud del prefijo más largo (${length}), y la longitud es cero. Por lo tanto, asignamos TablaSiguiente[${i}] a cero.`,
                pattern: pattern,
                status: 'TABLA',
                posEnPatron:i,
                patronDeBusqueda: "KMP",
                tablaSgte: [...lps],
              });
              i++;
          }
      }
  }
  return lps;
}

  /******
   * 
   * 
   * 
   * Algoritmo BM
   * 
   * 
   */

  export const boyerMooreAlgorithm = (motherString: string, pattern: string) => {
    const motherStringLength = motherString.length;
    const patternLength = pattern.length;
    const badCharTable = makeBadCharTable(pattern);
    const goodSufixTable = makeGoodSufixTable(pattern);
    let i = patternLength - 1;
    let j;
    let exitos = 0;
    let comprobaciones = 0;
    const pasos: PasoDelAlgoritmo[] = [];

    console.log("gs- "+goodSufixTable);
    console.log(badCharTable);

    while (i < motherStringLength) {
        for (j = patternLength - 1; pattern[j] === motherString[i]; --i, --j) {
            comprobaciones++;
            pasos.push({
                message: ("Comprueba '" + pattern[j]  +"' ["+j+" en patrón] con '" + motherString[i] + "' ["+(i)+" en cadena madre]. Acierto!Ahora comprueba la posición ["+(j-1)+"] del patrón con el siguiente caracter de la cadena madre: Posición ["+(i-1)+"]"),
                motherString: motherString,
                pattern: pattern,
                status: 'Acierto',
                posEnCMadre: i,
                posEnPatron: j,
                posComienzoPatron: i-j,
                patronDeBusqueda: "Boyer-Moore"
            });
            if (j === 0) {
                pasos[pasos.length - 1].status = 'EXITO';
                pasos[pasos.length - 1].message = ("Patrón encontrado!\n Ahora aumenta la posición a comprobar la cadena madre, ahora es: ["+(i+patternLength-1)+"]");
                exitos++;
                break;
            }
        }
        if(j!=0){
            pasos.push({
              message: ("Comprueba '" + pattern[j]  + "' ["+j+" en patrón] con '" + motherString[i] + "' ["+(i)+" en cadena madre]. Fallo! Como ha fallado, Recoge el mayor valor entre las tablas del buen sufijo y de malos caracteres. En este caso, Los valores son: Buen Sufijo-["+goodSufixTable[patternLength - 1 - j]+"] y Malos Caracteres-["+badCharTable[motherString[i] || pattern.length]+"], entonces nos quedamos con: ["+(badCharTable[motherString[i]] !== undefined ? badCharTable[motherString[i]] : pattern.length)+"]"),
              motherString: motherString,
              pattern: pattern,
              status: 'Fallo',
              posEnCMadre: i,
              posEnPatron: j,
              posComienzoPatron: i-j,
              patronDeBusqueda: "Boyer-Moore"
          });
        }
        i += Math.max(goodSufixTable[patternLength - 1 - j], badCharTable[motherString[i]] !== undefined ? badCharTable[motherString[i]] : pattern.length);
      }

    pasos.push({
        message: ("Fin de la ejecución. Patrón encontrado " + exitos + " veces. Número de Comprobaciones: " + comprobaciones + ". Como el patrón ya no cabe en la cadena madre. Finaliza la ejecución"),
        motherString: motherString,
        pattern: pattern,
        status: 'FIN',
        patronDeBusqueda: "Boyer-Moore"
    });

    return pasos;
}

function makeBadCharTable(pattern: string) {
    let table = {};
    for (let i = 0; i < pattern.length - 1; ++i) {
        table[pattern[i]] = pattern.length - 1 - i;
    }
    table[pattern[pattern.length - 1]] = pattern.length;
    return table;
}

function makeGoodSufixTable(pattern: string) {
    let table = new Array(pattern.length).fill(0);
    let lastPrefixPosition = pattern.length;
    for (let i = pattern.length; i > 0; --i) {
        if (isPrefix(pattern, i)) lastPrefixPosition = i;
        table[pattern.length - i] = lastPrefixPosition - i + pattern.length;
    }
    for (let i = 0; i < pattern.length - 1; ++i) {
        let slen = suffixLength(pattern, i);
        table[slen] = pattern.length - 1 - i + slen;
    }
    return table;
}

function isPrefix(pattern: string, p: number) {
    for (let i = p, j = 0; i < pattern.length; ++i, ++j) {
        if (pattern[i] !== pattern[j]) return false;
    }
    return true;
}

function suffixLength(pattern: string, p: number) {
    let len = 0;
    for (let i = p, j = pattern.length - 1; i >= 0 && pattern[i] === pattern[j]; --i, --j) {
        len += 1;
    }
    return len;
}
