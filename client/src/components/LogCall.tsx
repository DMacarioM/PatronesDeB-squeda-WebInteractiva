import React, { useContext,useState  } from 'react';
import {LogContext}  from './LogComponent/LogProvider';
import { Input } from '@nextui-org/react';

const SomeComponent = () => {
  const { addLog } = useContext(LogContext);
  const [message, setMessage] = useState('');

  const handleClick = () => {
    addLog(message);
    setMessage('');
  };

  return (
    <div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input type="text" label="MSG" value={message} onChange={(e) => setMessage(e.target.value)}/>
      </div>
      <button onClick={handleClick}>Agregar registro</button>
    </div>
  );
};

export default SomeComponent;
