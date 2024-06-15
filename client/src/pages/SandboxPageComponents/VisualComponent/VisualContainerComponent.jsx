import React from 'react';
import { Card, CardBody } from '@nextui-org/react'; // Importa los componentes de NextUI según corresponda
import KonvaComponent from './KonvaComponent';

const VisualContainerComponent = () => {
  return (
    <div id="SandboxView">
      <div className="flex justify-center items-center"  style={{ marginTop: "20px",
              padding: "10px", 
              backgroundColor: "#9db0a3", 
              borderRadius: "20px",
              boxShadow: "5px 5px 2px #53725D" }}>
        <Card className="w-full">
          <CardBody className='flex justify-center items-center p-5'>
            <KonvaComponent />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default VisualContainerComponent;
