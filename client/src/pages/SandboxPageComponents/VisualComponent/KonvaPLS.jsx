import React, { useContext, useEffect, useState, useRef } from 'react';
import { Stage, Layer,  Text, Rect,Group} from "react-konva";
import { useLogContext } from "../../../context/useLogContext";
import { dibujoVacio , establecerDibujo , establecerDibujoInicial } from "./KonvaHandler";


const KonvaComponent = () => {
    const { pasos, setDrawStatus, currentLogIndex } = useLogContext();
    const [elements, setElements] = useState([]);
    const timeoutRef = useRef(null);
    const [lastExecute, setLastExecute] = useState(null); // Nueva variable de estado

    useEffect(() => {
        if(pasos[currentLogIndex]){
            if(timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }

            pasos[currentLogIndex].id=currentLogIndex; //Cambiar y usar el setState o setAlgo con el contexto?¿

            if(pasos[currentLogIndex]?.drawStatus){
                if(pasos[currentLogIndex-1]){
                    if(pasos[currentLogIndex-1]?.drawStatus){
                        setElements([pasos[currentLogIndex-1].drawStatus]);
                    }
                }
            }else if((pasos[currentLogIndex].status=="EXECUTE")||(pasos[currentLogIndex].status=="FIN")){
                //setElements([]);
                if(pasos[currentLogIndex].status=="FIN"){
                    return;
                  //setDrawStatus(pasos[currentLogIndex], establecerDibujoFinal(pasos[currentLogIndex]))
                }else if(pasos[currentLogIndex].status=="EXECUTE"){
                  setDrawStatus(pasos[currentLogIndex], establecerDibujoInicial(pasos[currentLogIndex]))
                  setLastExecute(pasos[currentLogIndex]); // Guardar el último paso EXECUT
                }else{return;}
                setElements([pasos[currentLogIndex].drawStatus]);
                return;
            }else{
                if(pasos[currentLogIndex-1]){ 
                    if(pasos[currentLogIndex-1]?.drawStatus){
                        if((pasos[currentLogIndex-1].status == "Fallo")||(pasos[currentLogIndex-1].status == "EXITO")) {
                            pasos[currentLogIndex].alturaY = (pasos[currentLogIndex-1].alturaY + 1) || 1;
                        }else{
                            pasos[currentLogIndex].alturaY = pasos[currentLogIndex-1].alturaY || 1;
                        }

                        //const newElements = pasos.map(paso => paso.id === currentLogIndex ? establecerDibujo(paso) : paso.drawStatus);
                        //const newElements = pasos.map(paso => establecerDibujo(paso));
                        if(lastExecute) { // Si existe un paso EXECUTE
                            const newElements = pasos.map(paso => {
                                if (paso.id > lastExecute.id && paso.id <= currentLogIndex) {
                                    return establecerDibujo(paso);
                                } else if (paso.id === lastExecute.id) { // Si el paso actual es EXECUTE
                                    return establecerDibujoInicial(paso);
                                } else {
                                    return null;
                                }
                            });
                            console.log("New elements: - "+ newElements);
                            setDrawStatus(pasos[currentLogIndex],newElements);
                            setElements(pasos[currentLogIndex-1].drawStatus);
                        }else{
                         console.log("Error de Execute");   
                        }
                    }else{
                        setElements(dibujoVacio())
                    }
                }else{
                    setElements(dibujoVacio())
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
