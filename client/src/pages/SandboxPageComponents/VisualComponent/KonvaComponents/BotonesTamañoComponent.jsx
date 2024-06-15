import React, { useContext, useEffect, useState, useRef } from 'react';
import { Stage, Layer,  Text, Rect,Group, Image, Circle} from "react-konva";
import { useLogContext } from "../../../../context/useLogContext";
import useImage from '../../../../context/useImage';


const BotonesTamanoComponent = ({ stageWidth, stageHeight, setTextSize }) => {
    
    const imageAumentar = useImage('/aumentar-fuente.png'); // Carga la imagen
    const imageReducir = useImage('/public/reducir-fuente.png');
  
    
    return (
        <>
        <Group key={"BotonesTamano"}>
            <Group key={"BotonReducir"} onClick={() => setTextSize(size => size - 2) }>
                <Rect
                x={75}
                y={stageHeight -50}
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
                    y={stageHeight -47}
                    width={35}
                    height={35}
                    />
                )}
            </Group>
            <Group key={"BotonAumentar"} onClick={() => setTextSize(size => size + 2)}>
                <Rect
                x={135}
                y={stageHeight -50}
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
                y={stageHeight - 48}
                width={34}
                height={35}
                />
            )}
            </Group>
        </Group>
    </>
    );
};

export default BotonesTamanoComponent;
