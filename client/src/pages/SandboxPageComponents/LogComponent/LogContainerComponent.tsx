import React from "react";

import { Card, CardBody, CardFooter, CardHeader, Divider} from "@nextui-org/react";
import LogComponent from './LogContainerComponents/LogComponent'
import ResetLogButtonComponent from './LogContainerComponents/ResetLogButtonComponent'

export default function logContainerComponent() {
  return (
    //Utilizar el header, para cada mensaje se generará un /mensaje (y un posible icono para volver)
    //Intentar poner el scroll sólo con los mensajes (Letra más pequeña)

    //TODO: Cambiar esética

    <div className="flex justify-center items-center">
    <Card className="max-w-[600px] min-w-[600px] max-h-[350px] min-h-[350px]">
      <CardHeader className="">
        <div className="flex pr-1 py-1">
          <p className="text-md">Salida</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody className="px-1 py-0 text-small text-default-900 gap-1 overflow-y-auto">
        <LogComponent />
      </CardBody>
      <Divider/>
      <CardFooter className="flex justify-end items-center px-2 py-5">
        <ResetLogButtonComponent />
      </CardFooter>
    </Card>
    </div>
  );
}
