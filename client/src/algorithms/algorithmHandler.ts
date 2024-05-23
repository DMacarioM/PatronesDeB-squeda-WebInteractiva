import {PasoDelAlgoritmo} from '../classes/PasoDelAlgoritmo'
import { bmAlgorithm, fuerzaBruta } from './algoritmosDeBusqueda';


export const algorithmHandler = async (motherString:String , pattern:String, algorithm:String, addPaso:any , currentLogIndex:number, setCurrentLogIndex: any) => {
    //Recibe los valores del Input y ejecuta el algoritmo
    let result: PasoDelAlgoritmo[]  = [];;

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

    var tiempoDeEspera = 7000;


    for (let i = 0; i < result.length; i++) {
        if(i==0){
            console.log("tiempospera");
            tiempoDeEspera=1000;
        }else{
            tiempoDeEspera=4000; //Recoger de algun sitio
        }
        await new Promise(resolve => setTimeout(resolve, tiempoDeEspera));
        console.log("Lanza Paso");
        setCurrentLogIndex(prevIndex => prevIndex + 1); // Utiliza una función para actualizar el estado
        addPaso(result[i]);
    }
  };
  