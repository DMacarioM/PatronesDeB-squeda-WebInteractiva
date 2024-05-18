import {PasoDelAlgoritmo} from '../classes/PasoDelAlgoritmo'
import { bmAlgorithm, fuerzaBruta } from './algoritmosDeBusqueda';



//Los algoritmos deben devolver una Lista de pasos, con cada uno su mensaje,t.ejec (Posiciones)

export const algorithmHandler = (motherString:String , pattern:String, algorithm:String, addPaso:any ) => {
    //Recibe los valores del Input y ejecuta el algoritmo

    let result;

    switch(algorithm) {
        case 'FuerzaBruta':
            result = fuerzaBruta(motherString, pattern);
            break;
        case 'BM':
            result = bmAlgorithm(motherString, pattern);
            //TODO: En caso de ser BM/KMP se deberán mostrar las tablas antes de comenzar con el algoritmo
            //Al log se añaden igual, entonces(lo muestro en el canva) o lo muestro en una tabla lateral, setvisibleTrue para cada uno
            //, y al calcularla añadir el texto al log, (Puede estar ya rellena y explicarla), o lanzar una funcion que lo vaya rellenando y lanzando Logs
            break;
        // Add more cases as needed
        default:
            console.log('Invalid algorithm');
    }
    //Switch en función del valor de algorithm

    // Itera sobre la lista de pasos y realiza acciones con cada paso



    //TODO: Los pasos no deberían salir uno detrás de otro sin control, debería de haber un "gestor de logs/pasos", que en función de la velocidad/modo, ejecute el algoritmo más rápido o más lento
    //Realmente es coordinar el timeout con la animación / o llamada síncrona

    //Lanza los log una vez generados contra el log
    result.forEach((paso,index) => {
      /* Aquí puedes acceder a las propiedades del paso, por ejemplo:
      console.log(`Paso ${paso.id}: ${paso.message}`);*/
      
      setTimeout(() => {
        //Añadir los pasos al Log 
        addPaso(paso);

        
      },index*1000);
    });
  };
  