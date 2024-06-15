import {PasoDelAlgoritmo} from '../classes/PasoDelAlgoritmo'
import { boyerMooreAlgorithm, fuerzaBruta, kmpAlgorithm } from './algoritmosDeBusqueda';


export const algorithmHandler = async (motherString:string , pattern:string, algorithm:string, addPaso:any , currentLogIndex:number, setCurrentLogIndex: any, lastLogIndex: number, setLastLogIndex:any,setbuttonsDisabled:any,execSpeed:number) => {
    //Recibe los valores del Input y ejecuta el algoritmo
    let result: PasoDelAlgoritmo[]  = [];

    switch(algorithm) {
        case 'FuerzaBruta':
            result = fuerzaBruta(motherString, pattern);
            break;
        case 'Boyer-Moore':
            result = boyerMooreAlgorithm(motherString, pattern);
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
        setLastLogIndex(newLastLogIndex);
        setCurrentLogIndex(newLastLogIndex); // Utiliza una función para actualizar el estado
        addPaso(result[i]); 
    }

    setbuttonsDisabled(false);
  };
  