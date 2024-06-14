// InputComponent.jsx
import React, { useContext } from 'react';
import { Input } from '@nextui-org/react';
import { InputContext } from '../InputContext';

const InputComponent = () => {
  const { motherString, setMotherString, pattern, setPattern } = useContext(InputContext);

  return (
    <div className="input-fields">
      <Input className="py-1" type="text" value={motherString} onChange={(e) => setMotherString(e.target.value)} placeholder="Cadena madre" />
      <Input className="py-1" type="text" value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="Patrón a buscar" />
    </div>
  );
};

export default InputComponent;
