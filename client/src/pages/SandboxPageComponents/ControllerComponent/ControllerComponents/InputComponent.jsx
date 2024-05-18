// InputComponent.js
import React, { useContext } from 'react';
import { InputContext } from '../InputContext';
import { Input } from '@nextui-org/react';

const InputComponent = () => {
    const {motherString, setMotherString, pattern, setPattern } = useContext(InputContext);

  return (
    <div className="flex flex-col col-span-6 md:col-span-8 px-1 ">
      <Input className='py-1' type="email" value={motherString.toUpperCase()} onChange={(e) => setMotherString(e.target.value.toUpperCase())} placeholder="Cadena madre" />
      <Input className='py-1' type="email" value={pattern.toUpperCase()} onChange={(e) => setPattern(e.target.value.toUpperCase())} placeholder="Patrón a buscar" />
    </div>
  );
};

export default InputComponent;
