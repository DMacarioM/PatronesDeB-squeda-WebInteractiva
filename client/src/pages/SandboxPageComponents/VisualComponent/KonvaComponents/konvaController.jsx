import React, { useContext, useEffect, useState, useRef } from 'react';
import { Stage, Layer,  Text, Rect,Group, Image, Circle} from "react-konva";
import { useLogContext } from "../../../../context/useLogContext";
import { dibujoVacio ,errorKonva, establecerDibujo , establecerDibujoInicial,establecerDibujoInicialTablaKMP } from "../KonvaHandler";
import useImage from '../../../../context/useImage';
import BotonesTamanoComponent from "./BotonesTamañoComponent"


const KonvaController = ({ stageWidth, stageHeight, setTextSize }) => {
    
    const {setCurrentLogIndex,currentLogIndex,lastLogIndex} = useLogContext();

    const imagePrevio = useImage('/paso-previo.png');
    const imageSiguiente = useImage('paso-siguiente.png');

    const handleGoToIndex = (index) => {
        console.log("click");
        if(index>=0 && index<=lastLogIndex){
            setCurrentLogIndex(index);
        }
      };
    
    return (
        <>
                <Layer>
                            <Rect
                            x={-10}
                            y={stageHeight-60}
                            width={200}
                            height={65}
                            fill='white'//Color del fondo
                            cornerRadius={10}
                            ></Rect>
                            <Rect
                            x={stageWidth-60}
                            y={stageHeight-60}
                            width={70}
                            height={70}
                            fill='white'//Color del fondo
                            cornerRadius={10}
                            ></Rect>
                    <Group key={"BotonesPasos"}>
                        <Group key={"BotonPasoPrevio"} onClick={() => handleGoToIndex(currentLogIndex-1)}>
                            <Circle
                                x={20}
                                y={stageHeight-30}
                                radius={20}
                                fill='#3B684D'//Color del fondo
                                cornerRadius={10}
                                ></Circle>
                            {imagePrevio && (
                                <Image
                                    image={imagePrevio}
                                    x={0}
                                    y={stageHeight - 50}
                                    width={40}
                                    height={40}
                                />
                                )}
                        </Group>

                        <Group key={"BotonPasoSiguiente"} onClick={() => handleGoToIndex(currentLogIndex+1)}>
                            <Circle
                                x={stageWidth-30}
                                y={stageHeight-30}
                                width={40}
                                height={40}
                                fill='#3B684D'//Color del fondo
                                cornerRadius={10}
                                ></Circle>
                            {imageSiguiente && (
                                <Image
                                    image={imageSiguiente}
                                    x={stageWidth-50}
                                    y={stageHeight-50}
                                    width={40}
                                    height={40}
                                />
                                )}
                        </Group>
                    </Group>
                    <BotonesTamanoComponent
                    stageWidth={stageWidth} 
                    stageHeight={stageHeight} 
                    setTextSize={setTextSize}/>
                </Layer>
        </>
    );
};

export default KonvaController;
