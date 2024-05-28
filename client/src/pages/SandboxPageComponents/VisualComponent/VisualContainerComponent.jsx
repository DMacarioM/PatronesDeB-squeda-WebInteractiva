// ControllerComponent.jsx
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import KonvaComponent from "./KonvaComponent"
import KonvaHandler from "./KonvaHandler"
import KonvaPLS from "./KonvaPLS"

const VisualContainerComponent = () => {
    //Es el componente que contiene el recuadro de la extensión KonvaJs 
    //TODO: (Se le pueden pasar parámetros? seguro) (Se puede resetear si se ralla?) 
    //TODO: Recibe la lista de Logs (Puede recibir la lista y manejarla totalmente por dentro (Boton play, animaciones, pasos, etc..)/Se le indica un Log especíifico de la Lista y lo muestra)

    return (
        <div id="SandboxView">
            <div className="flex justify-center items-center">        
                <Card className="px-1 py-1 max-w-[1000px] min-w-[1000px] max-h-[600px] ">
                    <CardBody className='flex justify-center items-center'>
                    {
                        //<KonvaComponent/><KonvaHandler/>}
                        }
                        <KonvaPLS />
                    </CardBody>
                </Card>
            </div>
            
        </div>
  );
};

export default VisualContainerComponent;

