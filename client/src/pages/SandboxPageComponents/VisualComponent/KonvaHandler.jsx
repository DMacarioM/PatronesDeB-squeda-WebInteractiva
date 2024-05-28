import React, { useContext, useEffect, useState, useRef } from 'react';
import { Stage, Layer,  Text, Rect,Group} from "react-konva";
import { useLogContext } from "../../../context/useLogContext";

export const getColorFromStatus = (status) => {
    switch (status) {
      case 'Fallo': return '#FF0000';
      case 'Acierto': return '#63BB66';
      case 'EXITO': return '#9CCC66';
      case 'NEWELEMENT': return '#85C2FF';
      default: return 'white';
    }
  };
  
  //TODO: Comprobar si el paso es de tipo FuerzaBruta o no, en caso de que sí, se creará una Layer encima del actual para mostrar la tabla
  //TODO: Controlar Tiempo de espera y TamañoTexto en variables "globales" con botones para editarlos

export const establecerDibujo = (paso) => {
    //const caracteresMadre = paso.motherString.split('');
    const caracteresPatron = paso.pattern.split('');
    const tamanoTexto = 50;
    const distancia = tamanoTexto +20; // Distancia entre caracteres
    return (
        <Group key={`${paso.id}-PAS-`}>
            {caracteresPatron.map((pcaracter, index) => (
              <React.Fragment key={`${pcaracter}-${index}`}>
                {paso.posEnPatron==index && (
                <>
                <Rect
                    x={(index * distancia)+ (paso.posEnCMadre*distancia)}
                    y={paso.alturaY*distancia}
                    width={tamanoTexto + 6}
                    height={tamanoTexto + 7}
                    stroke='black'
                    fill={getColorFromStatus(paso.status)} // Aquí se establece el color de fondo
                    strokeWidth={4} 
                />
                <Text
                    x={(index * distancia + 5) + (paso.posEnCMadre*distancia)}
                    y={paso.alturaY*distancia + 6}
                    text={pcaracter}
                    fontSize={tamanoTexto} />
                </>)}
            </React.Fragment>
        ))}
        </Group>
    );
  };

  export const establecerDibujoInicial = (paso) => {
    // Crear una lista de caracteres
    const caracteresMadre = paso.motherString.split('');
    //const caracteresPatron = paso.pattern.split('');
    const tamanoTexto = 50; 
    const distancia = tamanoTexto +20; // Distancia entre caracteres
  
    return (
          <Group key={`${paso.id}-IN-`}>
            {caracteresMadre.map((mcaracter, index) => (
                <React.Fragment key={`${mcaracter}-${index}`}>
                    <Rect
                        x={(index * distancia)}
                        y={0}
                        width={tamanoTexto+6}
                        height={tamanoTexto+7}
                        stroke='black'
                        strokeWidth={4}
                    />
                    <Text
                        x={(index * distancia) +5}
                        y={6}
                        text={mcaracter}
                        fontSize={tamanoTexto}
                    />
                </React.Fragment>
            ))}
          </Group>
    );
  };

export const dibujoVacio = () =>{
    return (
      <Group>
        <Text text="Error Desconocido"/>
      </Group>
    );
  };


export default null;