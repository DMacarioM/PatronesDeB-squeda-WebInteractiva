// ButtonComponent.js
import React, { useContext } from 'react';
import { InputContext } from '../InputContext';
import {Button} from "@nextui-org/react";
import { algorithmHandler } from '../../../../algorithms/algorithmHandler';
import { PasoDelAlgoritmo } from '../../../../classes/PasoDelAlgoritmo';
import { useLogContext } from '../../../../context/useLogContext';



const pasoErrorInput : PasoDelAlgoritmo = {message:"Introduce datos de entrada válidos  ",motherString:"",patronDeBusqueda:"",pattern:"",status:"INPUTERROR",};
const pasoErrorInputPatron : PasoDelAlgoritmo = {message:"Introduce datos de entrada válidos (El patrón no puede ser más grande que la cadena Madre) ",motherString:"",patronDeBusqueda:"",pattern:"",status:"INPUTERROR",};
var pasoExitoEjec : PasoDelAlgoritmo = {message:"Ejecución exitosa, tiempo de ejecución:  ",motherString:"",patronDeBusqueda:"",pattern:"",status:"EXECUTE",};

function mapPasoExito (motherString:String, pattern:String, algorithm:String) {
  pasoExitoEjec.motherString=motherString;
  pasoExitoEjec.pattern=pattern;
  pasoExitoEjec.patronDeBusqueda=algorithm;
}

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
    }else if(!algorithm){
      console.log("Patrón no encontrado.");
      addPaso(pasoErrorInput);
    }else if(pattern.length>motherString.length){
      console.log("Patrón no encontrado.");
      addPaso(pasoErrorInputPatron);
    }else{
      var start = performance.now() + performance.timeOrigin;
      algorithmHandler(motherString, pattern, algorithm, addPaso, currentLogIndex, setCurrentLogIndex);
      var end = performance.now() + performance.timeOrigin;

      mapPasoExito(motherString, pattern, algorithm);
      pasoExitoEjec.message+=(end-start)+'s';
      addPaso(pasoExitoEjec);
      //LLama a pintar los pasos
    }
  };

  return (
    <a href="#SandboxView"><Button onClick={handleClick}>Ejecutar algoritmo</Button></a>
  );
};

export default ButtonComponent;
