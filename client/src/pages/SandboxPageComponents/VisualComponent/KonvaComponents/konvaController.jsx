import React, { useContext, useEffect, useState, useRef } from 'react';
import { Stage, Layer,  Text, Rect,Group, Image} from "react-konva";
import { useLogContext } from "../../../../context/useLogContext";
import { dibujoVacio ,errorKonva, establecerDibujo , establecerDibujoInicial,establecerDibujoInicialTabla } from "../KonvaHandler";
import useImage from '../../../../context/useImage';


const KonvaController = ({ stageWidth, stageHeigth, setTextSize }) => {
    
    const {setCurrentLogIndex,currentLogIndex,lastLogIndex} = useLogContext();

    const imageAumentar = useImage('../../../../public/aumentar-fuente.png'); // Carga la imagen
    const imageReducir = useImage('../../../../public/reducir-fuente.png');
    const imagePrevio = useImage('../../../../public/paso-previo.png');
    const imageSiguiente = useImage('../../../../public/paso-siguiente.png');

    const handleGoToIndex = (index) => {
        console.log(index);
        if(index>=0 && index<=lastLogIndex){
            setCurrentLogIndex(index);
        }
      };
    
    return (
        <>
                <Layer>
                    {/*<Rect
                        x={stageWidth/3}
                        y={stageHeigth-70}
                        width={350}
                        height={65}
                        fill='#85C2FF'
                        cornerRadius={7}
                        stroke='black'
                        strokeWidth={2}
                        ></Rect>*/
                    }
                    <Group key={"BotonesPasos"}>
                        <Group key={"BotonPasoPrevio"} onClick={() => handleGoToIndex(currentLogIndex-1)}>
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

                    <Group key={"BotonesTamano"}>
                        <Group key={"BotonReducir"} onClick={() => setTextSize(size => size - 2)}>
                            <Rect
                            x={75}
                            y={stageHeigth -50}
                            width={50}
                            height={40}
                            fill='#C5D3D2'
                            cornerRadius={7}
                            stroke='black'
                            strokeWidth={2}
                        />
                        {imageReducir && (
                            <Image
                                image={imageReducir}
                                x={80}
                                y={stageHeigth -47}
                                width={35}
                                height={35}
                            />
                            )}

                        </Group>
                        <Group key={"BotonAumentar"} onClick={() => setTextSize(size => size + 2)}>
                            <Rect
                            x={135}
                            y={stageHeigth -50}
                            width={50}
                            height={40}
                            fill='#C5D3D2'
                            cornerRadius={7}
                            stroke='black'
                            strokeWidth={2}
                            />
                            {imageAumentar && (
                            <Image
                                image={imageAumentar}
                                x={143}
                                y={stageHeigth - 48}
                                width={34}
                                height={35}
                            />
                            )}
                        </Group>
                    </Group>
                </Layer>
        </>
    );
};

export default KonvaController;
