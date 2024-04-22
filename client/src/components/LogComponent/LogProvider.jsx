import React, { createContext, useState } from 'react';

//Esta clase exporta el contexto(Logs) y la función para añadir nuevos para así importarlos desde otros componentes 

export const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  const addLog = (log) => {
    setLogs((prevLogs) => [...prevLogs, log]);
    //Set PasoDelAlgoritmo ->Así controlo el valor que tiene en cada momento (Añado el valor al log)
    //Y desde LogComponent accedo al objeto para cargarlo con el botón 
    //(Vuelve a ejecutar el paso, y continúa por donde iba(Establece el paso como actual en el array de pasos))
    //O sólo guardo el paso, y el log controla un array infinito de pasos, puedes ir hacia alante y hacia atrás.
  };

  return (
    <LogContext.Provider value={{ logs, addLog }}>
      {children}
    </LogContext.Provider>
  );
};

export default { LogContext, LogProvider };
