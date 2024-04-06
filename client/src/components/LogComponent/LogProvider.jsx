import React, { createContext, useState } from 'react';

//Esta clase exporta el contexto(Logs) y la función para añadir nuevos para así importarlos desde otros componentes 

export const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  const addLog = (log) => {
    setLogs((prevLogs) => [...prevLogs, log]);
  };

  return (
    <LogContext.Provider value={{ logs, addLog }}>
      {children}
    </LogContext.Provider>
  );
};

export default { LogContext, LogProvider };
