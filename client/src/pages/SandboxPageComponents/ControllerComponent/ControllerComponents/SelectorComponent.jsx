// SelectorComponent.jsx
import React, { useContext } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { InputContext } from '../InputContext';

const SelectorComponent = () => {
  const { algorithm, setAlgorithm } = useContext(InputContext);

  const handleSelectionChange = (e) => {
    setAlgorithm(e.target.value);
  };

  return (
    <div className="selector">
      <Select
        label="Algoritmo"
        placeholder="Selecciona un algoritmo"
        onChange={handleSelectionChange}
        value={algorithm}
      >
        <SelectItem key="FuerzaBruta">Búsqueda Directa</SelectItem>
        <SelectItem key="KMP">KMP</SelectItem>
        <SelectItem key="Boyer-Moore">Boyer-Moore</SelectItem>
      </Select>
    </div>
  );
};

export default SelectorComponent;
