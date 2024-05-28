import React, { useContext, useEffect, useState, useRef } from 'react';
import { Stage, Layer, Text, Rect,Group } from 'react-konva';
import { useLogContext } from "../../../context/useLogContext";
import Konva from 'konva';

const getColorFromStatus = (status) => {
  switch (status) {
    case 'Fallo':
      return '#FF0000';
    case 'Acierto':
      return '#63BB66';
    case 'EXITO':
      return '#9CCC66';
    case 'NEWELEMENT':
      return '#85C2FF';
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
//<Stage width={960} height={500}>
  return (
    <Stage width={960} height={500}>
      <Layer
        x={4}
        y={4}
      >
        <Group draggable>
          {caracteresPatron.map((pcaracter, index) => (
            <React.Fragment key={index}>
              {paso.posEnPatron==index && (
                  <>
                  <Rect
                    x={(index * distancia)+ (paso.posEnCMadre*distancia)}
                    y={paso.alturaY*distancia}
                    width={tamanoTexto + 7}
                    height={tamanoTexto + 7}
                    stroke='black'
                    fill={getColorFromStatus(paso.status)} // Aquí se establece el color de fondo
                    strokeWidth={4} />
                     
                  <Text
                  x={(index * distancia + 6) + (paso.posEnCMadre*distancia)}
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
              x={(index * distancia) +5}
              y={6}
              text={mcaracter}
              fontSize={tamanoTexto}
              draggable
            />
            <Rect
              x={(index * distancia)}
              y={0}
              width={tamanoTexto+6}
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
        if(pasos[currentLogIndex].status=="FIN"){
          //setDrawStatus(pasos[currentLogIndex], establecerDibujoFinal(pasos[currentLogIndex]))
        }else{
          setDrawStatus(pasos[currentLogIndex], establecerDibujoInicial(pasos[currentLogIndex]))
        }
        console.log("PintaEspecial");
        setStage(pasos[currentLogIndex].drawStatus);
        return;
      }else if(pasos[currentLogIndex-1]){
        if(pasos[currentLogIndex-1]?.drawStatus){
          if((pasos[currentLogIndex-1].status == "Fallo")&&(pasos[currentLogIndex-1].status == "EXITO")) {
            pasos[currentLogIndex].alturaY = (pasos[currentLogIndex-1]?.alturaY +1) || 1;
          }else{
            pasos[currentLogIndex].alturaY = pasos[currentLogIndex-1]?.alturaY || 1;
          }
          console.log("PintaPrevio");
          //setDrawStatus(pasos[currentLogIndex], establecerDibujo(pasos[currentLogIndex]));
          setStage(pasos[currentLogIndex-1].drawStatus);

          //Ahora Pinta el nuevo dibujo sobre el anterior
          /*if(!pasos[currentLogIndex]?.drawStatus){
            console.log("PintaActual");
            //Recibe el dibujo anterior y añade el paso nuevo
            var stagevariable = new Konva.Stage();
            stagevariable = pasos[currentLogIndex-1]?.drawStatus;
            //stagevariable.add(establecerDibujo(pasos[currentLogIndex]));
    
            setDrawStatus(pasos[currentLogIndex], stagevariable);
          }*/

        }else{
          setStage(dibujoVacio());
        }
      }

      if(!pasos[currentLogIndex]?.drawStatus){
            console.log("PintaActual");
            //Recibe el dibujo anterior y añade el paso nuevo
            var stagevariable =pasos[currentLogIndex-1]?.drawStatus;
            //stagevariable.add(establecerDibujo(pasos[currentLogIndex]));
    
            stagevariable = establecerDibujo(pasos[currentLogIndex-1]);

            //Aquí me gustaría añadir a stageVariable el dibujo de establecerDibujo
            
            //setDrawStatus(pasos[currentLogIndex], stagevariable);
            setDrawStatus(pasos[currentLogIndex], establecerDibujo(pasos[currentLogIndex]));
          }
      
      //Pisa el dibujo anterior con el Nuevo? o cojo el anterior y creo el dibujo
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