// ControllerComponent.jsx
import React, { useState } from 'react';
import { InputContext } from './InputContext';
import InputComponent from './ControllerComponents/InputComponent';
import ButtonComponent from './ControllerComponents/ButtonComponent';
import SpeedComponent from './ControllerComponents/speedComponent';
import SelectorComponent from './ControllerComponents/SelectorComponent';
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";

const ControllerComponent = () => {
    const [algorithm, setAlgorithm] = useState('');
    const [motherString, setMotherString] = useState('');
    const [pattern, setPattern] = useState('');

    return (
        //TODO: Los botones y elementos tienen que desactivarse mientras se está en ejecución, Si el usuario no se ha enterado, pulsará el "supuesto botón del log, entonces la ejecución de los pasos se pausará hasta que dé al play (No se da directo)"
        <div style={{ marginTop: '55px', marginLeft:'20px' }}>
            <InputContext.Provider value={{algorithm, setAlgorithm, motherString, setMotherString, pattern, setPattern }}>
            <div className="flex justify-center items-center">        
                <Card className="max-w-[800px] min-w-[800px] max-h-[800px]">
                <CardHeader className="">
                    <div className="flex">
                    <p className="text-lg">Control</p>
                    </div>
                </CardHeader>
                    <CardBody className="px-1 py-0 text-small text-default-900 gap-1 overflow-y-auto">
                        {<InputComponent />}
                        {<SelectorComponent />}
                    </CardBody>
                    <CardFooter className="justify-between">
                        {<ButtonComponent />}
                        {<SpeedComponent />}
                    </CardFooter>
                </Card>
            </div>
            </InputContext.Provider>
            
        </div>
  );
};

export default ControllerComponent;

