import React, { useState } from 'react';

const LogComponent: React.FC = () => {
  const [logMessages, setLogMessages] = useState<string[]>([]);

  const addLogMessage = (message: string) => {
    setLogMessages([...logMessages, message]);
  };

  return (
    <div>
      <button onClick={() => addLogMessage('Nuevo mensaje de registro')}>
        Añadir mensaje de registro
      </button>
      <div>
        {logMessages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  );
};

export default LogComponent;
