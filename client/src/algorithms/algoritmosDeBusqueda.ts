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
              message: ("Comprueba '" + pattern[j]  + "': patrón["+j+"] con '" + motherString[i + j] + "': cadenaMadre["+(i + j)+"].\n\tFallo \n\tAumenta la posición en la cadena madre"),
              motherString: motherString,
              pattern: pattern,
              status: 'FALLO',
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
              message: ("Comprueba '" + pattern[j]  + "': patrón["+j+"] con '"+motherString[i + j]+ "': cadenaMadre["+(i + j)+"].\n\tPatrón encontrado!\n\tAumenta la posición en la cadena madre"),
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
              message: ("Comprueba '" + pattern[j]  + "': patrón["+j+"] con '"+motherString[i + j]+ "': cadenaMadre["+(i + j)+"].\n\tAcierto!\n\tAumenta la posición del patrón y de la cadena madre"),
              motherString: motherString,
              pattern: pattern,
              status: 'ACIERTO',
              posEnCMadre: i,
              posEnPatron: j,             
              posComienzoPatron: i,
              patronDeBusqueda: "Fuerza Bruta"
            });
          }
        }
    }

    pasos.push({
      message: ("Fin de la ejecución. Patrón encontrado[ "+ exitos +" ]veces.\n\tNúmero de Comprobaciones[ " +comprobaciones+ " ].\n\tComo el patrón ya no cabe en la cadena madre.\n\tFinaliza la ejecución" ),
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
   */

   export const  kmpAlgorithm= (motherString, pattern) =>{
    const patternLength = pattern.length;
    const motherStringLength = motherString.length;
    const pasos: PasoDelAlgoritmo[] = [];
    const lps = computeLPSArray(pattern, patternLength,pasos);
    let i = 0; // index for text[]
    let j = 0; // index for pattern[]
    let posPatron=0;
    
    let exitos = 0;
    let comprobaciones=0

    while (i < motherStringLength) {
      if((i-j)>=motherStringLength-(patternLength-1)) break;
      comprobaciones++;
        if (pattern[j] === motherString[i]) {
            pasos.push({
              message: ("Comprueba '" + pattern[j]  + "': patrón["+j+"] con '" + motherString[i] + "': cadenaMadre["+(i)+"].\n\tAcierto!\n\tAumenta la posición del patrón y de la cadena madre"),
              motherString: motherString,
              pattern: pattern,
              status: 'ACIERTO',
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
            pasos[pasos.length - 1].message = ("Comprueba patrón["+j+"] con cadenaMadre["+(i + j)+"].\n\tPatrón encontrado!\n\tAumenta la posición de la cadena madre"),
            pasos[pasos.length - 1].posEnCMadre= i-1;
            exitos++;
            j = lps[j - 1];
        } else if (i < motherStringLength && pattern[j] !== motherString[i]) {
            if (j !== 0) {
              pasos.push({
                message: ("Comprueba '" + pattern[j]  + "' : patrón["+j+"] con '" + motherString[i] + "': cadenaMadre["+(i)+"].\n\tFallo \n\tBusca en la tabla Siguiente el valor \n\tdel carácter que ha fallado y aumenta\n\t la posición del patrón esa cantidad de posiciones,\n\t El valor de "+pattern[j]+" en la tabla es: tablaSgte["+pattern[j]+"]="+lps[j - 1]+""),
                motherString: motherString,
                pattern: pattern,
                status: 'FALLO',
                posEnCMadre: (i),
                posEnPatron: j,
                posComienzoPatron: (i-j),
                patronDeBusqueda: "KMP"
              });
                j = lps[j - 1];
            } else {
              pasos.push({
                message: ("Comprueba '" + pattern[j]  + "': patrón["+j+"] con '" + motherString[i] + "': cadenaMadre["+(i)+"].\n\tFallo \n\tBusca en la tabla Siguiente el valor del \n\tcarácter que ha fallado.\n\ttablaSgte["+pattern[j]+"] es 0 o -1,\n\tAumenta la posición del patrón y de la cadena madre"),
                motherString: motherString,
                pattern: pattern,
                status: 'FALLO',
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
      message: ("Fin de la ejecución. Patrón encontrado "+ exitos +" veces.\n\tNúmero de Comprobaciones: " +comprobaciones+ ".\n\tComo el patrón ya no cabe en la cadena madre.\n\tFinaliza la ejecución" ),
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
            message: `El carácter del patrón: patrón[${i}]=${pattern[i]}\n\tcoincide con el carácter en la posición\n\t actual de la longitud del prefijo más largo:\n\t patrón[${length}]=${pattern[length]}.\n\tPor lo tanto, incrementamos la longitud en uno\n\ty asignamos este valor a tablaSgte[${i}].`,
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
                message: `El carácter del patrón: patrón[${i}]=${pattern[i]}\n\tno coincide con el carácter en la posición \n\tactual de la longitud del prefijo más largo: \n\tpatrón[${length}]=${pattern[length]}.\n\tSin embargo, la longitud no es cero,\n\t por lo que actualizamos la longitud\n\t al valor de TablaSiguiente en la posición length - 1.\n\tlongitud=TablaSiguiente[${length - 1}=${lps[length - 1]}).`,
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
                message: `El carácter  del patrón: patrón[${i}]=${pattern[i]}\n\tno coincide con el carácter en la posición \n\tactual de la longitud del prefijo más largo: \n\tpatrón[${length}]=${pattern[length]}.\n\tY la longitud es cero. Por lo tanto,\n\tasignamos tablaSgte[${i}]=0 .`,
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
    const pasos: PasoDelAlgoritmo[] = [];
    const badCharTable = makeBadCharTable(pattern,pasos);
    const goodSufixTable = makeGoodSufixTable(pattern,pasos);
    let i = patternLength - 1;
    let j;
    let exitos = 0;
    let comprobaciones = 0;
   

    while (i < motherStringLength) {
        for (j = patternLength - 1; pattern[j] === motherString[i]; --i, --j) {
            comprobaciones++;
            pasos.push({
                message: ("Comprueba '" + pattern[j]  +"': patrón["+j+"] con '" + motherString[i] + "': cadenaMadre["+(i)+"].\n\tAcierto!\n\tAumenta la posición del patrón y de la cadena madre"),
                motherString: motherString,
                pattern: pattern,
                status: 'ACIERTO',
                posEnCMadre: i,
                posEnPatron: j,
                posComienzoPatron: i-j,
                patronDeBusqueda: "Boyer-Moore"
            });
            if (j === 0) {
                pasos[pasos.length - 1].status = 'EXITO';
                pasos[pasos.length - 1].message = ("Comprueba '" + pattern[j+1]  +"': patrón["+(j+1)+"] con '" + motherString[i+1] + "': cadenaMadre["+(i+1)+"].\n\tPatrón encontrado!\n\tAumenta la posición a comprobar la cadena madre");
                exitos++;
                break;
            }
        }
        if(j!=0){
            pasos.push({
              message: ("Comprueba '" + pattern[j]  + "': patrón["+j+"] con '" + motherString[i] + "': cadenaMadre["+(i)+"].\n\tFallo!\n\tRecoge el mayor valor entre las tablas del buen sufijo y de malos caracteres.\n\tLos valores son: Buen Sufijo=tablaD2["+(patternLength - 1 - j)+"]="+goodSufixTable[patternLength - 1 - j]+", y Malos Caracteres=tablaD1["+(motherString[i] || pattern.length)+"]="+badCharTable[motherString[i] || pattern.length]+".\n\tentonces nos quedamos con: "+(badCharTable[motherString[i]] !== undefined ? badCharTable[motherString[i]] : pattern.length)+""),
              motherString: motherString,
              pattern: pattern,
              status: 'FALLO',
              posEnCMadre: i,
              posEnPatron: j,
              posComienzoPatron: i-j,
              patronDeBusqueda: "Boyer-Moore"
          });
        }
        i += Math.max(goodSufixTable[patternLength - 1 - j], badCharTable[motherString[i]] !== undefined ? badCharTable[motherString[i]] : pattern.length);
      }

    pasos.push({
        message: ("Fin de la ejecución. Patrón encontrado " + exitos + " veces.\n\tNúmero de Comprobaciones: " + comprobaciones + ".\n\tComo el patrón ya no cabe en la cadena madre.\n\tFinaliza la ejecución"),
        motherString: motherString,
        pattern: pattern,
        status: 'FIN',
        patronDeBusqueda: "Boyer-Moore"
    });

    return pasos;
}

function makeBadCharTable(pattern: string,pasos: PasoDelAlgoritmo[]) {
    let table = {};
    
    for (let i = 0; i <= pattern.length - 1; i++) {
        table[pattern[i]] = pattern.length - 1 - (table[pattern[i]] !== undefined ? Math.max(i,table[pattern[i]]) : i);
        pasos.push({
          message: `D1[${i}] = ${table[pattern[i]]}. Ajuste en la tabla de malos caracteres \n\tpara el carácter '${pattern[i]}', con desplazamiento ${pattern.length - 1 - (table[pattern[i]] !== undefined ? Math.max(i, table[pattern[i]]) : i)}.`,
          pattern: pattern,
          posEnPatron: i,
          status: 'TABLA',
          patronDeBusqueda: "Boyer-Moore",
          tablaD1: [table],
          tableNumber: 1
      });
    }

    return table;
}

function makeGoodSufixTable(pattern: string, pasos: PasoDelAlgoritmo[]) {
  let table = new Array(pattern.length).fill(pattern.length);
  let lastPrefixPosition = pattern.length;
  
  for (let i = pattern.length; i > 0; --i) {
    if (isPrefix(pattern, i)) lastPrefixPosition = i;
    table[pattern.length - i] = lastPrefixPosition - i + pattern.length;
  }
  
  for (let i = 0; i < pattern.length - 1; ++i) {
    let slen = suffixLength(pattern, i);
    table[slen] = pattern.length - 1 - i + slen;
  }
  
  for (let i = pattern.length; i >= 0; --i) {
    pasos.push({
        message: `D2[${pattern.length - i}] = ${table[pattern.length - i]}. En la posición ${pattern.length - i} del patrón,\n\t el sufijo tiene un desplazamiento de ${lastPrefixPosition - i + pattern.length}.`,
        pattern: pattern,
        posEnPatron: i,
        status: 'TABLA',
        patronDeBusqueda: "Boyer-Moore",
        tablaD2: [table],
        tableNumber: 2
    });
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

