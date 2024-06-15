import React, { useContext, useEffect, useState, useRef } from 'react';
import { Stage, Layer,  Text, Rect,Group, Image,Transformer,Circle} from "react-konva";
import { useLogContext } from "../../../context/useLogContext";
import { dibujoVacio ,errorKonva, establecerDibujo , establecerDibujoInicial,establecerDibujoFinal, establecerDibujoInicialTablaKMP } from "./KonvaHandler";
import KonvaController from './KonvaComponents/konvaController';

const KonvaComponent = () => {
    const { pasos, currentLogIndex ,execSpeed,lastLogIndex} = useLogContext();
    const [elements, setElements] = useState([]);
    const [firstTableElements, setFirstTableElements] = useState([]);
    const timeoutRef = useRef(null);
    const [lastExecutes, setLastExecutes] = useState([]); // Ahora es un array

    /**Para el dibujo del texto */
    const [textSize, setTextSize] = useState(45); // Tamaño inicial del texto
    const [stageWidth, setStageWidth] = useState(1150); // Ancho inicial del Stage
    const [stageHeigth, setStageHeigth] = useState(465); // Altura inicial del Stage

    /**Para el dibujo de la tabla */
    const shapeRef = useRef();
    const trRef = useRef();
    const anchorRef = useRef();
    const [tableTextSize, setTableTextSize] = useState(45); // Tamaño inicial del texto de la tabla
    const [clipArea, setClipArea] = useState({ x: 0, y: 0, width: 200, height: 200 });
    const [firstTableVisible, setFirstTableVisible] = useState(false); // Altura inicial del Stage



    useEffect(() => {
        if(firstTableVisible){
        trRef.current.nodes([shapeRef.current]);
        trRef.current.getLayer().batchDraw();}
    }, []);

    useEffect(() => {
        if(firstTableVisible){
        const anchor = anchorRef.current;
        const shape = shapeRef.current;
        anchor.x(shape.x());
        anchor.y(shape.y() + shape.height());
        setClipArea({ x: shape.x(), y: shape.y(), width: shape.width(), height: shape.height() });}

    }, [shapeRef.current?.width(), shapeRef.current?.height()]);

    /**Para El tamaño del dibujo  */
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
        var newTableElements

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
                            setFirstTableVisible(true);
                            setFirstTableElements(establecerDibujoInicialTablaKMP(pasos[currentLogIndex],tableTextSize));
                            break;
                        default:
                            setFirstTableVisible(false);
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

                    if(pasos[currentLogIndex].status=="TABLA"){
                        //Si el paso acutal es de creación de tabla, no se pinta en el dibujo, sino en la tabla

                        if(lastExecutes.length > 0) { // Si existe un paso EXECUTE

                            pasos[currentLogIndex].lastExecId = pasos[currentLogIndex].lastExecId !== undefined ? pasos[currentLogIndex].lastExecId : lastExecutes[lastExecutes.length - 1].id;
                             
                            const oldTableElements = pasos.map(paso => {
                                if(paso.status=="TABLA"){
                                    if(paso.id > pasos[currentLogIndex].lastExecId && paso.id <= (currentLogIndex-1)) {
                                        return establecerDibujo(paso,textSize);
                                    } else if (paso.id === lastExecutes[lastExecutes.length - 1].id) { // Si el paso actual es EXECUTE
                                        return establecerDibujoInicialTablaKMP(paso,textSize);
                                    } else {
                                        return null;
                                    }
                                }
                            });

                                newTableElements = pasos.map(paso => {
                                    if(paso.status!="TABLA"){
                                        if (paso.id > pasos[currentLogIndex].lastExecId && paso.id <= currentLogIndex) {
                                            return establecerDibujo(paso,textSize);
                                        } else if (paso.id === pasos[currentLogIndex].lastExecId) { // Si el paso actual es EXECUTE
                                            return establecerDibujoInicial(paso,textSize);
                                        } else {
                                            return null;
                                        }
                                    }
                                });
                            }
                            setFirstTableElements(oldTableElements);
                    }else{
                        
                        if((pasos[currentLogIndex-1].status == "FALLO")||(pasos[currentLogIndex-1].status == "EXITO")) {
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
                    }
                }else{
                    setElements(errorKonva())
                }

            }

            const tiempoRetraso = 2000/execSpeed; // Define tu tiempo de retraso aquí (en milisegundos)
            timeoutRef.current = setTimeout(() => {
                if(pasos[currentLogIndex].status=="TABLA"){
                    setFirstTableElements(newTableElements)
                }else{
                    setElements(newElements);
                }
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
                {firstTableVisible && <Layer x={stageWidth-203} y={3}>
                    
                    <Group key={"FirstTable"} draggable>
                        <Rect
                            ref={shapeRef}
                            x={0}
                            y={0}
                            width={200}
                            height={200}
                            fill='white'//Color del fondo
                            cornerRadius={2}
                            stroke='black'
                            strokeWidth={2}
                        />
                        <Transformer 
                        ref={trRef} 
                        anchorSize={0} 
                        borderEnabled={false} 
                        rotateEnabled={false}
                    />
                    <Circle
                        ref={anchorRef}
                        radius={10}
                        fill='black'
                        draggable
                        dragOnTop={false}
                        width={13}
                        height={13}
                        onDragMove={() => {
                            const anchor = anchorRef.current;
                            const shape = shapeRef.current;
                            shape.width(shape.width() + (shape.x() - anchor.x()));
                            shape.height(anchor.y() - shape.y());
                            shape.x(anchor.x());
                            trRef.current.forceUpdate();
                            setClipArea({ x: 0, y: 0, width: shape.width(), height: shape.height() });
                        }}
                    />
                    
                        <Group key={"FTContainer"} clipFunc={(ctx) => {ctx.rect(clipArea.x, clipArea.y, clipArea.width, clipArea.height);}}>
                            <Group key={"FirstTableElements"} draggable>
                                    {firstTableElements}
                                </Group>
                        </Group>
                        
                    </Group>
                </Layer>}
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
