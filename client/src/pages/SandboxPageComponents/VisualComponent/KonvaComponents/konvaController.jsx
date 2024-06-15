import React, { useState } from 'react';
import { Stage, Layer, Rect, Group, Image, Circle } from "react-konva";
import { useLogContext } from "../../../../context/useLogContext";
import useImage from '../../../../context/useImage';
import BotonesTamanoComponent from "./BotonesTamañoComponent"

const KonvaController = ({ stageWidth, stageHeight, setTextSize }) => {
    const { setCurrentLogIndex, currentLogIndex, lastLogIndex } = useLogContext();

    const imagePrevio = useImage('/paso-previo.png');
    const imageSiguiente = useImage('paso-siguiente.png');
    const [hoveredButton, setHoveredButton] = useState(null);

    const handleGoToIndex = (index) => {
        if (index >= 0 && index <= lastLogIndex) {
            setCurrentLogIndex(index);
        }
    };

    return (
        <>
            <Layer>
                <Rect
                    x={-10}
                    y={stageHeight - 60}
                    width={200}
                    height={65}
                    fill='white'
                    cornerRadius={10}
                />
                <Rect
                    x={stageWidth - 60}
                    y={stageHeight - 60}
                    width={70}
                    height={70}
                    fill='white'
                    cornerRadius={10}
                />
                <Group key={"BotonesPasos"}>
                    <Group
                        key={"BotonPasoPrevio"}
                        onClick={() => handleGoToIndex(currentLogIndex - 1)}
                        onMouseEnter={() => setHoveredButton('previo')}
                        onMouseLeave={() => setHoveredButton(null)}
                    >
                        <Circle
                            x={hoveredButton === 'previo' ? 25 : 20}
                            y={stageHeight - 30}
                            radius={20}
                            fill='#E7863C'
                        />
                        {imagePrevio && (
                            <Image
                                image={imagePrevio}
                                x={hoveredButton === 'previo' ? 1 : 0}
                                y={hoveredButton === 'previo' ? stageHeight - 57 : stageHeight - 50}
                                width={hoveredButton === 'previo' ? 50 : 40}
                                height={hoveredButton === 'previo' ? 50 : 40}
                            />
                        )}
                    </Group>

                    <Group
                        key={"BotonPasoSiguiente"}
                        onClick={() => handleGoToIndex(currentLogIndex + 1)}
                        onMouseEnter={() => setHoveredButton('siguiente')}
                        onMouseLeave={() => setHoveredButton(null)}
                    >
                        <Circle
                            x={hoveredButton === 'previo' ? stageWidth - 45 : stageWidth - 40}
                            y={stageHeight - 30}
                            radius={20}
                            fill='#E7863C'
                        />
                        {imageSiguiente && (
                            <Image
                                image={imageSiguiente}
                                x={hoveredButton === 'siguiente' ? stageWidth - 61 : stageWidth - 60}
                                y={hoveredButton === 'siguiente' ? stageHeight - 57 : stageHeight - 50}
                                width={hoveredButton === 'siguiente' ? 50 : 40}
                                height={hoveredButton === 'siguiente' ? 50 : 40}
                            />
                        )}
                    </Group>
                </Group>
                <BotonesTamanoComponent
                    stageWidth={stageWidth}
                    stageHeight={stageHeight}
                    setTextSize={setTextSize}
                />
            </Layer>
        </>
    );
};

export default KonvaController;
