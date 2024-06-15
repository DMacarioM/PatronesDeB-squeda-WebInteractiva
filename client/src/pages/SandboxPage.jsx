import React from 'react';
import LogContainerComponent from './SandboxPageComponents/LogComponent/LogContainerComponent';
import ControllerComponent from './SandboxPageComponents/ControllerComponent/ControllerComponent';
import VisualContainerComponent from './SandboxPageComponents/VisualComponent/VisualContainerComponent';
import '../css/SandboxPage.css'; // Asegúrate de importar tus estilos CSS

function SandboxPage() {
  return (
    <div className='container'>
      <h1 className='title'>Sandbox</h1>
      <hr className='yellow-line' />
      <div className='flex-container'>
        <div className='controller'>
          <ControllerComponent />
        </div>
        <div className='log-container'>
          <LogContainerComponent />
        </div>
      </div>
      
      
    </div>
  );
}

export default SandboxPage;

