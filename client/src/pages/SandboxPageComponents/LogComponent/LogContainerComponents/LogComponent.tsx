import React, { useRef, useEffect } from 'react';
import { Divider, Button } from "@nextui-org/react";
import { useLogContext } from '../../../../context/useLogContext';

const LogComponent = () => {
  const { pasos, setCurrentLogIndex, buttonsDisabled } = useLogContext();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pasos.length > 2) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pasos]);

  const handleClick = (index) => {
    setCurrentLogIndex(index);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'EXECUTE':
      case 'FIN':
        return '#E7863C'; // Naranja
      case 'ACIERTO':
        return '#5B9C70'; // Verde
      case 'FALLO':
        return '#C33030'; // Rojo
      case 'EXITO':
        return '#30C35F'; // Verde claro
      case 'TABLA':
        return '#9DB0A3'; // Verde claro
      default:
        return '#E7863C'; // Amarillo por defecto
    }
  };

  return (
    <div style={{ color: "#fff", minHeight: "250px" }}>
      {pasos.length === 0 ? (
        <p>No hay elementos en la lista de pasos.</p>
      ) : (
        pasos.map((paso, index) => (
          <React.Fragment key={index}>
            <Divider style={{ backgroundColor: "#fff", margin: "10px 0" }} />
            <div className="flex justify-between pr-3 py-0 place-items-center">
              <p className="message-text" style={{ color: "#fff", fontFamily: 'Courier New, Courier, monospace' }}></p>
                <pre style={{ margin: 0 }}>
                <span style={{ color: "#E7863C" }}>{index}. </span>
                  {`${paso.message}`}
                </pre>
              
              
              <div className="place-items-center flex">
                <p className="status-text font-bold" style={{ color: getStatusColor(paso.status), margin: "0px 10px 0px 20px" }}>{paso.status}</p>
                {paso.status !== 'EXECUTE' && paso.status !== 'RESET' && paso.status !== 'FIN' && paso.status !== 'INPUTERROR' && (
                  <Button
                    className='comic-button comic-button-ver'
                    disabled={buttonsDisabled}
                    onClick={() => handleClick(index)}
                    color="secondary"
                    size='sm'
                    variant="bordered"
                    style={{ margin: "0px 0 0px 10px", padding:"10px" }}
                  >
                    <svg className="eye" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>
                  </Button>
                )}
              </div>
            </div>
          </React.Fragment>
        ))
      )}
      <div ref={endRef} />
    </div>
  );
};

export default LogComponent;
