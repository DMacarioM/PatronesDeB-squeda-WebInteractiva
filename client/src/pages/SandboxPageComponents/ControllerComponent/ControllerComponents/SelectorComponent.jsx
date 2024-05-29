// SelectorComponent.js
import React, { useContext } from 'react';
import {Select, SelectItem} from "@nextui-org/react";
import { InputContext } from '../InputContext';

const SelectorComponent = () => {

    const { algorithm, setAlgorithm} = useContext(InputContext);

    const handleSelectionChange = (e) => {
        setAlgorithm(e.target.value);
      };

  return (
    <div>
        <Select
        label="Algoritmo"
        placeholder="Selecciona un algoritmo"
        className="px-1"
        onChange={handleSelectionChange}
        value={algorithm}
        >
            <SelectItem key="FuerzaBruta">Fuerza Bruta</SelectItem>
            <SelectItem key="Booyer-Moore">Booyer-Moore</SelectItem>
            <SelectItem key="KMP">KMP</SelectItem>
        </Select>
    </div>
  );
}

export default SelectorComponent;