import Konva from "konva";

// types.ts 
//todo:Revisar el uso de todos los elementos
export type PasoDelAlgoritmo = {
    id?: number;
    message: string;
    status:String;
    
    motherString?: String;
    pattern:String;

    patronDeBusqueda:String;

    posEnCMadre?: number;
    posEnPatron?: number;

    posComienzoPatron?:number;
    alturaY?: number;

    tablaD1?: any;//Bad Match
    tablaD2?: any;
    
    tablaSgte?: any;

    lastExecId?: number;
    
  };
  //Cuando se imprima tiene que tener sus cadenas, para ir de un ejemplo a otro?¿ 
  //Entonces, al pulsar el botón de ver se debe actualizar el contexto con el paso actual