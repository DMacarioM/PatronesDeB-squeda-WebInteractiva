import React from "react";
import { Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import LogComponent from './LogContainerComponents/LogComponent';
import ResetLogButtonComponent from './LogContainerComponents/ResetLogButtonComponent';

const LogContainerComponent = () => {
  return (
    <div className="log-component">
      <Card style={{ backgroundColor: "#000", color: "#fff"  }}>
        <CardHeader style={{ backgroundColor: "#000", color: "#fff" }}>
          <div className="flex pl-2 py-1">
            <p className="text-md">Salida</p>
          </div>
        </CardHeader>
        <Divider style={{ backgroundColor: "#fff" }} />
        <CardBody className="log-body px-3 py-0 text-small gap-1 overflow-y-auto" style={{ backgroundColor: "#000", color: "#fff" }}>
          <LogComponent />
        </CardBody>
        <Divider style={{ backgroundColor: "#fff" }} />
        <CardFooter className="flex justify-end items-center px-10 py-2" style={{ backgroundColor: "#000", color: "#fff" }}>
          <ResetLogButtonComponent />
        </CardFooter>
      </Card>
    </div>
  );
};

export default LogContainerComponent;
