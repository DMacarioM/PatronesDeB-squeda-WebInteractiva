import React, { createContext, useState } from 'react';
import { PasoDelAlgoritmo } from '../classes/PasoDelAlgoritmo';

//Esta clase exporta el contexto(Logs) y la función para añadir nuevos para así importarlos desde otros componentes 

export const LogContext = createContext<{
  logs: string[];
  addLog: (log: string) => void;
  clearLogs: () => void;
  pasos: PasoDelAlgoritmo[];
  addPaso: (paso: PasoDelAlgoritmo) => void;
  clearPasos: () => void;
  currentLogIndex: number;
  setCurrentLogIndex: (index: number) => void;
} | undefined>(undefined);

export const LogProvider = ({ children }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [pasos, setPasos] = useState<PasoDelAlgoritmo[]>([]);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);

  const addLog = (log) => {
    setLogs((prevLogs) => [...prevLogs, log]);
    //Set PasoDelAlgoritmo ->Así controlo el valor que tiene en cada momento (Añado el valor al log)
  };

  const addPaso = (paso: PasoDelAlgoritmo) => {
    setPasos((prevPasos) => [...prevPasos, paso]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const clearPasos = () => {
    setPasos([]);
  };

  return (
    <LogContext.Provider value={{ logs, addLog, clearLogs, pasos, addPaso, clearPasos, currentLogIndex, setCurrentLogIndex}}>
      {children}
    </LogContext.Provider>
  );
};

export default { LogContext, LogProvider };
