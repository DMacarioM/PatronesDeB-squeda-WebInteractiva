import React, { useEffect, useRef } from 'react';
import {LogContext} from "../../../../context/LogProvider";
import {Button, Divider} from "@nextui-org/react";
import { useLogContext } from '../../../../context/useLogContext';

const Log = () => {
  const {pasos,currentLogIndex,setCurrentLogIndex} = useLogContext();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' ,/*block: 'end'*/});
  }, [pasos]);
  
  const handleClick = (index) => {
    setCurrentLogIndex(index);
  };
  
//TODO: Desactivar los botones (con LogContext)
  return (
    <div>
      {pasos.map((paso, index) => (
        <React.Fragment key={index}>
          <Divider/>
          <div className="flex justify-between pr-1 py-1 place-items-center">
            <p className="max-w-[450px]">{index}. - {paso.message}</p>
            <div className="place-items-center flex">
              <p className="font-bold">{paso.status} </p>
              {paso.status !== 'EXECUTE' && paso.status !== 'RESET'&& paso.status !== 'FIN' && paso.status !== 'INPUTERROR'
              && <Button className='' onClick={() => handleClick(index)} color="warning" size='sm' variant="bordered">
                Ver
              </Button>}
            </div>
          </div>
          
        </React.Fragment>
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default Log;
