import React from 'react';
import { Stage, Layer, Text, Rect, Group } from "react-konva";
import PropTypes from 'prop-types';

export const getColorFromStatus = (status) => {
  const colors = {
    'FALLO': '#C33030',
    'ACIERTO': '#5B9C70',
    'EXITO': '#30C35F',
    'NEWELEMENT': '#85C2FF',
    'Grey': '#B0C4C3',
  };
  return colors[status] || 'white';
};

// Function to calculate the distance between characters
const calculateDistance = (textSize) => textSize + (textSize / 2) + 5;

export const establecerDibujo = (paso, textSize) => {
  const caracteresPatron = paso.pattern.split('');
  const distancia = calculateDistance(textSize);

  return (
    <Group key={`${paso.id}-PAS-`}>
      {caracteresPatron.map((pcaracter, index) => {
        let color = getColorFromStatus('Grey');
        if (paso.status === 'EXITO') {
          color = getColorFromStatus('EXITO');
        } else if (index < paso.posEnPatron && paso.patronDeBusqueda !== "Boyer-Moore") {
          color = '#63BB66';
        } else if (index === paso.posEnPatron) {
          color = getColorFromStatus(paso.status);
        } else if (index < paso.posEnPatron && paso.patronDeBusqueda === "Boyer-Moore") {
          color = '#B0C4C3';
        } else if (index > paso.posEnPatron && paso.patronDeBusqueda === "Boyer-Moore") {
          color = '#63BB66';
        }

        return (
          <React.Fragment key={`${pcaracter}-${index}`}>
            <Rect
              x={(index * distancia) + (paso.posComienzoPatron * distancia)}
              y={paso.alturaY * distancia}
              width={textSize + 10}
              height={textSize + 7}
              stroke='black'
              fill={color}
              strokeWidth={textSize / 10}
            />
            <Text
              x={(index * distancia + (textSize / 7)) + (paso.posComienzoPatron * distancia)}
              y={paso.alturaY * distancia + textSize / 6}
              text={pcaracter}
              fontSize={textSize}
            />
          </React.Fragment>
        );
      })}
    </Group>
  );
};



export const establecerDibujoInicial = (paso, textSize) => {
  const caracteresMadre = paso.motherString.split('');
  const distancia = calculateDistance(textSize);

  return (
    <Group key={`${paso.id}-IN-`}>
      {caracteresMadre.map((mcaracter, index) => (
        <React.Fragment key={`${mcaracter}-${index}`}>
          <Rect
            x={(index * distancia)}
            y={0}
            width={textSize + 10}
            height={textSize + 7}
            stroke='black'
            strokeWidth={textSize / 10}
          />
          <Text
            x={(index * distancia) + textSize / 7}
            y={textSize / 6}
            text={mcaracter}
            fontSize={textSize}
          />
        </React.Fragment>
      ))}
    </Group>
  );
};

export const establecerDibujoFinal = (paso, textSize) => {
  const caracteresPatron = paso.pattern.split('');
  const distancia = calculateDistance(textSize);
  const despX = paso.motherString.length - paso.pattern.length;

  return (
    <Group key={`${paso.id}-FIN-`}>
      {caracteresPatron.map((pcaracter, index) => (
        <React.Fragment key={`${pcaracter}-${index}`}>
          <Rect
            x={(index * distancia) + ((despX + 1) * distancia)}
            y={(paso.alturaY) * distancia}
            width={textSize + 10}
            height={textSize + 7}
            stroke='black'
            fill='#C9F0FF'
            strokeWidth={textSize / 10}
          />
          <Text
            x={(index * distancia + (textSize / 7)) + ((despX + 1) * distancia)}
            y={((paso.alturaY) * distancia + textSize / 6)}
            text={pcaracter}
            fontSize={textSize}
          />
        </React.Fragment>
      ))}
    </Group>
  );
};

export const establecerDibujoInicialTablaKMP = (paso, tableTextSize) => {
  const caracteresPatron = paso.pattern.split('');
  const tamanoTexto = (tableTextSize - 20) < 20 ? 20 : (tableTextSize - 20);
  const distancia = tamanoTexto + 15;

  

  const componentesKonva = caracteresPatron.map((caracter, index) => (
    <Group key={`${paso.id}-IN-T-${index}`}>
      <>
        <Rect fill='white' x={10} y={20 + distancia + (index * distancia)} width={distancia} height={tamanoTexto + 5} stroke='black' />
        <Text text={`${index}`} x={27} y={25 + distancia + (index * distancia)} fontSize={tamanoTexto} />
        <Rect fill='white' x={distancia + 10} y={20 + distancia + (index * distancia)} width={distancia + 10} height={tamanoTexto + 5} stroke='black' />
        <Text text={`${caracter}`} x={distancia + 20} y={25 + distancia + (index * distancia)} fontSize={tamanoTexto} />
      </>
      {index === 0 && (
        <>
          <Rect fill='#C9F0FF' x={20 + distancia * 2} y={20 + distancia + (index * distancia)} width={distancia * 2} height={tamanoTexto + 5} stroke='black' />
          <Text text={`-1`} x={35 + distancia * 2} y={25 + distancia + (index * distancia)} fontSize={tamanoTexto} />
        </>
      )}
    </Group>
  ));

  return (
    <Group key={`${paso.id}-IN-T`}>
      <Rect fill='#B0C4C3' x={10} y={20} width={distancia} height={tamanoTexto + 5} stroke='black' />
      <Text text={`i`} x={27} y={23} fontSize={tamanoTexto} />
      <Rect fill='#B0C4C3' x={distancia + 10} y={20} width={distancia + 10} height={tamanoTexto + 5} stroke='black' />
      <Text text={`P[i]`} x={distancia + 12} y={23} fontSize={tamanoTexto} />
      <Rect fill='#B0C4C3' x={20 + distancia * 2} y={20} width={distancia * 2} height={tamanoTexto + 5} stroke='black' />
      <Text text={`Sgte[i]`} x={20 + distancia * 2} y={23} fontSize={tamanoTexto} />
      {componentesKonva}
    </Group>
  );
};

export const establecerDibujoTablaKMP = (paso, tableTextSize) => {
  const caracteresPatron = paso.pattern.split('');
  const tamanoTexto = (tableTextSize - 20) < 20 ? 20 : (tableTextSize - 20);
  const distancia = tamanoTexto + 15;
  const tablaFallos = paso.tablaSgte;

  const componentesKonva = caracteresPatron.map((caracter, index) => (
    <Group key={`${paso.id}-PAS-T-${index}`}>
      {paso.posEnPatron === index && (
        <>
          <Rect fill='#C9F0FF' x={20 + distancia * 2} y={20 + distancia + (index * distancia)} width={distancia * 2} height={tamanoTexto + 5} stroke='black' />
          <Text text={`${tablaFallos[index]}`} x={35 + distancia * 2} y={25 + distancia + (index * distancia)} fontSize={tamanoTexto} />
        </>
      )}
    </Group>
  ));

  return (
    <Group key={`${paso.id}-PAS-T`}>
      {componentesKonva}
    </Group>
  );
};

export const establecerDibujoInicialPrimeraTablaBM = (paso, tableTextSize) => {
  const caracteresPatron = paso.pattern.split('');
  const caracteresUnicos = Array.from(new Set([...caracteresPatron]));

  const tamanoTexto = (tableTextSize - 20) < 20 ? 20 : (tableTextSize - 20);
  const distancia = tamanoTexto + 15;

  const componentesKonva = caracteresUnicos.map((caracter, index) => (
    <Group key={`${paso.id}-IN-T1-${index}`}>
      <>
        <Rect fill='white' x={10} y={20 + distancia + (index * distancia)} width={distancia} height={tamanoTexto + 5} stroke='black' />
        <Text text={`${caracter}`} x={27} y={25 + distancia + (index * distancia)} fontSize={tamanoTexto} />
        <Rect fill='#C9F0FF' x={distancia + 10} y={20 + distancia + (index * distancia)} width={distancia * 2} height={tamanoTexto + 5} stroke='black' />
        <Text text={`${caracteresPatron.length}`} x={27 + distancia * 2} y={25 + distancia + (index * distancia)} fontSize={tamanoTexto} />
      </>
    </Group>
  ));

  return (
    <Group key={`${paso.id}-IN-T1`}>
      <Rect fill='#B0C4C3' x={10} y={20} width={distancia} height={tamanoTexto + 5} stroke='black' />
      <Text text={`c`} x={27} y={23} fontSize={tamanoTexto} />
      <Rect fill='#B0C4C3' x={distancia + 10} y={20} width={distancia * 2} height={tamanoTexto + 5} stroke='black' />
      <Text text={`D1[c]`} x={distancia + 12} y={23} fontSize={tamanoTexto} />
      {componentesKonva}
    </Group>
  );
};

  export const establecerDibujoPrimeraTablaBM = (paso, tableTextSize) => {
    const caracteresPatron = paso.pattern.split('');
    const caracteresUnicos = Array.from(new Set([...caracteresPatron]));
    const tamanoTexto = (tableTextSize - 20) < 20 ? 20 : (tableTextSize - 20);
    const distancia = tamanoTexto + 15;

    const componentesKonva = caracteresUnicos.map((caracter, index) => {
      if (caracter === paso.posEnCaracter) {
        return (
          <Group key={`${paso.id}-PAS-T1-${index}`}>
            <>
              <Rect fill='#C9F0FF' x={distancia + 10} y={20 + distancia + (index * distancia)} width={distancia * 2} height={tamanoTexto + 5} stroke='black' />
              <Text text={`${paso.D1[caracter]}`} x={27 + distancia * 2} y={25 + distancia + (index * distancia)} fontSize={tamanoTexto} />
            </>
          </Group>
        );
      }
      return null;
    });

    return (
      <Group key={`${paso.id}-PAS-T1`}>
        {componentesKonva}
      </Group>
    );

  };

  export const establecerDibujoInicialSegundaTablaBM = (paso, tableTextSize) => {
    const caracteresPatron = paso.pattern.split('');
    const tamanoTexto = (tableTextSize - 20) < 20 ? 20 : (tableTextSize - 20);
    const distancia = tamanoTexto + 15;
  
    const componentesKonva = caracteresPatron.map((caracter, index) => (
      <Group key={`${paso.id}-IN-T-BM2-${index}`}>
        <Rect fill='white' x={10} y={20 + distancia + (index * distancia)} width={distancia} height={tamanoTexto + 5} stroke='black' />
        <Text text={`${index}`} x={27} y={25 + distancia + (index * distancia)} fontSize={tamanoTexto} />
        <Rect fill='white' x={distancia + 10} y={20 + distancia + (index * distancia)} width={distancia + 10} height={tamanoTexto + 5} stroke='black' />
        <Text text={`${caracter}`} x={distancia + 20} y={25 + distancia + (index * distancia)} fontSize={tamanoTexto} />
        <Rect fill='#C9F0FF' x={20 + distancia * 2} y={20 + distancia + (index * distancia)} width={distancia * 2} height={tamanoTexto + 5} stroke='black' />
        <Text text={`0`} x={35 + distancia * 2} y={25 + distancia + (index * distancia)} fontSize={tamanoTexto} />
      </Group>
    ));
  
    return (
      <Group key={`${paso.id}-IN-T-BM2-`}>
        <Rect fill='#B0C4C3' x={10} y={20} width={distancia} height={tamanoTexto + 5} stroke='black' />
        <Text text={`i`} x={27} y={25} fontSize={tamanoTexto} />
        <Rect fill='#B0C4C3' x={distancia + 10} y={20} width={distancia + 10} height={tamanoTexto + 5} stroke='black' />
        <Text text={`P[i]`} x={distancia + 12} y={23} fontSize={tamanoTexto} />
        <Rect fill='#B0C4C3' x={20 + distancia * 2} y={20} width={distancia * 2} height={tamanoTexto + 5} stroke='black' />
        <Text text={`D2[i]`} x={30 + distancia * 2} y={23} fontSize={tamanoTexto} />
        {componentesKonva}
      </Group>
    );
  };
  
  export const establecerDibujoSegundaTablaBM = (paso, tableTextSize) => {
    const caracteresPatron = paso.pattern.split('');
    const tamanoTexto = (tableTextSize - 20) < 20 ? 20 : (tableTextSize - 20);
    const distancia = tamanoTexto + 15;
    const tablaBuenosSufijos = paso.tablaD2[0];
  
    const componentesKonva = caracteresPatron.map((caracter, index) => (
      <Group key={`${paso.id}-PAS-T-BM2-${index}`}>
        {paso.posEnPatron === index && (<>
          <Rect fill='#C9F0FF' x={20 + distancia * 2} y={20 + distancia + (index * distancia)} width={distancia * 2} height={tamanoTexto + 5} stroke='black' />
          <Text text={`${tablaBuenosSufijos[(paso.pattern.length - 1) - index]}`} x={35 + distancia * 2} y={25 + distancia + (index * distancia)} fontSize={tamanoTexto} />
          </>)}
        </Group>
    ));
  
    return (
      <Group key={`${paso.id}-PAS-T-BM2`}>
        {componentesKonva}
      </Group>
    );
  };
  
  export const dibujoVacio = () => (
    <Group key={`-RESET-`}>
      <Text text=' ' />
    </Group>
  );
  
  export const errorKonva = () => (
    <Group key={`-Error-`}>
      <Text text='Error desconocido' />
    </Group>
  );
  
 
  export default {dibujoVacio, errorKonva, establecerDibujoInicial,establecerDibujo,establecerDibujoInicialTablaKMP,establecerDibujoInicialPrimeraTablaBM,establecerDibujoInicialPrimeraTablaBM,establecerDibujoSegundaTablaBM};