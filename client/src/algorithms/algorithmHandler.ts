import {PasoDelAlgoritmo} from '../classes/PasoDelAlgoritmo'
import { bmAlgorithm, fuerzaBruta, kmpAlgorithm } from './algoritmosDeBusqueda';


export const algorithmHandler = async (motherString:string , pattern:string, algorithm:string, addPaso:any , currentLogIndex:number, setCurrentLogIndex: any, lastLogIndex: number, setLastLogIndex:any,setbuttonsDisabled:any,execSpeed:number) => {
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
        default:
            console.log('Invalid algorithm');
    }

    //TODO: Gestion de TIEMPO

    var tiempoDeEspera = 4000/execSpeed;

    let newLastLogIndex=lastLogIndex;

    for (let i = 0; i < result.length; i++) {
        await new Promise(resolve => setTimeout(resolve, tiempoDeEspera));
        newLastLogIndex = newLastLogIndex + 1;
        //console.log("Lanza Paso " +newLastLogIndex);
        setLastLogIndex(newLastLogIndex);
        addPaso(result[i]);
        setCurrentLogIndex(newLastLogIndex); // Utiliza una función para actualizar el estado
    }
    setbuttonsDisabled(false);
  };
  