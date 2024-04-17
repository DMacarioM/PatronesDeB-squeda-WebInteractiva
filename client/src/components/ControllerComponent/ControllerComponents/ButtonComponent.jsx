// ButtonComponent.js
import React, { useContext } from 'react';
import { InputContext } from '../InputContext';
import { myAlgorithm } from '../../../algorithms/myAlgorithm';
import {Button} from "@nextui-org/react";

const ButtonComponent = () => {
  const { input } = useContext(InputContext);

  const handleClick = () => {
    const result = myAlgorithm(input);
    console.log(result);
  };

  return (
    <Button onClick={handleClick}>Ejecutar algoritmo</Button>
  );
};

export default ButtonComponent;
