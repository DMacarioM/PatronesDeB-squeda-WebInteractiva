import {PasoDelAlgoritmo} from '../classes/PasoDelAlgoritmo'
import { bmAlgorithm, fuerzaBruta, kmpAlgorithm } from './algoritmosDeBusqueda';


export const algorithmHandler = async (motherString:string , pattern:string, algorithm:string, addPaso:any , currentLogIndex:number, setCurrentLogIndex: any, lastLogIndex: number, setLastLogIndex:any,) => {
    //Recibe los valores del Input y ejecuta el algoritmo
    let result: PasoDelAlgoritmo[]  = [];

    switch(algorithm) {
        case 'FuerzaBruta':
            result = fuerzaBruta(motherString, pattern);
            break;
        case 'Boyer-Moore':
            result = bmAlgorithm(motherString, pattern);
            //TODO: En caso de ser BM/KMP se deberán mostrar las tablas antes de comenzar con el algoritmo
            break;
        case 'KMP':
            result = kmpAlgorithm(motherString, pattern);
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


    let newLastLogIndex=lastLogIndex;

    for (let i = 0; i < result.length; i++) {
        if(i==0){
            tiempoDeEspera=2000;
        }else{
            tiempoDeEspera=4000; //Recoger de algun sitio
        }
        await new Promise(resolve => setTimeout(resolve, tiempoDeEspera));
        newLastLogIndex = newLastLogIndex + 1;
        console.log("Lanza Paso " +newLastLogIndex);
        setLastLogIndex(newLastLogIndex);
        //result[i].id=newLastLogIndex;
        addPaso(result[i]);
        setCurrentLogIndex(newLastLogIndex); // Utiliza una función para actualizar el estado
    }
  };
  