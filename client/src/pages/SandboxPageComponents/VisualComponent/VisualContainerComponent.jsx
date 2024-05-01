// ControllerComponent.jsx
import React, { useState } from 'react';
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";

const VisualContainerComponent = () => {
    //Es el componente que contiene el recuadro de la extensión KonvaJs 
    //TODO: (Se le pueden pasar parámetros? seguro) (Se puede resetear si se ralla?) 
    //TODO: Recibe la lista de Logs (Puede recibir la lista y manejarla totalmente por dentro (Boton play, animaciones, pasos, etc..)/Se le indica un Log especíifico de la Lista y lo muestra)

    return (
        <div>
            
            <div className="flex justify-center items-center">        
                <Card className="px-1 py-1 max-w-[1300px] min-w-[1300px] max-h-[800px]">
                    <CardBody>
                        <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                    </CardBody>
                </Card>
            </div>
            
        </div>
  );
};

export default VisualContainerComponent;

