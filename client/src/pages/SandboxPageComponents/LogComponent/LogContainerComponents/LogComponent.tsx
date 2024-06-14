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

  return (
    <div style={{ color: "#fff", minHeight: "300px" }}>
      {pasos.length === 0 ? (
        <p>No hay elementos en la lista de pasos.</p>
      ) : (
        pasos.map((paso, index) => (
          <React.Fragment key={index}>
            <Divider style={{ backgroundColor: "#fff" }} />
            <div className="flex justify-between pr-1 py-1 place-items-center">
              <p className="message-text" style={{ color: "#fff" }}>{index}. - {paso.message}</p>
              <div className="place-items-center flex">
                <p className="status-text font-bold" style={{ color: "#fff" }}>{paso.status}</p>
                {paso.status !== 'EXECUTE' && paso.status !== 'RESET' && paso.status !== 'FIN' && paso.status !== 'INPUTERROR' && (
                  <Button
                    disabled={buttonsDisabled}
                    onClick={() => handleClick(index)}
                    color="warning"
                    size='sm'
                    variant="bordered"
                  >
                    Ver
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
