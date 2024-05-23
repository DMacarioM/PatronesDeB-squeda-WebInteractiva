import React, { useContext, useEffect, useState, useRef } from 'react';
import { Stage, Layer, Text, Rect,Group } from 'react-konva';
import { useLogContext } from "../../../context/useLogContext";
import Konva from 'konva';

const getColorFromStatus = (status) => {
  switch (status) {
    case 'Fallo':
      return 'red';
    case 'Acierto':
      return 'yellow';
    case 'EXITO':
      return 'green';
    default:
      return 'white';
  }
};

const establecerDibujo = (paso) => {

  //Necesito: 
  //- Comprobar si el paso es de tipo FuerzaBruta o no, en caso de que sí, se creará una Layer encima del actual para mostrar la tabla

  // Crear una lista de caracteres
  const caracteresMadre = paso.motherString.split('');
  const caracteresPatron = paso.pattern.split('');
  const tamanoTexto = 50; // Tamaño del texto
  const distancia = tamanoTexto +20; // Distancia entre caracteres

  return (
    <Stage width={960} height={500}>
      <Layer
        x={4}
        y={4}
      >
        <Group draggable>
          {caracteresMadre.map((mcaracter, index) => (
            <React.Fragment key={index}>
            <Text
              x={(index * distancia + 10)}
              y={6}
              text={mcaracter}
              fontSize={tamanoTexto}
              draggable
            />
            <Rect
              x={(index * distancia)}
              y={0}
              width={tamanoTexto+7}
              height={tamanoTexto+7}
              stroke='black'
              strokeWidth={4}
            />
          </React.Fragment>
          ))}

          {caracteresPatron.map((pcaracter, index) => (
            <React.Fragment key={index}>
              {paso.posEnPatron==index && (
                  <>
                  <Rect
                    x={(index * distancia)+ (paso.posEnCMadre*distancia)}
                    y={paso.alturaY*distancia}
                    width={tamanoTexto + 5}
                    height={tamanoTexto + 5}
                    stroke='black'
                    fill={getColorFromStatus(paso.status)} // Aquí se establece el color de fondo
                    strokeWidth={4} />
                     
                  <Text
                  x={(index * distancia + 9) + (paso.posEnCMadre*distancia)}
                  y={paso.alturaY*distancia + 6}
                  text={pcaracter}
                  fontSize={tamanoTexto}
                  draggable />  
                   </>)}   
          </React.Fragment>
           ))}
        </Group>
      </Layer>
    </Stage>
  );
};

const establecerDibujoInicial = (paso) => {
  return (
    <Stage width={960} height={500}>
      <Layer
        x={4}
        y={4}
      >
        <Group draggable>
          {caracteresMadre.map((mcaracter, index) => (
            <React.Fragment key={index}>
            <Text
              x={(index * distancia + 10)}
              y={6}
              text={mcaracter}
              fontSize={tamanoTexto}
              draggable
            />
            <Rect
              x={(index * distancia)}
              y={0}
              width={tamanoTexto+7}
              height={tamanoTexto+7}
              stroke='black'
              strokeWidth={4}
            />
          </React.Fragment>
          ))}
        </Group>
      </Layer>
    </Stage>
  );
};

const establecerDibujoFinal = (paso) => {
  return (
    <Stage width={960} height={500}>
      <Layer>
        {paso && (
          <Text
            text={paso.message}
            fontSize={20} // Modifica el tamaño de las letras aquí
            draggable
          />
        )}
      </Layer>
    </Stage>
  );
};

const dibujoVacio = (paso) =>{
  return (
    <Stage width={960} height={500}>
      <Layer>
        
      </Layer>
    </Stage>
  );
};

const KonvaComponent = () => {
  const { pasos, setDrawStatus, currentLogIndex } = useLogContext();
  const [Stage, setStage] = useState(dibujoVacio);
  const timeoutRef = useRef(null);

  useEffect(() => {
    console.log(currentLogIndex);
    //console.log("Soy "+pasos[currentLogIndex]?.message);
    if(timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if(pasos[currentLogIndex]){

      if((pasos[currentLogIndex].status=="EXECUTE")||(pasos[currentLogIndex].status=="FIN")){
        /*if(pasos[currentLogIndex].status=="FIN"){
          setDrawStatus(pasos[currentLogIndex], establecerDibujoFinal(pasos[currentLogIndex]))
        }else{
          setDrawStatus(pasos[currentLogIndex], establecerDibujoInicial(pasos[currentLogIndex]))
        }
        console.log("PintaEspecial");
        setStage(pasos[currentLogIndex].drawStatus);
        return;*/
      }else if(pasos[currentLogIndex-1]){
        if(pasos[currentLogIndex-1]?.drawStatus){
          if((pasos[currentLogIndex-1].status == "Fallo")) {
            pasos[currentLogIndex].alturaY = (pasos[currentLogIndex-1]?.alturaY +1) || 1;
          }else{
            pasos[currentLogIndex].alturaY = pasos[currentLogIndex-1]?.alturaY || 1;
          }
          console.log("PintaPrevio");
          //setDrawStatus(pasos[currentLogIndex], establecerDibujo(pasos[currentLogIndex]));
          setStage(pasos[currentLogIndex-1].drawStatus);
        }else{
          setStage(dibujoVacio());
        }
      }

      //Pisa el dibujo anterior con el Nuevo? o cojo el anterior y creo el dibujo

      if(!pasos[currentLogIndex].drawStatus){
        console.log("PintaActual");
        setDrawStatus(pasos[currentLogIndex], establecerDibujo(pasos[currentLogIndex]))
      }

      // Pinta (o no) el dibujo del paso anterior, ahora pinta el paso
      
      const tiempoRetraso = 2000; // Define tu tiempo de retraso aquí (en milisegundos)
      timeoutRef.current = setTimeout(() => {
        if(pasos[currentLogIndex]?.drawStatus){
          console.log("SetActual");
          setStage(pasos[currentLogIndex].drawStatus);
        }
      },tiempoRetraso);
    }
    
    return () => {
      if(timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, [pasos,currentLogIndex]);

  return (
    <div>
      {Stage}
    </div>
  );
};


export default KonvaComponent;
