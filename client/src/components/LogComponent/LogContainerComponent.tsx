import React from "react";

import { Card, CardBody, CardHeader, Divider} from "@nextui-org/react";
import LogComponent from './LogComponent'

export default function logContainerComponent() {
  return (
    //Utilizar el header, para cada mensaje se generará un /mensaje (y un posible icono para volver)
    //Intentar poner el scroll sólo con los mensajes (Letra más pequeña)

    //singleton para estado de la imagen¿?
    
    //TODO: Cambiar fuente

    <div className="flex justify-center items-center">
    <Card className="max-w-[600px] min-w-[600px] max-h-[300px]">
      <CardHeader className="">
        <div className="flex">
          <p className="text-md">Salida</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody className="px-1 py-0 text-small text-default-900 gap-1 overflow-y-auto">
        <div className="flex justify-between pr-1 py-1">
          <p className=" max-w-[450px]">Aquí se mostrarán los Logs:</p>
          <p className="font-bold">'Supuesto botón'</p>
        </div>

        <LogComponent />
      </CardBody>
    </Card>
    </div>
  );
}
