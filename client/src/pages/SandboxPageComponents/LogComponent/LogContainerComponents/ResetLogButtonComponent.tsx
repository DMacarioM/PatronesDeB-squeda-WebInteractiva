// ButtonComponent.js
import React, { useContext } from 'react';
import {Button} from "@nextui-org/react";
import {LogContext}  from "../LogProvider";


const ButtonComponent = () => {
  const { addLog } = useContext(LogContext);
  const { clearLogs } = useContext(LogContext);


  const handleClick = () => {
    addLog("Eliminando registros...");
    setTimeout(() => {
        clearLogs();
      },3000);
    return;
  };

  return (
    <Button onClick={handleClick}>Reset</Button>
  );
};

export default ButtonComponent;
