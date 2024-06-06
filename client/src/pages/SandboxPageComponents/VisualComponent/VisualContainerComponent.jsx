// ControllerComponent.jsx
import {Card, CardHeader, CardBody, CardFooter,Divider} from "@nextui-org/react";
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
                <Card className="px-1 py-1 max-w-[1200px] min-w-[1200px] max-h-[500px] min-h-[500px] ">
                    <CardBody className='flex justify-center items-center'>
                    {
                        //<KonvaComponent/><KonvaHandler/>}
                        }
                        <KonvaPLS />
                    </CardBody>
                    {
                        //<Divider/>
                    //<CardFooter></CardFooter>
                        }
                    
                </Card>
            </div>
            
        </div>
  );
};

export default VisualContainerComponent;

