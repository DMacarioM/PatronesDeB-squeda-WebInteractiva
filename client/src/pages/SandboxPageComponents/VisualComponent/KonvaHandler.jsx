import React, { useContext, useEffect, useState, useRef } from 'react';
import { Stage, Layer,  Text, Rect,Group} from "react-konva";
import { useLogContext } from "../../../context/useLogContext";

export const getColorFromStatus = (status) => {
    switch (status) {
      case 'Fallo': return '#FF0000';
      case 'Acierto': return '#63BB66';
      case 'EXITO': return '#9CCC66';
      case 'NEWELEMENT': return '#85C2FF';
      case 'Grey': return '#B0C4C3';
      default: return 'white';
    }
  };

  //TODO: Comprobar si el paso es de tipo FuerzaBruta o no, en caso de que sí, se creará una Layer encima del actual para mostrar la tabla
  //TODO: Controlar Tiempo de espera y TamañoTexto en variables "globales" con botones para editarlos

  export const establecerDibujo = (paso, textSize) => {
    const caracteresPatron = paso.pattern.split('');
    const tamanoTexto = textSize;
    const distancia = tamanoTexto +(tamanoTexto/2)+5; // Distancia entre caracteres

    return (
        <Group key={`${paso.id}-PAS-`}>
            {caracteresPatron.map((pcaracter, index) => {
             let color;
              if (paso.status === 'EXITO') {
                color = getColorFromStatus('EXITO');
              } else if (index < paso.posEnPatron) {
                color = '#63BB66'; // Verde
              } else if (index === paso.posEnPatron) {
                color = getColorFromStatus(paso.status);
              } else {
                color = '#B0C4C3'; // Gris
              }
              return (
                <React.Fragment key={`${pcaracter}-${index}`}>
                  <Rect
                      x={(index * distancia)+ (paso.posEnCMadre*distancia)}
                      y={paso.alturaY*distancia}
                      width={tamanoTexto + 10}
                      height={tamanoTexto + 7}
                      stroke='black'
                      fill={color} // Aquí se establece el color de fondo
                      strokeWidth={tamanoTexto/10} 
                  />
                  <Text
                      x={(index * distancia +9) + (paso.posEnCMadre*distancia)}
                      y={paso.alturaY*distancia + 6}
                      text={pcaracter}
                      fontSize={tamanoTexto} />
                </React.Fragment>
              );
            })}
        </Group>
    );
  };


  export const establecerDibujoInicial = (paso, textSize) => {
    // Crear una lista de caracteres
    const caracteresMadre = paso.motherString.split('');
    //const caracteresPatron = paso.pattern.split('');
    const tamanoTexto = textSize; 
    const distancia = tamanoTexto +(tamanoTexto/2)+5;  // Distancia entre caracteres

    return (
          <Group key={`${paso.id}-IN-`}>
            {caracteresMadre.map((mcaracter, index) => (
                <React.Fragment key={`${mcaracter}-${index}`}>
                    <Rect
                        x={(index * distancia)}
                        y={0}
                        width={tamanoTexto+10}
                        height={tamanoTexto+7}
                        stroke='black'
                        strokeWidth={tamanoTexto/10}
                    />
                    <Text
                        x={(index * distancia) +9}
                        y={6}
                        text={mcaracter}
                        fontSize={tamanoTexto}
                    />
                </React.Fragment>
            ))}
          </Group>
    );
  };

  export const establecerDibujoInicialTabla = (paso, numero) => {
    // Crear una lista de caracteres
    const caracteresMadre = paso.motherString.split('');
    const tamanoTexto = 50; 
    const distancia = tamanoTexto +20; // Distancia entre caracteres

    return (
          <Group key={`${paso.id}-IN-`}>
            {caracteresMadre.map((mcaracter, index) => (
                <React.Fragment key={`${mcaracter}-${index}`}>
                 
                </React.Fragment>
            ))}
          </Group>
    );
  };

  export const dibujoVacio = () => {
    return (
          <Group key={`-RESET-`}>
            <Text text=' ' />
          </Group>
    );
  };
  export const errorKonva = () => {
    return (
          <Group key={`-Error-`}>
           <Text text='Error desconocido' />
          </Group>
    );
  };

  export default {dibujoVacio, errorKonva, establecerDibujoInicial,establecerDibujo };