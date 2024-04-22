// ButtonComponent.js
import React, { useContext } from 'react';
import { InputContext } from '../InputContext';
import {Button} from "@nextui-org/react";
import { algorithmHandler } from '../../../algorithms/algorithmHandler';
import {LogContext}  from "../../LogComponent/LogProvider";


const ButtonComponent = () => {
  const { motherString, pattern, algorithm } = useContext(InputContext);
  const { addLog } = useContext(LogContext);

  const handleClick = () => {
    algorithmHandler(motherString, pattern, algorithm, addLog);
  };

  return (
    <Button onClick={handleClick}>Ejecutar algoritmo</Button>
  );
};

export default ButtonComponent;
