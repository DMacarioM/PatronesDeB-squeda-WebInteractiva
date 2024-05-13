import React, { useContext, useState } from 'react';
import { Stage, Layer, Text } from 'react-konva';
import { LogContext } from "../LogComponent/LogProvider";

const KonvaComponent = () => {
  const { logs } = useContext(LogContext);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);

  const handleNext = () => {
    if (currentLogIndex < logs.length - 1) {
      setCurrentLogIndex(currentLogIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentLogIndex > 0) {
      setCurrentLogIndex(currentLogIndex - 1);
    }
  };

  return (
    <div>
      <button onClick={handlePrev}>Anterior</button>
      <button onClick={handleNext}>Siguiente</button>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text
            text={logs[currentLogIndex]}
            fontSize={20} // Modifica el tamaño de las letras aquí
            draggable
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default KonvaComponent;
