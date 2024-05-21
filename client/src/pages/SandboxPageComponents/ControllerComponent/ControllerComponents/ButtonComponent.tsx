// ButtonComponent.js
import React, { useContext } from 'react';
import { InputContext } from '../InputContext';
import {Button} from "@nextui-org/react";
import { algorithmHandler } from '../../../../algorithms/algorithmHandler';
import { PasoDelAlgoritmo } from '../../../../classes/PasoDelAlgoritmo';
import { useLogContext } from '../../../../context/useLogContext';



const pasoErrorInput : PasoDelAlgoritmo = {message:"Introduce datos de entrada válidos",motherString:"",patronDeBusqueda:"",pattern:"",status:"INPUTERROR",};
var pasoExitoEjec : PasoDelAlgoritmo = {message:"Ejecución exitosa, tiempo de ejecución:",motherString:"",patronDeBusqueda:"",pattern:"",status:"EXECUTE",};

const ButtonComponent = () => {
  const { motherString, pattern, algorithm } = useContext(InputContext);

  const { addPaso,currentLogIndex,setCurrentLogIndex} = useLogContext();

  const handleClick = () => {
    //Comprueba los campos input
    if (!motherString || !pattern) {
      // Mostrar un mensaje de error o realizar alguna acción apropiada
      console.log("Las cadenas de entrada están vacías.");
      addPaso(pasoErrorInput);
      return;
    }else{
      var start = performance.now() + performance.timeOrigin;
      algorithmHandler(motherString, pattern, algorithm, addPaso);
      var end = performance.now() + performance.timeOrigin;

      pasoExitoEjec.message+=(end-start)+'s';
      addPaso(pasoExitoEjec);
      //LLama a pintar los pasos
      setCurrentLogIndex(currentLogIndex+1);
    }
  };

  return (
    <Button onClick={handleClick}>Ejecutar algoritmo</Button>
  );
};

export default ButtonComponent;
