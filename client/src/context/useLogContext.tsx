import { useContext } from 'react';
import { LogContext } from './LogProvider'; // Asegúrate de importar el contexto correcto

export function useLogContext() {
  const context = useContext(LogContext);

  if (!context) {
    throw new Error('useLogContext debe estar dentro del proveedor LogContext');
  }

  return context;
}
