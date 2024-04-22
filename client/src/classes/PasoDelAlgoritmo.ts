// types.ts
export type PasoDelAlgoritmo = {
    id?: number;
    name?: string;
    message: string;
    motherString: String;
    pattern:String;
    status?:String;
    tablaD1?: any;
    tablaD2?: any;
    tablaSgte?: any;
    posi?: number;
    posj?: number;
  };
  //Cuando se imprima tiene que tener sus cadenas, para ir de un ejemplo a otro?¿ 
  //Entonces, al pulsar el botón de ver se debe actualizar el contexto con el paso actual