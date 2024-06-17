// ButtonComponent.js
import React, { useContext } from 'react';
import { InputContext } from '../InputContext';
import { Button } from "@nextui-org/react";
import { algorithmHandler } from '../../../../algorithms/algorithmHandler';
import { PasoDelAlgoritmo } from '../../../../classes/PasoDelAlgoritmo';
import { useLogContext } from '../../../../context/useLogContext';

const pasoErrorInput = {
  message: "Introduce datos de entrada válidos  ",
  motherString: "",
  patronDeBusqueda: "",
  pattern: "",
  status: "INPUTERROR",
};
const pasoErrorInputPatron = {
  message: "Introduce datos de entrada válidos\n\tEl patrón no puede ser más grande que la cadena Madre ",
  motherString: "",
  patronDeBusqueda: "",
  pattern: "",
  status: "INPUTERROR",
};
var pasoExitoEjec;

function mapPasoExito(motherString, pattern, algorithm) {
  return {
    motherString: motherString,
    pattern: pattern,
    patronDeBusqueda: algorithm,
    message: "Tiempo de ejecución:  ",
    status: "EXECUTE",
  };
}

const ButtonComponent = ({ className }) => {
  const { motherString, pattern, algorithm } = useContext(InputContext);
  const { addPaso, currentLogIndex, setCurrentLogIndex, lastLogIndex, setLastLogIndex, buttonsDisabled, setButtonsDisabled, execSpeed } = useLogContext();

  const handleClick = () => {
    // Comprueba los campos input
    if (!motherString || !pattern) {
      // Mostrar un mensaje de error o realizar alguna acción apropiada
      console.log("Las cadenas de entrada están vacías.");
      addPaso(pasoErrorInput);
    } else if (!algorithm) {
      console.log("Algoritmo no encontrado.");
      addPaso(pasoErrorInput);
    } else if (pattern.length > motherString.length) {
      console.log("El Patrón no es válido.");
      addPaso(pasoErrorInputPatron);
    } else {
      setButtonsDisabled(true);

      var newLastLogIndex = lastLogIndex;
      if (lastLogIndex > 0) {
        newLastLogIndex = newLastLogIndex + 1;
        setLastLogIndex(newLastLogIndex);
        setCurrentLogIndex(newLastLogIndex);
      }

      var start = performance.now() + performance.timeOrigin;
      algorithmHandler(motherString, pattern, algorithm, addPaso, currentLogIndex, setCurrentLogIndex, newLastLogIndex, setLastLogIndex, setButtonsDisabled, execSpeed);
      var end = performance.now() + performance.timeOrigin;

      pasoExitoEjec = mapPasoExito(motherString, pattern, algorithm);
      pasoExitoEjec.message += (end - start) + 's';
      addPaso(pasoExitoEjec);
    }
    return;
  };

  return (
    <Button color='primary' className={className} disabled={buttonsDisabled} onClick={handleClick}>Ejecutar algoritmo</Button>
  );
};

export default ButtonComponent;
