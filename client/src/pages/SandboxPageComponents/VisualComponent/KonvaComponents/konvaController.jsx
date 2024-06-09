import React, { useContext, useEffect, useState, useRef } from 'react';
import { Stage, Layer,  Text, Rect,Group, Image, Circle} from "react-konva";
import { useLogContext } from "../../../../context/useLogContext";
import { dibujoVacio ,errorKonva, establecerDibujo , establecerDibujoInicial,establecerDibujoInicialTablaKMP } from "../KonvaHandler";
import useImage from '../../../../context/useImage';
import BotonesTamanoComponent from "./BotonesTamañoComponent"


const KonvaController = ({ stageWidth, stageHeigth, setTextSize }) => {
    
    const {setCurrentLogIndex,currentLogIndex,lastLogIndex} = useLogContext();

    const imagePrevio = useImage('/paso-previo.png');
    const imageSiguiente = useImage('paso-siguiente.png');

    const handleGoToIndex = (index) => {
        if(index>=0 && index<=lastLogIndex){
            setCurrentLogIndex(index);
        }
      };
    
    return (
        <>
                <Layer>
                            <Rect
                            x={-10}
                            y={stageHeigth-60}
                            width={200}
                            height={65}
                            fill='white'//Color del fondo
                            cornerRadius={10}
                            ></Rect>
                            <Rect
                            x={stageWidth-60}
                            y={stageHeigth-60}
                            width={70}
                            height={70}
                            fill='white'//Color del fondo
                            cornerRadius={10}
                            ></Rect>
                    <Group key={"BotonesPasos"}>
                        <Group key={"BotonPasoPrevio"} onClick={() => handleGoToIndex(currentLogIndex-1)}>
                            <Circle
                                x={20}
                                y={stageHeigth-30}
                                width={40}
                                height={40}
                                fill='#3B684D'//Color del fondo
                                cornerRadius={10}
                                ></Circle>
                            {imagePrevio && (
                                <Image
                                    image={imagePrevio}
                                    x={0}
                                    y={stageHeigth - 50}
                                    width={40}
                                    height={40}
                                />
                                )}
                        </Group>

                        <Group key={"BotonPasoSiguiente"} onClick={() => handleGoToIndex(currentLogIndex+1)}>
                            <Circle
                                x={stageWidth-30}
                                y={stageHeigth-30}
                                width={40}
                                height={40}
                                fill='#3B684D'//Color del fondo
                                cornerRadius={10}
                                ></Circle>
                            {imageSiguiente && (
                                <Image
                                    image={imageSiguiente}
                                    x={stageWidth-50}
                                    y={stageHeigth-50}
                                    width={40}
                                    height={40}
                                />
                                )}
                        </Group>
                    </Group>
                    <BotonesTamanoComponent
                    stageWidth={stageWidth} 
                    stageHeigth={stageHeigth} 
                    setTextSize={setTextSize}/>
                </Layer>
        </>
    );
};

export default KonvaController;
