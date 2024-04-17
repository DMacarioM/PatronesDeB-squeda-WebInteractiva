// ControllerComponent.jsx
import React, { useState } from 'react';
import { InputContext } from './InputContext';
import InputComponent from './ControllerComponents/InputComponent';
import ButtonComponent from './ControllerComponents/ButtonComponent';
import SelectorComponent from './ControllerComponents/SelectorComponent';
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";

const ControllerComponent = () => {
    //const [input, setInput] = useState('');
    const [algorithm, setAlgorithm] = useState('');
    const [motherString, setMotherString] = useState('');
    const [pattern, setPattern] = useState('');

    return (
        <div>
            <InputContext.Provider value={{algorithm, setAlgorithm, motherString, setMotherString, pattern, setPattern }}>
            <div className="flex justify-center items-center">        
                <Card className="max-w-[900px] min-w-[900px] max-h-[800px]">
                <CardHeader className="">
                    <div className="flex">
                    <p className="text-lg">Control</p>
                    </div>
                </CardHeader>
                    <CardBody className="px-1 py-0 text-small text-default-900 gap-1 overflow-y-auto">
                        {<InputComponent />}
                        {<SelectorComponent />}
                    </CardBody>
                    <CardFooter>
                        {<ButtonComponent />}
                    </CardFooter>
                </Card>
            </div>
            </InputContext.Provider>
            
        </div>
  );
};

export default ControllerComponent;

