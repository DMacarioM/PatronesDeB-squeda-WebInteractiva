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
        className="max-w-xs"
        onChange={handleSelectionChange}
        value={algorithm}
        >
            <SelectItem key="BusquedaLineal">Búsqueda Lineal</SelectItem>
            <SelectItem key="BM">BM</SelectItem>
            <SelectItem key="KMP">KMP</SelectItem>
        </Select>
    </div>
  );
}

export default SelectorComponent;