// SpeedComponent.js
import React, { useContext, useState } from 'react';
import { Button, Slider } from '@nextui-org/react';
import { useLogContext } from '../../../../context/useLogContext';

const SpeedComponent = () => {
  const {setExecSpeed,execSpeed} = useLogContext();


  const handleSliderChange = (value) => { // Añade esto
    setExecSpeed(value);
  };

  return (
      <Slider   
          size="md"
          step={1}
          color="foreground"
          label={"Velocidad de ejecución (x"+execSpeed+")"}
          showSteps={true} 
          maxValue={8} 
          defaultValue={1}
          className="max-w-md ml-16"
          onChange={handleSliderChange}
      />
  );
};

export default SpeedComponent;
