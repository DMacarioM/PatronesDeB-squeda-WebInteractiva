import React, { useContext, useEffect, useState, useRef } from 'react';
import { Stage, Layer,  Text, Rect,Group} from "react-konva";
import { useLogContext } from "../../../context/useLogContext";
import { dibujoVacio ,errorKonva, establecerDibujo , establecerDibujoInicial } from "./KonvaHandler";


const KonvaComponent = () => {
    const { pasos, setDrawStatus, currentLogIndex } = useLogContext();
    const [elements, setElements] = useState([]);
    const timeoutRef = useRef(null);
    const [lastExecutes, setLastExecutes] = useState([]); // Ahora es un array

    useEffect(() => {
        //console.log("useEffectActual: "+ currentLogIndex);
        //console.log("Soy : "+ pasos[currentLogIndex]?.message);
        if(pasos[currentLogIndex]){
            //pasos[currentLogIndex].id=currentLogIndex; //Cambiar y usar el setState o setAlgo con el contexto?¿
            console.log("ID: "+ pasos[currentLogIndex].id);
            if(timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }

            if(pasos[currentLogIndex]?.drawStatus){
                if(pasos[currentLogIndex-1]){
                    if(pasos[currentLogIndex-1]?.drawStatus){
                        setElements([pasos[currentLogIndex-1].drawStatus]);
                    }
                }
            }else if((pasos[currentLogIndex].status=="EXECUTE")||(pasos[currentLogIndex].status=="FIN")||(pasos[currentLogIndex].status=="RESET")){
                pasos[currentLogIndex].id=currentLogIndex; //Cambiar y usar el setState o setAlgo con el contexto?¿
                console.log("Id- EXEC"+pasos[currentLogIndex].id)
                if(pasos[currentLogIndex].status=="FIN"){
                    return;
                    //TODO: En el dibujo final, recoger los objetos anteriores (hasta el execute incluido),
                    //y (en caso de que el patrón.length>1) buscar paso EXITO, y si el paso anterior es acierto, cambiarlo a Exito/Crear un elemento encima (cabiar el color a Éxito) 
                    //En caso de que no sea viable, cuando un paso sea exito, volver a hacer los aciertos anteriores con exito(Para que así el elemento paso sea exito también).
                     //setDrawStatus(pasos[currentLogIndex], establecerDibujoFinal(pasos[currentLogIndex]))
                }else if(pasos[currentLogIndex].status=="EXECUTE"){
                  setDrawStatus(pasos[currentLogIndex], establecerDibujoInicial(pasos[currentLogIndex]))
                  setLastExecutes([...lastExecutes, pasos[currentLogIndex]]); // Añadir al array
                }else if(pasos[currentLogIndex].status=="RESET"){
                    setDrawStatus(pasos[currentLogIndex], dibujoVacio())
                }
                else{return;}
                setElements([pasos[currentLogIndex].drawStatus]);
                return;
            }else{
                pasos[currentLogIndex].id=currentLogIndex; //Cambiar y usar el setState o setAlgo con el contexto?¿
                console.log("Id- NORMAL"+pasos[currentLogIndex].id)
                if(pasos[currentLogIndex-1]){ 
                    if(pasos[currentLogIndex-1]?.drawStatus){
                        if((pasos[currentLogIndex-1].status == "Fallo")||(pasos[currentLogIndex-1].status == "EXITO")) {
                            pasos[currentLogIndex].alturaY = (pasos[currentLogIndex-1].alturaY + 1) || 1;
                        }else{
                            pasos[currentLogIndex].alturaY = pasos[currentLogIndex-1].alturaY || 1;
                        }

                        if(lastExecutes.length > 0) { // Si existe un paso EXECUTE

                            const newElements = pasos.map(paso => {
                                if (paso.id > lastExecutes[lastExecutes.length - 1].id && paso.id <= currentLogIndex) {
                                    //console.log("Pasos entre lasExec");
                                    //console.log(paso);
                                    return establecerDibujo(paso);
                                } else if (paso.id === lastExecutes[lastExecutes.length - 1].id) { // Si el paso actual es EXECUTE
                                    //console.log("Last exec: "+paso.id);
                                    //console.log(paso);
                                    return establecerDibujoInicial(paso);
                                } else {
                                    return null;
                                }
                            });
                            console.log("New elements: - ");
                            console.log(newElements);

                            setDrawStatus(pasos[currentLogIndex],newElements);
                            setElements(pasos[currentLogIndex-1].drawStatus);
                        }else{
                         console.log("Error de Execute");   
                        }
                    }else{
                        setElements(errorKonva())
                    }
                }else{
                    setElements(errorKonva())
                }

            }

            const tiempoRetraso = 2000; // Define tu tiempo de retraso aquí (en milisegundos)
            timeoutRef.current = setTimeout(() => {
                if(pasos[currentLogIndex]?.drawStatus){
                    setElements([pasos[currentLogIndex].drawStatus]);
                }
            },tiempoRetraso);
        }
        return () => {
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }}
    }, [pasos,currentLogIndex]);

    return (
        <div>
            <Stage width={950} height={500}>
                <Layer x={4} y={4} draggable>
                     {elements}
                </Layer>
            </Stage>
        </div>
    );
};

export default KonvaComponent;
