import {PasoDelAlgoritmo} from '../classes/PasoDelAlgoritmo'



//Los algoritmos deben devolver una Lista de pasos, con cada uno su mensaje,t.ejec (Posiciones)

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
              message: ("Comprueba '" + motherString[i + j] + "' con '" + pattern[j] + "'."),
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
              message: ("Comprueba '"+motherString[i + j]+ "' con '"+pattern[j]+"'."),
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
              message: ("Comprueba '"+motherString[i + j]+ "' con '"+pattern[j]+"'."),
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
  
  //Algoritmo BM
  export const bmAlgorithm = (motherString, pattern) => {
    // Crea una lista vacía para almacenar los pasos
    const pasos: PasoDelAlgoritmo[]  = [];

    const n = motherString.length;
    const m = pattern.length;

    return pasos;
  };
  