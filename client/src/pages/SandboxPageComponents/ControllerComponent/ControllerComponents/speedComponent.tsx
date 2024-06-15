// SpeedComponent.jsx
import React from 'react';
import { Slider } from '@nextui-org/react';
import { useLogContext } from '../../../../context/useLogContext';

const SpeedComponent = () => {
  const { setExecSpeed, execSpeed } = useLogContext();

  const handleSliderChange = (value) => {
    setExecSpeed(value);
  };

  return (
    <div className="nextui-slider custom-slider">
      <Slider
        size="md"
        step={1}
        color="secondary"
        label={<span className="slider-label">Velocidad de ejecución (x{execSpeed})</span>}
        showSteps={true}
        maxValue={8}
        defaultValue={1}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default SpeedComponent;
