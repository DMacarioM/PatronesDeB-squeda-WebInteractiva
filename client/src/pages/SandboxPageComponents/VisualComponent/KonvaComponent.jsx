import React, { useContext, useEffect, useState, useRef } from 'react';
import { Stage, Layer,  Text, Rect,Group, Image,Transformer,Circle} from "react-konva";
import { useLogContext } from "../../../context/useLogContext";
import { 
    dibujoVacio, 
    errorKonva, 
    establecerDibujo, 
    establecerDibujoInicial,
    establecerDibujoFinal, 
    establecerDibujoInicialTablaKMP, 
    establecerDibujoTablaKMP,
    establecerDibujoInicialPrimeraTablaBM,
    establecerDibujoInicialSegundaTablaBM,
    establecerDibujoPrimeraTablaBM,
    establecerDibujoSegundaTablaBM 
} from "./KonvaHandler";import KonvaController from './KonvaComponents/konvaController';

const KonvaComponent = () => {
    /**Para la gestion de pasos */
    const { pasos, currentLogIndex ,execSpeed,lastLogIndex} = useLogContext();
    const [lastExecutes, setLastExecutes] = useState([]);

    /**Elementos para pintar en la tabla */
    const [elements, setElements] = useState([]);
    const [cMadreElements, setCMadreElements] = useState([]);
    const [firstTableElements, setFirstTableElements] = useState([]);
    const [secondTableElements, setSecondTableElements] = useState([]);

    const timeoutRef = useRef(null);
    
    /**Para el dibujo del texto */
    const [textSize, setTextSize] = useState(5); // Tamaño inicial del texto
    const [rTextSize, setRTextSize] = useState((window.innerWidth*0.5) * 0.05);
    const [stageWidth, setStageWidth] = useState(window.innerWidth * 0.7); // Initial stage width
    const [stageHeight, setStageHeight] = useState(window.innerHeight * 0.6);

    /**Para el dibujo de la tabla */
    const shapeRefFT = useRef();
    const shapeRefST = useRef();
    const trRefFT = useRef();
    const trRefST = useRef();
    const anchorRefFT = useRef();
    const anchorRefST = useRef();
    const [clipAreaFT, setClipAreaFT] = useState({ x: 0, y: 0, width: 200, height: 200 });
    const [clipAreaST, setClipAreaST] = useState({ x: 0, y: 0, width: 200, height: 200 });

    const [firstTableVisible, setFirstTableVisible] = useState(false);
    const [secondTableVisible, setSecondTableVisible] = useState(false);

    
    const [tableTitle, setTableTitle] = useState("");
        

    useEffect(() => {
        const handleResize = () => {
            setStageWidth(window.innerWidth * 0.7);
            setStageHeight(window.innerHeight * 0.6);
            
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if(firstTableVisible){
        trRefFT.current.nodes([shapeRefFT.current]);
        trRefFT.current.getLayer().batchDraw();
        }

        if(secondTableVisible){
            trRefST.current.nodes([shapeRefST.current]);
            trRefST.current.getLayer().batchDraw();
            }
    }, []);

    useEffect(() => {
        if(firstTableVisible){
        const anchor = anchorRefFT.current;
        const shape = shapeRefFT.current;
        anchor.x(shape.x());
        anchor.y(shape.y() + shape.height());
        setClipAreaFT({ x: shape.x(), y: shape.y(), width: shape.width(), height: shape.height() });}

    }, [shapeRefFT.current?.width(), shapeRefFT.current?.height()]);

    useEffect(() => {
        if(secondTableVisible){
        const anchor = anchorRefST.current;
        const shape = shapeRefST.current;
        anchor.x(shape.x());
        anchor.y(shape.y() + shape.height());
        setClipAreaST({ x: shape.x(), y: shape.y(), width: shape.width(), height: shape.height() });
        }
    }, [shapeRefST.current?.width(), shapeRefST.current?.height()]);

    /**Para El tamaño del dibujo  */
    useEffect(() => {
        setRTextSize(textSize+window.innerWidth * 0.02);
        var resizedElements;
        var resizedCMadreElements;
        
        
            // Aquí va el código para actualizar el dibujo
            switch (pasos[currentLogIndex]?.status){
                case "FIN":
                    resizedElements = pasos.map(paso => {
                            if(paso.status!="TABLA"){
                                if (paso.id > pasos[currentLogIndex].lastExecId && paso.id == currentLogIndex){
                                    return establecerDibujoFinal(paso,rTextSize);
                                }else if(paso.id > pasos[currentLogIndex].lastExecId && paso.id <= currentLogIndex-1) {
                                    return establecerDibujo(paso,rTextSize);
                                } else {
                                    return null;
                                }
                        }});
                    
                    break;
                    case "EXECUTE":
                        /**No tiene que repintar el dibujo, sólo la cadena madre */
                        break;
                default:
                    resizedElements = pasos.map(paso => {
                        if(paso.status!="TABLA"){
                            if (paso.id > pasos[currentLogIndex].lastExecId && paso.id <= currentLogIndex) {
                                return establecerDibujo(paso,rTextSize);
                            } else {
                                return null;
                            }}
                    });
                    break;
            }

            resizedCMadreElements = pasos.map(paso => {
                if (paso.status != "TABLA") {
                    if (paso.id === pasos[currentLogIndex].lastExecId) {
                        return establecerDibujoInicial(paso, rTextSize);
                    } else {
                        return null;
                    }
                }
            });

            setCMadreElements(resizedCMadreElements);

            if(firstTableVisible){
                var resizedTableElements;
                if(pasos[currentLogIndex].patronDeBusqueda=="KMP"){
                    resizedTableElements = pasos.map(paso => {
                            if(paso.id > pasos[currentLogIndex].lastExecId && paso.id <= currentLogIndex && (paso.status=="TABLA")) {
                                return establecerDibujoTablaKMP(paso,rTextSize);
                            } else if (paso.id === pasos[currentLogIndex].lastExecId) { // Si el paso actual es EXECUTE
                                return establecerDibujoInicialTablaKMP(paso,rTextSize);
                            } else {
                                return null;
                            }
                    
                    });
                    setFirstTableElements(resizedTableElements);
                    }else if(pasos[currentLogIndex].patronDeBusqueda=="Boyer-Moore"){
                        var resizedSecondTableElements
                        resizedTableElements = pasos.map(paso => {
                            if(paso.id > pasos[currentLogIndex].lastExecId && paso.id <= currentLogIndex && (paso.status=="TABLA") && (paso.tableNumber==1)) {
                                return establecerDibujoPrimeraTablaBM(paso,rTextSize);
                            } else if (paso.id === pasos[currentLogIndex].lastExecId) { // Si el paso actual es EXECUTE
                                return establecerDibujoInicialPrimeraTablaBM(paso,rTextSize);
                            } else {
                                return null;
                            } });
                        resizedSecondTableElements = pasos.map(paso => {
                            if(paso.id > pasos[currentLogIndex].lastExecId && paso.id <= currentLogIndex && (paso.status=="TABLA") && (paso.tableNumber==2)) {
                                return establecerDibujoSegundaTablaBM(paso,rTextSize);
                            } else if (paso.id === pasos[currentLogIndex].lastExecId) { // Si el paso actual es EXECUTE
                                return establecerDibujoInicialSegundaTablaBM(paso,rTextSize);
                            } else {
                                return null;
                            }
                        });
                    setFirstTableElements(resizedTableElements);
                    setSecondTableElements(resizedSecondTableElements);
                    }
                }
            
            setElements(resizedElements);
        
    }, [textSize]);

    useEffect(() => {
        var newElements;
        var newTableElements
        var newCMadreElements;

        if(pasos[currentLogIndex]){
            if(timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }

            pasos[currentLogIndex].id = pasos[currentLogIndex].id || currentLogIndex;

          if((pasos[currentLogIndex].status=="EXECUTE")||(pasos[currentLogIndex].status=="RESET")){
                //Control de dibujos especiales (Inicial, final, reset...)
                
                if(pasos[currentLogIndex].status=="EXECUTE"){
                    setFirstTableElements(dibujoVacio());
                    setSecondTableElements(dibujoVacio());
                    setFirstTableVisible(false);
                    setSecondTableVisible(false);
                    setElements(dibujoVacio());
                    switch(pasos[currentLogIndex].patronDeBusqueda){//Debo gestionar la primera ejecucion de cada tipo (para crear las tablas)
                        case"Boyer-Moore":
                            setFirstTableVisible(true);
                            setTableTitle("Tabla D1");
                            setSecondTableVisible(true);
                            setFirstTableElements(establecerDibujoInicialPrimeraTablaBM(pasos[currentLogIndex],rTextSize));
                            setSecondTableElements(establecerDibujoInicialSegundaTablaBM(pasos[currentLogIndex],rTextSize));
                            break;
                        case "KMP":
                            setFirstTableVisible(true);
                            setSecondTableVisible(false);
                            setTableTitle("Tabla Siguiente");
                            setFirstTableElements(establecerDibujoInicialTablaKMP(pasos[currentLogIndex],rTextSize));
                            break;
                        default:
                            setFirstTableVisible(false);
                            break;
                    }
                  setLastExecutes([...lastExecutes, pasos[currentLogIndex]]); // Añadir al array
                  setCMadreElements(establecerDibujoInicial(pasos[currentLogIndex], rTextSize));
                  //setElements(establecerDibujoInicial(pasos[currentLogIndex],rTextSize));
                }else if(pasos[currentLogIndex].status=="RESET"){
                    setCMadreElements(dibujoVacio());
                }
                return;
            }else{
                if(pasos[currentLogIndex-1]){

                    if(pasos[currentLogIndex].status=="TABLA"){
                        //Si el paso acutal es de creación de tabla, no se pinta en el dibujo, sino en la tabla

                        if(lastExecutes.length > 0) { // Si existe un paso EXECUTE

                            pasos[currentLogIndex].lastExecId = pasos[currentLogIndex].lastExecId !== undefined ? pasos[currentLogIndex].lastExecId : lastExecutes[lastExecutes.length - 1].id;
                             
                            switch(pasos[currentLogIndex].patronDeBusqueda){
                              case "Boyer-Moore":
                                if(pasos[currentLogIndex].tableNumber==1){
                                    const oldTableElements = pasos.map(paso => {if(paso.id > pasos[currentLogIndex].lastExecId && paso.id <= (currentLogIndex-1) && (paso.status=="TABLA") && (paso.tableNumber==1)) {return establecerDibujoPrimeraTablaBM(paso,rTextSize);} else if (paso.id === pasos[currentLogIndex].lastExecId) { return establecerDibujoInicialPrimeraTablaBM(paso,rTextSize);} else {return null;}});
                                    newTableElements = pasos.map(paso => {if (paso.id > pasos[currentLogIndex].lastExecId && paso.id <= currentLogIndex && paso.status=="TABLA"&& (paso.tableNumber==1)) {return establecerDibujoPrimeraTablaBM(paso,rTextSize);} else if (paso.id === pasos[currentLogIndex].lastExecId) { return establecerDibujoInicialPrimeraTablaBM(paso,rTextSize);} else { return null;}});
                                    setFirstTableElements(oldTableElements);
                                }else{
                                    const oldTableElements = pasos.map(paso => {if(paso.id > pasos[currentLogIndex].lastExecId && paso.id <= (currentLogIndex-1) && (paso.status=="TABLA") && (paso.tableNumber==2)) {return establecerDibujoSegundaTablaBM(paso,rTextSize);} else if (paso.id === pasos[currentLogIndex].lastExecId) { return establecerDibujoInicialSegundaTablaBM(paso,rTextSize);} else {return null;}});
                                    newTableElements = pasos.map(paso => {if (paso.id > pasos[currentLogIndex].lastExecId && paso.id <= currentLogIndex && paso.status=="TABLA"&& (paso.tableNumber==2)) {return establecerDibujoSegundaTablaBM(paso,rTextSize);} else if (paso.id === pasos[currentLogIndex].lastExecId) { return establecerDibujoInicialSegundaTablaBM(paso,rTextSize);} else { return null;}});
                                    setSecondTableElements(oldTableElements);
                                }
                                break;
                                case "KMP":
                                  const oldTableElements = pasos.map(paso => {if(paso.id > pasos[currentLogIndex].lastExecId && paso.id <= (currentLogIndex-1) && paso.status=="TABLA") {return establecerDibujoTablaKMP(paso,rTextSize);} else if (paso.id === lastExecutes[lastExecutes.length - 1].id) { return establecerDibujoInicialTablaKMP(paso,rTextSize);} else {return null;}});
                                  newTableElements = pasos.map(paso => {if (paso.id > pasos[currentLogIndex].lastExecId && paso.id <= currentLogIndex && paso.status=="TABLA") {return establecerDibujoTablaKMP(paso,rTextSize);} else if (paso.id === pasos[currentLogIndex].lastExecId) { return establecerDibujoInicialTablaKMP(paso,rTextSize);} else { return null;}});
                                  setFirstTableElements(oldTableElements);
                                break;
                                default:
                                  console.log("Fallo del sistema");
                                  break;
                            }
                            }else{console.log("Fallo del paso TABLA");}
                    }else{
                        
                        if((pasos[currentLogIndex-1].status == "FALLO")||(pasos[currentLogIndex-1].status == "EXITO")) {
                            pasos[currentLogIndex].alturaY = (pasos[currentLogIndex-1].alturaY + 1) || 1;
                            /*if((pasos[currentLogIndex].alturaY>5)&&(pasos[currentLogIndex].patronDeBusqueda!="KMP")){
                                pasos[currentLogIndex].alturaY = 1;
                            }*/
                        }else{
                            pasos[currentLogIndex].alturaY = pasos[currentLogIndex-1].alturaY || 1;
                        }

                        if(lastExecutes.length > 0) { // Si existe un paso EXECUTE

                            pasos[currentLogIndex].lastExecId = pasos[currentLogIndex].lastExecId !== undefined ? pasos[currentLogIndex].lastExecId : lastExecutes[lastExecutes.length - 1].id;
                            
                            const oldElements = pasos.map(paso => {
                                if(paso.status!="TABLA"){
                                    if(paso.id > pasos[currentLogIndex].lastExecId && paso.id <= (currentLogIndex-1)) {
                                        return establecerDibujo(paso,rTextSize);
                                    } /*else if (paso.id === lastExecutes[lastExecutes.length - 1].id) { // Si el paso actual es EXECUTE
                                        return establecerDibujoInicial(paso,rTextSize);
                                    } */else {
                                        return null;
                                    }
                                }
                            });

                            if(pasos[currentLogIndex].status=="FIN"){
                                newElements = pasos.map(paso => {
                                    if(paso.status!="TABLA"){
                                        if (paso.id > pasos[currentLogIndex].lastExecId && paso.id == currentLogIndex){
                                            return establecerDibujoFinal(paso,rTextSize);
                                        }else if(paso.id > pasos[currentLogIndex].lastExecId && paso.id <= currentLogIndex-1) {
                                            return establecerDibujo(paso,rTextSize);
                                        }/* else if (paso.id === pasos[currentLogIndex].lastExecId) { // Si el paso actual es EXECUTE
                                            return establecerDibujoInicial(paso,rTextSize);
                                        }*/ else {
                                            return null;
                                        }
                                    }
                                });
                            }else{
                                newElements = pasos.map(paso => {
                                    if(paso.status!="TABLA"){
                                        if (paso.id > pasos[currentLogIndex].lastExecId && paso.id <= currentLogIndex) {
                                            return establecerDibujo(paso,rTextSize);
                                        } /*else if (paso.id === pasos[currentLogIndex].lastExecId) { // Si el paso actual es EXECUTE
                                            return establecerDibujoInicial(paso,rTextSize);
                                        } */else {
                                            return null;
                                        }
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
                    switch(pasos[currentLogIndex].patronDeBusqueda){
                        case "KMP":
                            setFirstTableElements(newTableElements)
                            break;
                        case "Boyer-Moore":
                            //El que se haya cambiado
                            if(pasos[currentLogIndex].tableNumber==1){
                                setFirstTableElements(newTableElements)
                            }else{
                                setSecondTableElements(newTableElements)
                            }
                            break;
                    }
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


    const handleResize = (e) => {
        setStageWidth(e.target.value * 25);
        setStageHeight(e.target.value * 12);
    };


    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleDragMove = (e) => {
        const { x } = e.target.position();
        setPosition({ x });
    };

    return (
        <div onChange={handleResize}>
            <Stage  x={5} y={5} width={stageWidth} height={stageHeight}>
            <Layer draggable
                    onDragMove={handleDragMove}
                    x={position.x}>
                {elements}
            </Layer>
            <Layer>
                <Group
                        draggable
                        dragBoundFunc={(pos) => ({
                            x: pos.x,
                            y:7,
                        })}
                        onDragMove={handleDragMove}
                        x={position.x}
                    >
                        {cMadreElements}
                </Group>
            </Layer>
                {firstTableVisible && <Layer x={stageWidth-205} y={5}>
                    <Group key={"FirstTable"} draggable>
                        <Rect
                            ref={shapeRefFT}
                            x={0}
                            y={0}
                            width={200}
                            height={200}
                            fill='#E7EFE9'//Color del fondo
                            cornerRadius={2}
                            stroke='black'
                            strokeWidth={2}
                        />
                        <Transformer 
                        ref={trRefFT} 
                        anchorSize={0} 
                        borderEnabled={false} 
                        rotateEnabled={false}
                    />
                    <Circle
                        ref={anchorRefFT}
                        radius={10}
                        fill='black'
                        draggable
                        dragOnTop={false}
                        width={13}
                        height={13}
                        onDragMove={() => {
                            const anchor = anchorRefFT.current;
                            const shape = shapeRefFT.current;
                            const newWidth = shape.width() + (shape.x() - anchor.x());
                            if (newWidth < 0) {
                                // Si el nuevo ancho es negativo, restablecer la posición del círculo
                                anchor.x(shape.x() + shape.width());
                            } else {
                                shape.width(newWidth);
                                shape.x(anchor.x());
                            }
                            shape.height(anchor.y() - shape.y());
                            shape.x(anchor.x());
                            trRefFT.current.forceUpdate();
                            setClipAreaFT({ x: 0, y: 0, width: shape.width(), height: shape.height() });
                            
                        }}
                    />
                    
                        <Group key={"FTContainer"} clipFunc={(ctx) => {ctx.rect(clipAreaFT.x, clipAreaFT.y, clipAreaFT.width, clipAreaFT.height);}}>
                                <Group key={"FirstTableElements"} draggable>
                                    {firstTableElements}
                                </Group>
                                <Group key={"FTITLE"}>
                                    <Rect
                                    x={shapeRefFT.current ? shapeRefFT.current.x() + 5 : 0}
                                    y={0}
                                    width={100}
                                    height={15}
                                    fill='#53725D'//Color del fondo
                                    cornerRadius={2}
                                    stroke='black'
                                    strokeWidth={2}/>
                                    
                                    <Text
                                    fill='#E7EFE9'
                                    text={`${tableTitle}`} 
                                    x={shapeRefFT.current ? shapeRefFT.current.x() + 7 : 2}
                                    y={2}
                                    />
                                </Group>
                        </Group>
                    </Group>
                </Layer>}

                {secondTableVisible && <Layer x={stageWidth-205} y={210}>
                    
                    <Group key={"SecondTable"} draggable>
                        <Rect
                            ref={shapeRefST}
                            x={0}
                            y={0}
                            width={200}
                            height={200}
                            fill='#E7EFE9'//Color del fondo
                            cornerRadius={2}
                            stroke='black'
                            strokeWidth={2}
                        />
                        <Transformer 
                        ref={trRefST} 
                        anchorSize={0} 
                        borderEnabled={false} 
                        rotateEnabled={false}
                    />
                    <Circle
                        ref={anchorRefST}
                        radius={10}
                        fill='black'
                        draggable
                        dragOnTop={false}
                        width={13}
                        height={13}
                        onDragMove={() => {
                            const anchor = anchorRefST.current;
                            const shape = shapeRefST.current;
                            const newWidth = shape.width() + (shape.x() - anchor.x());
                            if (newWidth < 0) {
                                // Si el nuevo ancho es negativo, restablecer la posición del círculo
                                anchor.x(shape.x() + shape.width());
                            } else {
                                shape.width(newWidth);
                                shape.x(anchor.x());
                            }
                            shape.height(anchor.y() - shape.y());
                            shape.x(anchor.x());
                            trRefST.current.forceUpdate();
                            setClipAreaST({ x: 0, y: 0, width: shape.width(), height: shape.height() });
                        }}
                    />
                    
                        <Group key={"STContainer"} clipFunc={(ctx) => {ctx.rect(clipAreaST.x, clipAreaST.y, clipAreaST.width, clipAreaST.height);}}>
                            <Group key={"SecondTableElements"} draggable>
                                    {secondTableElements}
                                </Group>
                                <Group key={"STITLE"}>
                                    <Rect
                                    x={shapeRefST.current ? shapeRefST.current.x() + 5 : 0}
                                    y={0}
                                    width={100}
                                    height={15}
                                    cornerRadius={2}
                                    stroke='black'
                                    strokeWidth={2}
                                    fill='#53725D'/>
                                    
                                    <Text
                                    fill='#E7EFE9'
                                    text={`Tabla D2`} 
                                    x={shapeRefST.current ? shapeRefST.current.x() + 7 : 2}
                                    y={2}
                                    />
                                </Group>
                        </Group>
                        
                    </Group>
                </Layer>}
                <KonvaController 
                    stageWidth={stageWidth} 
                    stageHeight={stageHeight} 
                    setTextSize={setTextSize} 
                />
            </Stage>
        </div>
    );
};

export default KonvaComponent;
