import React, { createContext, useState } from 'react';
import { PasoDelAlgoritmo } from '../classes/PasoDelAlgoritmo';
import Konva from 'konva';

//Esta clase exporta el contexto(Logs) y la función para añadir nuevos para así importarlos desde otros componentes 

export const LogContext = createContext<{
  pasos: PasoDelAlgoritmo[];
  addPaso: (paso: PasoDelAlgoritmo) => void;
  clearPasos: () => void;
  currentLogIndex: number;
  setCurrentLogIndex: (index: number) => void;
  setDrawStatus: (paso: PasoDelAlgoritmo,stage: Konva.Stage)=> void;
} | undefined>(undefined);

export const LogProvider = ({ children }) => {
  const [pasos, setPasos] = useState<PasoDelAlgoritmo[]>([]);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);

  const addPaso = (paso: PasoDelAlgoritmo) => {
    setPasos((prevPasos) => [...prevPasos, paso]);
  };

  const clearPasos = () => {
    setPasos([]);
  };

  const setDrawStatus = (paso: PasoDelAlgoritmo,stage: Konva.Stage)=> {
    if(stage!=null){
      paso.drawStatus=stage;
    }
   
  };

  return (
    <LogContext.Provider value={{pasos, addPaso, clearPasos, currentLogIndex, setCurrentLogIndex, setDrawStatus}}>
      {children}
    </LogContext.Provider>
  );
};

export default { LogContext, LogProvider };
