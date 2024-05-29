// ButtonComponent.js
import React from 'react';
import {Button} from "@nextui-org/react";
import { PasoDelAlgoritmo } from '../../../../classes/PasoDelAlgoritmo';
import { useLogContext } from '../../../../context/useLogContext';

const ButtonComponent = () => {
  const { addPaso,clearPasos,currentLogIndex,setCurrentLogIndex,lastLogIndex ,setLastLogIndex} = useLogContext();

  const pasoEstandar : PasoDelAlgoritmo = { message:"Eliminando Registros...",motherString:"",patronDeBusqueda:"",pattern:"",status:"RESET",};

  const handleClick = () => {
    addPaso(pasoEstandar);
    let newLastLogIndex=lastLogIndex+1;
    setLastLogIndex(newLastLogIndex);
    setCurrentLogIndex(newLastLogIndex);
    setTimeout(() => {
        clearPasos();
        setLastLogIndex(0);
        setCurrentLogIndex(0);
      },3000);
    return;
  };

  return (
    <Button onClick={handleClick}>Reset</Button>
  );
};

export default ButtonComponent;
