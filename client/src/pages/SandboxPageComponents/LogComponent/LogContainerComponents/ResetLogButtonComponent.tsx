// ButtonComponent.js
import React from 'react';
import {Button} from "@nextui-org/react";
import { PasoDelAlgoritmo } from '../../../../classes/PasoDelAlgoritmo';
import { useLogContext } from '../../../../context/useLogContext';

const ButtonComponent = () => {
  const { addPaso,clearPasos,currentLogIndex,setCurrentLogIndex,lastLogIndex ,setLastLogIndex, buttonsDisabled,setButtonsDisabled} = useLogContext();

  const pasoEstandar = ( { message:"Eliminando Registros...",motherString:"",patronDeBusqueda:"",pattern:"",status:"RESET",});

  const handleClick = () => {
    setButtonsDisabled(true);
    
    let newLastLogIndex=lastLogIndex+1;
    setLastLogIndex(newLastLogIndex);
    setCurrentLogIndex(newLastLogIndex);
    addPaso(pasoEstandar);
    setTimeout(() => {
        clearPasos();
        setLastLogIndex(0);
        setCurrentLogIndex(0);
        setButtonsDisabled(false);
      },3000);
    return;
  };

  return (
    <Button className="comic-button" color='secondary' disabled={buttonsDisabled} onClick={handleClick}>Reset</Button>
  );
};

export default ButtonComponent;
