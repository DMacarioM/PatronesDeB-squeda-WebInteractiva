import Konva from "konva";

// types.ts
export type PasoDelAlgoritmo = {
    id?: number;
    message: string;
    status:String;
    
    motherString: String;
    pattern:String;

    patronDeBusqueda:String;

    posEnCMadre?: number;
    posEnPatron?: number;
    alturaY?: number;


    tablaD1?: any;
    tablaD2?: any;
    tablaSgte?: any;

    drawStatus?: Konva.Stage;
  };
  //Cuando se imprima tiene que tener sus cadenas, para ir de un ejemplo a otro?¿ 
  //Entonces, al pulsar el botón de ver se debe actualizar el contexto con el paso actual