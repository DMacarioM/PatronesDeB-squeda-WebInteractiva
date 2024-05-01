// ButtonComponent.js
import React, { useContext } from 'react';
import { InputContext } from '../InputContext';
import {Button} from "@nextui-org/react";
import { algorithmHandler } from '../../../../algorithms/algorithmHandler';
import {LogContext}  from "../../LogComponent/LogProvider";


const ButtonComponent = () => {
  const { motherString, pattern, algorithm } = useContext(InputContext);
  const { addLog } = useContext(LogContext);

  const handleClick = () => {
    //Comprueba los campos input
    if (!motherString || !pattern) {
      // Mostrar un mensaje de error o realizar alguna acción apropiada
      console.log("Las cadenas de entrada están vacías.");
      addLog("Introduce datos de entrada válidos");
      return;
    }else{
      var start = performance.now() + performance.timeOrigin;
      algorithmHandler(motherString, pattern, algorithm, addLog);
      var end = performance.now() + performance.timeOrigin;
      addLog("Ejecución exitosa, tiempo de ejecución: "+ (end-start)+'s');
    }
  };

  return (
    <Button onClick={handleClick}>Ejecutar algoritmo</Button>
  );
};

export default ButtonComponent;
