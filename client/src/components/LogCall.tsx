import React, { useContext } from 'react';
import {LogContext}  from './LogComponent/LogProvider';

const SomeComponent = () => {
  const { addLog } = useContext(LogContext);

  const handleClick = () => {
    addLog('Este es un nuevo registro');
  };

  return <button onClick={handleClick}>Agregar registro</button>;
};

export default SomeComponent;
