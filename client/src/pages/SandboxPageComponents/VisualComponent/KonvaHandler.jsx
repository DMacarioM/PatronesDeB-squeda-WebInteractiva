import React from 'react';
import { Stage, Layer, Text, Rect, Group } from "react-konva";
import PropTypes from 'prop-types';

export const getColorFromStatus = (status) => {
  const colors = {
    'FALLO': '#C33030',
    'ACIERTO': '#30C35F',
    'EXITO': '#63F691',
    'NEWELEMENT': '#E7863C',
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
          color = '#30C35F';
        } else if (index === paso.posEnPatron) {
          color = getColorFromStatus(paso.status);
        } else if (index < paso.posEnPatron && paso.patronDeBusqueda === "Boyer-Moore") {
          color = '#B0C4C3';
        } else if (index > paso.posEnPatron && paso.patronDeBusqueda === "Boyer-Moore") {
          color = '#30C35F';
        }

        return (
          <React.Fragment key={`${pcaracter}-${index}`}>
            <Rect
              x={10+(index * distancia) + (paso.posComienzoPatron * distancia)}
              y={10+paso.alturaY * distancia}
              width={textSize + 10}
              height={textSize + 7}
              stroke='black'
              fill={color}
              strokeWidth={textSize / 10}
            />
            <Text
              x={10+(index * distancia + (textSize / 7)) + (paso.posComienzoPatron * distancia)}
              y={10+paso.alturaY * distancia + textSize / 6}
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
      {/**Rectangulo que lo englobe¿? */}
      <Rect
            x={-9000}
            y={0}
            width={99999}
            height={distancia}
            stroke='#53725D'
            strokeWidth={textSize / 10}
            fill='#9DB0A3'
          />
      {caracteresMadre.map((mcaracter, index) => (
        <React.Fragment key={`${mcaracter}-${index}`}>
          <Rect
            x={10+(index * distancia)}
            y={distancia/7}
            width={textSize + 10}
            height={textSize + 7}
            stroke='black'
            fill='#E7EFE9'
            strokeWidth={textSize / 10}
          />
          <Text
            x={10+(index * distancia) + textSize / 7}
            y={textSize / 2}
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
            x={10+(index * distancia) + ((despX + 1) * distancia)}
            y={10+(paso.alturaY) * distancia}
            width={textSize + 10}
            height={textSize + 7}
            stroke='black'
            fill='#E7863C'
            strokeWidth={textSize / 10}
          />
          <Text
            x={10+(index * distancia + (textSize / 7)) + ((despX + 1) * distancia)}
            y={10+((paso.alturaY) * distancia + textSize / 6)}
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
        <Rect fill='#E7EFE9' x={10} y={20 + distancia + (index * distancia)} width={distancia} height={tamanoTexto + 5} stroke='black' />
        <Text text={`${index}`} x={27} y={25 + distancia + (index * distancia)} fontSize={tamanoTexto} />
        <Rect fill='#E7EFE9' x={distancia + 10} y={20 + distancia + (index * distancia)} width={distancia + 10} height={tamanoTexto + 5} stroke='black' />
        <Text text={`${caracter}`} x={distancia + 20} y={25 + distancia + (index * distancia)} fontSize={tamanoTexto} />
      </>
      {index === 0 && (
        <>
          <Rect fill='#E7863C' x={20 + distancia * 2} y={20 + distancia + (index * distancia)} width={distancia * 2} height={tamanoTexto + 5} stroke='black' />
          <Text text={`-1`} x={35 + distancia * 2} y={25 + distancia + (index * distancia)} fontSize={tamanoTexto} />
        </>
      )}
    </Group>
  ));

  return (
    <Group key={`${paso.id}-IN-T`}>
      <Rect fill='#8BA192' x={10} y={20} width={distancia} height={tamanoTexto + 5} stroke='black' />
      <Text text={`i`} x={27} y={23} fontSize={tamanoTexto} />
      <Rect fill='#8BA192' x={distancia + 10} y={20} width={distancia + 10} height={tamanoTexto + 5} stroke='black' />
      <Text text={`P[i]`} x={distancia + 12} y={23} fontSize={tamanoTexto} />
      <Rect fill='#8BA192' x={20 + distancia * 2} y={20} width={distancia * 2} height={tamanoTexto + 5} stroke='black' />
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
          <Rect fill='#E7863C' x={20 + distancia * 2} y={20 + distancia + (index * distancia)} width={distancia * 2} height={tamanoTexto + 5} stroke='black' />
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
        <Rect fill='#E7EFE9' x={10} y={20 + distancia + (index * distancia)} width={distancia} height={tamanoTexto + 5} stroke='black' />
        <Text text={`${caracter}`} x={27} y={25 + distancia + (index * distancia)} fontSize={tamanoTexto} />
        <Rect fill='#E7863C' x={distancia + 10} y={20 + distancia + (index * distancia)} width={distancia * 2} height={tamanoTexto + 5} stroke='black' />
        <Text text={`${caracteresPatron.length}`} x={27 + distancia * 2} y={25 + distancia + (index * distancia)} fontSize={tamanoTexto} />
      </>
    </Group>
  ));

  return (
    <Group key={`${paso.id}-IN-T1`}>
      <Rect fill='#8BA192' x={10} y={20} width={distancia} height={tamanoTexto + 5} stroke='black' />
      <Text text={`c`} x={27} y={23} fontSize={tamanoTexto} />
      <Rect fill='#8BA192' x={distancia + 10} y={20} width={distancia * 2} height={tamanoTexto + 5} stroke='black' />
      <Text text={`D1[c]`} x={distancia + 12} y={23} fontSize={tamanoTexto} />
      
      
      <Rect fill='#E7EFE9' x={10} y={20 + distancia + (caracteresUnicos.length * distancia)} width={distancia+20} height={tamanoTexto + 5} stroke='black' />
      <Text text={`Otros`} x={12} y={25 + distancia + (caracteresUnicos.length * distancia)} fontSize={tamanoTexto} />
      <Rect fill='#E7863C' x={distancia + 30} y={20 + distancia + (caracteresUnicos.length * distancia)} width={distancia * 2 - (distancia/2)} height={tamanoTexto + 5} stroke='black' />
      <Text text={`${caracteresPatron.length}`} x={27 + distancia * 2} y={25 + distancia + (caracteresUnicos.length * distancia)} fontSize={tamanoTexto} />
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
              <Rect fill='#E7863C' x={distancia + 10} y={20 + distancia + (index * distancia)} width={distancia * 2} height={tamanoTexto + 5} stroke='black' />
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
        <Rect fill='#E7EFE9' x={10} y={20 + distancia + (index * distancia)} width={distancia} height={tamanoTexto + 5} stroke='black' />
        <Text text={`${index}`} x={27} y={25 + distancia + (index * distancia)} fontSize={tamanoTexto} />
        <Rect fill='#E7EFE9' x={distancia + 10} y={20 + distancia + (index * distancia)} width={distancia + 10} height={tamanoTexto + 5} stroke='black' />
        <Text text={`${caracter}`} x={distancia + 20} y={25 + distancia + (index * distancia)} fontSize={tamanoTexto} />
        <Rect fill='#E7863C' x={20 + distancia * 2} y={20 + distancia + (index * distancia)} width={distancia * 2} height={tamanoTexto + 5} stroke='black' />
        {index==caracteresPatron.length-1 &&
        <><Text text={`-`} x={35 + distancia * 2} y={25 + distancia + (index * distancia)} fontSize={tamanoTexto} /></>
        }
        {index!=caracteresPatron.length-1 &&
        <><Text text={`0`} x={35 + distancia * 2} y={25 + distancia + (index * distancia)} fontSize={tamanoTexto} /></>
        }
        
      </Group>
    ));
  
    return (
      <Group key={`${paso.id}-IN-T-BM2-`}>
        <Rect fill='#8BA192' x={10} y={20} width={distancia} height={tamanoTexto + 5} stroke='black' />
        <Text text={`i`} x={27} y={25} fontSize={tamanoTexto} />
        <Rect fill='#8BA192' x={distancia + 10} y={20} width={distancia + 10} height={tamanoTexto + 5} stroke='black' />
        <Text text={`P[i]`} x={distancia + 12} y={23} fontSize={tamanoTexto} />
        <Rect fill='#8BA192' x={20 + distancia * 2} y={20} width={distancia * 2} height={tamanoTexto + 5} stroke='black' />
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
          {index!=caracteresPatron.length-1 &&
          <><Rect fill='#E7863C' x={20 + distancia * 2} y={20 + distancia + (index * distancia)} width={distancia * 2} height={tamanoTexto + 5} stroke='black' />
          <Text text={`${tablaBuenosSufijos[(paso.pattern.length - 1) - index]}`} x={35 + distancia * 2} y={25 + distancia + (index * distancia)} fontSize={tamanoTexto} />
          </>
          }
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
  
 
  export default {dibujoVacio, errorKonva, establecerDibujoInicial,establecerDibujo,establecerDibujoInicialTablaKMP,establecerDibujoInicialPrimeraTablaBM,establecerDibujoSegundaTablaBM};