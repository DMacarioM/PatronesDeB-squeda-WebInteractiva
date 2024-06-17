import React, { useState } from 'react';
import { Stage, Layer, Rect, Group, Image } from "react-konva";
import useImage from '../../../../context/useImage';

const BotonesTamanoComponent = ({ stageWidth, stageHeight, setTextSize }) => {
    const imageAumentar = useImage('./aumentar-fuente.png'); // Carga la imagen
    const imageReducir = useImage('./reducir-fuente.png');
    const [hoveredButton, setHoveredButton] = useState(null);

    const handleSetSize = (size) => {
        setTextSize(size);
    };

    return (
        <Group key={"BotonesTamano"}>
            <Group
                key={"BotonReducir"}
                onClick={() => handleSetSize(size => size - 2)}
                onMouseEnter={() => setHoveredButton('reducir')}
                onMouseLeave={() => setHoveredButton(null)}
            >
                <Rect
                    x={70}
                    y={stageHeight - 50}
                    width={hoveredButton === 'reducir' ? 65 : 50}
                    height={40}
                    fill='#9DB0A3'
                    cornerRadius={7}
                    stroke='black'
                    strokeWidth={2}
                />
                {imageReducir && (
                    <Image
                        image={imageReducir}
                        x={hoveredButton === 'reducir' ? 82 : 80}
                        y={stageHeight - 47}
                        width={35}
                        height={35}
                    />
                )}
            </Group>
            <Group
                key={"BotonAumentar"}
                onClick={() => handleSetSize(size => size + 2)}
                onMouseEnter={() => setHoveredButton('aumentar')}
                onMouseLeave={() => setHoveredButton(null)}
            >
                <Rect
                    x={hoveredButton === 'aumentar' ? 135 : 145}
                    y={stageHeight - 50}
                    width={hoveredButton === 'aumentar' ? 70 : 50}
                    height={40}
                    fill='#9DB0A3'
                    cornerRadius={7}
                    stroke='black'
                    strokeWidth={2}
                />
                {imageAumentar && (
                    <Image
                        image={imageAumentar}
                        x={hoveredButton === 'aumentar' ? 155 : 153}
                        y={stageHeight - 48}
                        width={34}
                        height={35}
                    />
                )}
            </Group>
        </Group>
    );
};

export default BotonesTamanoComponent;
