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
  lastLogIndex: number;
  setLastLogIndex: (index: number) => void;
  setDrawStatus: (paso: PasoDelAlgoritmo,elements: any)=> void;
  setTableDrawStatus: (paso: PasoDelAlgoritmo,elements: any)=> void;
} | undefined>(undefined);

export const LogProvider = ({ children }) => {
  const [pasos, setPasos] = useState<PasoDelAlgoritmo[]>([]);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [lastLogIndex, setLastLogIndex] = useState(0);

  const addPaso = (paso: PasoDelAlgoritmo) => {
    setPasos((prevPasos) => [...prevPasos, paso]);
  };

  const clearPasos = () => {
    setPasos([]);
  };

  const setDrawStatus = (paso: PasoDelAlgoritmo,elements: any)=> {
    if (paso && elements) {
      paso.drawStatus = elements;
    }
  };

  const setTableDrawStatus = (paso: PasoDelAlgoritmo,elements: any)=> {
    if (paso && elements) {
      paso.tableDrawStatus = elements;
    }
  };

  return (
    <LogContext.Provider value={{pasos, addPaso, clearPasos, currentLogIndex, setCurrentLogIndex,lastLogIndex, setLastLogIndex, setDrawStatus,setTableDrawStatus}}>
      {children}
    </LogContext.Provider>
  );
};

export default { LogContext, LogProvider };
