// ButtonComponent.js
import React, { useContext } from 'react';
import { InputContext } from '../InputContext';
import {Button} from "@nextui-org/react";
import { algorithmHandler } from '../../../../algorithms/algorithmHandler';
import { PasoDelAlgoritmo } from '../../../../classes/PasoDelAlgoritmo';
import { useLogContext } from '../../../../context/useLogContext';



const pasoErrorInput : PasoDelAlgoritmo = {message:"Introduce datos de entrada válidos  ",motherString:"",patronDeBusqueda:"",pattern:"",status:"INPUTERROR",};
const pasoErrorInputPatron : PasoDelAlgoritmo = {message:"Introduce datos de entrada válidos (El patrón no puede ser más grande que la cadena Madre) ",motherString:"",patronDeBusqueda:"",pattern:"",status:"INPUTERROR",};
var pasoExitoEjec : PasoDelAlgoritmo 

function mapPasoExito (motherString:String, pattern:String, algorithm:String, lastLogIndex:number) {
  return{
    motherString:motherString,
    pattern:pattern,
    patronDeBusqueda:algorithm,
    message:"Ejecución exitosa, tiempo de ejecución:  ",
    status:"EXECUTE",
  }
  //pasoExitoEjec.id=lastLogIndex;
}

const ButtonComponent = () => {
  const { motherString, pattern, algorithm } = useContext(InputContext);

  const { addPaso,currentLogIndex,setCurrentLogIndex,lastLogIndex ,setLastLogIndex} = useLogContext();

  const handleClick = () => {

    //TODO:Puedo aplicar el dibujoVacio para evitar cosas raras

    //Comprueba los campos input
    if (!motherString || !pattern) {
      // Mostrar un mensaje de error o realizar alguna acción apropiada
      console.log("Las cadenas de entrada están vacías.");
      //addPaso(pasoErrorInput);
    }else if(!algorithm){
      console.log("Algoritmo no encontrado.");
      //addPaso(pasoErrorInput);
    }else if(pattern.length>motherString.length){
      console.log("El Patrón no es válido.");
      //addPaso(pasoErrorInputPatron);
    }else{
      var start = performance.now() + performance.timeOrigin;
      algorithmHandler(motherString, pattern, algorithm, addPaso, currentLogIndex, setCurrentLogIndex, lastLogIndex ,setLastLogIndex);
      var end = performance.now() + performance.timeOrigin;

      let newLastLogIndex=lastLogIndex+1;
      pasoExitoEjec = mapPasoExito(motherString, pattern, algorithm,newLastLogIndex);
      pasoExitoEjec.message+=(end-start)+'s';
      addPaso(pasoExitoEjec);

      setLastLogIndex(newLastLogIndex);
      //setCurrentLogIndex(newLastLogIndex);
      //LLama a pintar los pasos
    }
    return;
  };

  return (
    <a href="#SandboxView"><Button onClick={handleClick}>Ejecutar algoritmo</Button></a>
  );
};

export default ButtonComponent;
