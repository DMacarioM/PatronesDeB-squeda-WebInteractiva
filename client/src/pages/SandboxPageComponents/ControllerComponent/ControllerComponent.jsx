// ControllerComponent.jsx
import React, { useState } from 'react';
import { InputContext } from './InputContext';
import InputComponent from './ControllerComponents/InputComponent';
import ButtonComponent from './ControllerComponents/ButtonComponent';
import SpeedComponent from './ControllerComponents/speedComponent';
import SelectorComponent from './ControllerComponents/SelectorComponent';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react';

const ControllerComponent = () => {
  const [algorithm, setAlgorithm] = useState('');
  const [motherString, setMotherString] = useState('');
  const [pattern, setPattern] = useState('');

  return (
    <div>
      <InputContext.Provider value={{ algorithm, setAlgorithm, motherString, setMotherString, pattern, setPattern }}>
        <Card>
          <CardHeader>
            <p className="card-title">Control</p>
          </CardHeader>
          <CardBody>
            <div className="input-container">
              <div className="input-fields">
                <InputComponent />
              </div>
              <div className="selector">
                <SelectorComponent />
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <div className="speed-slider-container">
              <SpeedComponent />
              <ButtonComponent className="execute-button comic-button" />
            </div>
          </CardFooter>
        </Card>
      </InputContext.Provider>
    </div>
  );
};

export default ControllerComponent;
