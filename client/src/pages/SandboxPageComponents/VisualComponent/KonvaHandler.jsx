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
              } else if ((index < paso.posEnPatron)&&(paso.patronDeBusqueda != "Boyer-Moore")) {
                color = '#63BB66'; // Verde
              } else if (index === paso.posEnPatron) {
                color = getColorFromStatus(paso.status);
              } else if ((index < paso.posEnPatron)&&(paso.patronDeBusqueda == "Boyer-Moore")) {
                color = '#B0C4C3'; // Gris
              } else if ((index > paso.posEnPatron)&&(paso.patronDeBusqueda == "Boyer-Moore")) {
                color = '#63BB66'; // Gris
              } else {
                color = '#B0C4C3'; // Gris
              }
              return (
                <React.Fragment key={`${pcaracter}-${index}`}>
                  <Rect
                      x={(index * distancia)+ (paso.posComienzoPatron*distancia)}
                      y={paso.alturaY*distancia}
                      width={tamanoTexto + 10}
                      height={tamanoTexto + 7}
                      stroke='black'
                      fill={color} // Aquí se establece el color de fondo
                      strokeWidth={tamanoTexto/10} 
                  />
                  <Text
                      x={(index * distancia +(tamanoTexto/7)) + (paso.posComienzoPatron*distancia)}
                      y={paso.alturaY*distancia + tamanoTexto/6}
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
                        x={(index * distancia) + tamanoTexto/7}
                        y={tamanoTexto/6}
                        text={mcaracter}
                        fontSize={tamanoTexto}
                    />
                </React.Fragment>
            ))}
          </Group>
    );
  };

  export const establecerDibujoFinal = (paso, textSize) => {
    const caracteresPatron = paso.pattern.split('');
    const tamanoTexto = textSize;
    const distancia = tamanoTexto +(tamanoTexto/2)+5; // Distancia entre caracteres

    return (
        <Group key={`${paso.id}-FIN-`}>
            {caracteresPatron.map((pcaracter, index) => {
             let color = '#C9F0FF'; // azul;
             let despX=paso.motherString.length-paso.pattern.length;
             
              return (
                <React.Fragment key={`${pcaracter}-${index}`}>
                  <Rect
                      x={(index * distancia)+ ((despX+1)*distancia)}
                      y={(paso.alturaY)*distancia}
                      width={tamanoTexto + 10}
                      height={tamanoTexto + 7}
                      stroke='black'
                      fill={color} // Aquí se establece el color de fondo
                      strokeWidth={tamanoTexto/10} 
                  />
                  <Text
                      x={(index * distancia +(tamanoTexto/7)) + ((despX+1) *distancia)}
                      y={((paso.alturaY)*distancia + tamanoTexto/6)}
                      text={pcaracter}
                      fontSize={tamanoTexto} />
                </React.Fragment>
              );
            })}
        </Group>
    );
  };

  export const establecerDibujoInicialTablaKMP = (paso, tableTextSize) => {
    // Crear una lista de caracteres del patrón
    const caracteresPatron = paso.pattern.split('');
    const tamanoTexto = tableTextSize-20; 
    const distancia = tamanoTexto + 15; // Distancia entre caracteres
  
    // Crear la tabla de fallos
    //const tablaFallos = paso.tablaSgte;
  
    
    // Crear los componentes Konva para cada carácter y su correspondiente valor en la tabla lps
    const componentesKonva = caracteresPatron.map((caracter, index) => (
      <Group key={`${paso.id}-IN-T-${index}`}>
        {
          <>
          <Rect fill='white' x={10} y={10+distancia+(index*distancia)} width={distancia} height={tamanoTexto+5} stroke='black' ></Rect>
          <Text text={`${index}`} x={27} y={15+distancia+(index*distancia)} fontSize={tamanoTexto} />
          <Rect fill='white' x={distancia+10} y={10+distancia+(index*distancia)} width={distancia+10} height={tamanoTexto+5} stroke='black'></Rect>
          <Text text={`${caracter}`}x={distancia+20} y={15+distancia+(index*distancia)} fontSize={tamanoTexto} />
          </>
        }

        {index==0 && 
          <>
          <Rect fill='#C9F0FF' x={20+distancia*2} y={10+distancia+(index*distancia)} width={distancia*2} height={tamanoTexto+5} stroke='black'></Rect>
          <Text text={`0`} x={35+distancia*2} y={15+distancia+(index*distancia)} fontSize={tamanoTexto} />
          </>
        }
      </Group>
    ));
  
    return (
      <Group key={`${paso.id}-IN-T`}>
        <Rect fill='#B0C4C3' x={10} y={10} width={distancia} height={tamanoTexto+5} stroke='black' ></Rect>
        <Text text={`i`} x={27} y={13} fontSize={tamanoTexto} />
        <Rect fill='#B0C4C3' x={distancia+10} y={10} width={distancia+10} height={tamanoTexto+5} stroke='black'></Rect>
        <Text text={`P[i]`}x={distancia+12} y={13} fontSize={tamanoTexto} />
        <Rect fill='#B0C4C3' x={20+distancia*2} y={10} width={distancia*2} height={tamanoTexto+5} stroke='black'></Rect>
        <Text text={`Sgte[i]`} x={20+distancia*2} y={13} fontSize={tamanoTexto} />
        {componentesKonva}
      </Group>
    );
  };


  export const establecerDibujoTablaKMP = (paso, tableTextSize) => {
    // Crear una lista de caracteres del patrón
    const caracteresPatron = paso.pattern.split('');
    const tamanoTexto = tableTextSize-20; 
    const distancia = tamanoTexto + 15; // Distancia entre caracteres
  
    // Crear la tabla de fallos
    const tablaFallos = paso.tablaSgte;
    // Crear los componentes Konva para cada carácter y su correspondiente valor en la tabla lps
    const componentesKonva = caracteresPatron.map((caracter, index) => (
      <Group key={`${paso.id}-PAS-T-${index}`}>
        {paso.posEnPatron==index && 
          <>
          <Rect fill='#C9F0FF' x={20+distancia*2} y={10+distancia+(index*distancia)} width={distancia*2} height={tamanoTexto+5} stroke='black'></Rect>
          <Text text={`${tablaFallos[index]}`} x={35+distancia*2} y={15+distancia+(index*distancia)} fontSize={tamanoTexto} />
          </>
        }
      </Group>
    ));
  
    return (
      <Group key={`${paso.id}-PAS-T`}>
        {componentesKonva}
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

  export default {dibujoVacio, errorKonva, establecerDibujoInicial,establecerDibujo,establecerDibujoInicialTablaKMP };