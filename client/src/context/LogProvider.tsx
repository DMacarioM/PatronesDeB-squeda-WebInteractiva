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
  buttonsDisabled: boolean;
  setButtonsDisabled: (status:boolean) => void;
  execSpeed: number;
  setExecSpeed: (value: number) => void;
} | undefined>(undefined);

export const LogProvider = ({ children }) => {
  const [pasos, setPasos] = useState<PasoDelAlgoritmo[]>([]);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [lastLogIndex, setLastLogIndex] = useState(0);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [execSpeed, setExecSpeed] = useState(1);


  const addPaso = (paso: PasoDelAlgoritmo) => {
    setPasos((prevPasos) => [...prevPasos, paso]);
  };

  const clearPasos = () => {
    setPasos([]);
  };

  return (
    <LogContext.Provider value={{pasos, addPaso, clearPasos, currentLogIndex, setCurrentLogIndex,lastLogIndex, setLastLogIndex,buttonsDisabled,setButtonsDisabled,execSpeed, setExecSpeed}}>
      {children}
    </LogContext.Provider>
  );
};

export default { LogContext, LogProvider };
