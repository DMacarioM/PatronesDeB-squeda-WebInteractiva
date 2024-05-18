import React, { useContext, useState } from 'react';
import { Stage, Layer, Text } from 'react-konva';
import { useLogContext } from "../../../context/useLogContext";


const KonvaComponent = () => {
  const { pasos,currentLogIndex } = useLogContext();

  return (
    <div>
      <Stage width={960} height={500}>
        <Layer>
          {pasos[currentLogIndex] && (
            <Text
              text={pasos[currentLogIndex].message}
              fontSize={20} // Modifica el tamaño de las letras aquí
              draggable
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default KonvaComponent;
