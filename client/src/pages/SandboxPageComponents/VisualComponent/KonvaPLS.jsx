import React, { useContext, useEffect, useState, useRef } from 'react';
import { Stage, Layer,  Text, Rect,Group, Image} from "react-konva";
import { useLogContext } from "../../../context/useLogContext";
import { dibujoVacio ,errorKonva, establecerDibujo , establecerDibujoInicial,establecerDibujoFinal } from "./KonvaHandler";
import KonvaController from './KonvaComponents/konvaController';

const KonvaComponent = () => {
    const { pasos, currentLogIndex ,execSpeed,lastLogIndex} = useLogContext();
    const [elements, setElements] = useState([]);
    const timeoutRef = useRef(null);
    const [lastExecutes, setLastExecutes] = useState([]); // Ahora es un array
    const [textSize, setTextSize] = useState(45); // Tamaño inicial del texto
    const [stageWidth, setStageWidth] = useState(1150); // Ancho inicial del Stage
    const [stageHeigth, setStageHeigth] = useState(465); // Altura inicial del Stage


    useEffect(() => {
        var resizedElements;
        // Aquí va el código para actualizar el dibujo
        switch (pasos[currentLogIndex]?.status){
            case "FIN":
                resizedElements = pasos.map(paso => {
                    if (paso.id > pasos[currentLogIndex].lastExecId && paso.id == currentLogIndex){
                        return establecerDibujoFinal(paso,textSize);
                    }else if(paso.id > pasos[currentLogIndex].lastExecId && paso.id <= currentLogIndex-1) {
                        return establecerDibujo(paso,textSize);
                    } else if (paso.id === pasos[currentLogIndex].lastExecId) { // Si el paso actual es EXECUTE
                        return establecerDibujoInicial(paso,textSize);
                    } else {
                        return null;
                    }
                });
                break;
                case "EXECUTE":
                    resizedElements = pasos.map(paso => {
                        if (paso.id === pasos[currentLogIndex].lastExecId) { 
                            return establecerDibujoInicial(paso,textSize);
                        } else {
                            return null;
                        }
                    });
                    break;
            default:
                resizedElements = pasos.map(paso => {
                    if (paso.id > pasos[currentLogIndex].lastExecId && paso.id <= currentLogIndex) {
                        return establecerDibujo(paso,textSize);
                    } else if (paso.id === pasos[currentLogIndex].lastExecId) { 
                        return establecerDibujoInicial(paso,textSize);
                    } else {
                        return null;
                    }
                });
                break;
        }
        setElements(resizedElements);
    }, [textSize]);

    useEffect(() => {
        var newElements;

        if(pasos[currentLogIndex]){
            //console.log("ID: "+ pasos[currentLogIndex].id);
            if(timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }

            pasos[currentLogIndex].id = pasos[currentLogIndex].id || currentLogIndex;

          if((pasos[currentLogIndex].status=="EXECUTE")||(pasos[currentLogIndex].status=="RESET")){
                //Control de dibujos especiales (Inicial, final, reset...)
                
                if(pasos[currentLogIndex].status=="EXECUTE"){
                    switch(pasos[currentLogIndex].patronDeBusqueda){//Debo gestionar la primera ejecucion de cada tipo (para crear las tablas)
                        case"Boyer-Moore":
                        /*let grupo1 = establecerDibujoInicialTabla(pasos[currentLogIndex], 1);
                        let grupo2 = establecerDibujoInicialTabla(pasos[currentLogIndex], 2);
                        let newDraw = [...grupo1, ...grupo2];
                        setTableDrawStatus(pasos[currentLogIndex], newDraw);
                        setTableElements(newDraw);*/
                            break;
                        case "KMP":
                            /*
                            let newDraw = establecerDibujoInicialTabla(pasos[currentLogIndex], 1);
                            setTableDrawStatus(pasos[currentLogIndex], newDraw);
                            setTableElements(newDraw);*/
                            break;
                        default:
                            break;
                    }
                  setLastExecutes([...lastExecutes, pasos[currentLogIndex]]); // Añadir al array
                  setElements(establecerDibujoInicial(pasos[currentLogIndex],textSize));
                }else if(pasos[currentLogIndex].status=="RESET"){
                    setElements(dibujoVacio());
                }
                return;
            }else{
                if(pasos[currentLogIndex-1]){ 

                    
                    if((pasos[currentLogIndex-1].status == "Fallo")||(pasos[currentLogIndex-1].status == "EXITO")) {
                        pasos[currentLogIndex].alturaY = (pasos[currentLogIndex-1].alturaY + 1) || 1;
                    }else{
                        pasos[currentLogIndex].alturaY = pasos[currentLogIndex-1].alturaY || 1;
                    }

                    if(lastExecutes.length > 0) { // Si existe un paso EXECUTE

                        pasos[currentLogIndex].lastExecId = pasos[currentLogIndex].lastExecId !== undefined ? pasos[currentLogIndex].lastExecId : lastExecutes[lastExecutes.length - 1].id;
                        
                        const oldElements = pasos.map(paso => {
                            if(paso.id > pasos[currentLogIndex].lastExecId && paso.id <= (currentLogIndex-1)) {
                                return establecerDibujo(paso,textSize);
                            } else if (paso.id === lastExecutes[lastExecutes.length - 1].id) { // Si el paso actual es EXECUTE
                                return establecerDibujoInicial(paso,textSize);
                            } else {
                                return null;
                            }
                        });

                        if(pasos[currentLogIndex].status=="FIN"){
                            newElements = pasos.map(paso => {
                                if (paso.id > pasos[currentLogIndex].lastExecId && paso.id == currentLogIndex){
                                    return establecerDibujoFinal(paso,textSize);
                                }else if(paso.id > pasos[currentLogIndex].lastExecId && paso.id <= currentLogIndex-1) {
                                    return establecerDibujo(paso,textSize);
                                } else if (paso.id === pasos[currentLogIndex].lastExecId) { // Si el paso actual es EXECUTE
                                    return establecerDibujoInicial(paso,textSize);
                                } else {
                                    return null;
                                }
                            });
                        }else{
                            newElements = pasos.map(paso => {
                                if (paso.id > pasos[currentLogIndex].lastExecId && paso.id <= currentLogIndex) {
                                    return establecerDibujo(paso,textSize);
                                } else if (paso.id === pasos[currentLogIndex].lastExecId) { // Si el paso actual es EXECUTE
                                    return establecerDibujoInicial(paso,textSize);
                                } else {
                                    return null;
                                }
                            });
                        }
                        
                        setElements(oldElements);
                    }else{
                        console.log("Error de Execute");   
                    }
                
                }else{
                    setElements(errorKonva())
                }

            }

            const tiempoRetraso = 2000/execSpeed; // Define tu tiempo de retraso aquí (en milisegundos)
            timeoutRef.current = setTimeout(() => {
                setElements(newElements);
            },tiempoRetraso);
        }else{

        }
        return () => {
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }}
    }, [pasos,currentLogIndex]);

    return (
        <div>
            <Stage width={stageWidth} height={stageHeigth}>
                <Layer x={5} y={5} draggable>
                     {elements}
                </Layer>
                <KonvaController 
                    stageWidth={stageWidth} 
                    stageHeigth={stageHeigth} 
                    setTextSize={setTextSize} 
                />
            </Stage>
        </div>
    );
};

export default KonvaComponent;
