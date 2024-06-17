// InputComponent.jsx
import React, { useContext } from 'react';
import { Input } from '@nextui-org/react';
import { InputContext } from '../InputContext';
import { warning } from 'framer-motion';

const InputComponent = () => {
  const { motherString, setMotherString, pattern, setPattern } = useContext(InputContext);

  const handleMotherStringChange = (e) => {
    const uppercaseValue = e.target.value.toUpperCase(); // Convertir a mayúsculas
    setMotherString(uppercaseValue); // Actualizar el estado
  };

  const handlePatternChange = (e) => {
    const uppercaseValue = e.target.value.toUpperCase(); // Convertir a mayúsculas
    setPattern(uppercaseValue); // Actualizar el estado
  };

  return (
    <div className="input-fields">
      <Input className="py-1"
        type="text"
        value={motherString}
        onChange={handleMotherStringChange}
        label="Cadena madre"
      />
      <Input
        className="py-1"
        type="text"
        value={pattern}
        onChange={handlePatternChange}
        label="Patrón a buscar"
      />
    </div>
  );
};

export default InputComponent;
