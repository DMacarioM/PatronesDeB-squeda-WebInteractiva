import React, { useContext, useEffect, useState } from 'react';
import { Stage, Layer, Text } from 'react-konva';
import { useLogContext } from "../../../context/useLogContext";
import Konva from 'konva';

const establecerDibujo = (paso) => {
  return (
    <Stage width={960} height={500}>
      <Layer>
        {paso && (
          <Text
            text={paso.message}
            fontSize={20} // Modifica el tamaño de las letras aquí
            draggable
          />
        )}
      </Layer>
    </Stage>
  );
};

const dibujoVacio = (paso) =>{
  return (
    <Stage width={960} height={500}>
      <Layer>
        
      </Layer>
    </Stage>
  );
};

const KonvaComponent = () => {
  const { pasos, setDrawStatus, currentLogIndex } = useLogContext();
  const [Stage, setStage] = useState(null);

  // Cuando cambia currentLogIndex, actualizamos el layer
  useEffect(() => {
    if(currentLogIndex > 0 && pasos[currentLogIndex-1].drawStatus!=null){
      setStage(pasos[currentLogIndex-1].drawStatus);
    }else{
      setStage(dibujoVacio());
    }

    if(pasos[currentLogIndex]==null){
      return;
    }

    if(pasos[currentLogIndex].drawStatus!=null){
      setDrawStatus(pasos[currentLogIndex],establecerDibujo(pasos[currentLogIndex]))
    }

    // Pinta (o no) el dibujo del paso anterior, ahora debería de pintar el paso
    // Agrega un retraso antes de ejecutar el segundo setStage
    
    const tiempoRetraso = 2000; // Define tu tiempo de retraso aquí (en milisegundos)
    
    setTimeout(() => {
      setStage(pasos[currentLogIndex].drawStatus);
    }, tiempoRetraso);
    
  }, [currentLogIndex]);

  return (
    <div>
      {Stage}
    </div>
  );
};


export default KonvaComponent;
