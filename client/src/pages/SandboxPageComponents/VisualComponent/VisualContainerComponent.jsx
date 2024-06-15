import React from 'react';
import { Card, CardBody } from '@nextui-org/react'; // Importa los componentes de NextUI según corresponda
import KonvaComponent from './KonvaComponent';

const VisualContainerComponent = () => {
  return (
    <div id="SandboxView">
      <div className="flex justify-center items-center"  style={{ marginTop: "20px" }}>
        <Card className="w-full">
          <CardBody className='flex justify-center items-center p-0'>
            <KonvaComponent />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default VisualContainerComponent;
