// ControllerComponent.jsx
import {Card, CardHeader, CardBody, CardFooter,Divider} from "@nextui-org/react";
import KonvaComponent from "./KonvaComponent"
import KonvaHandler from "./KonvaHandler"
import KonvaPLS from "./KonvaPLS"

const VisualContainerComponent = () => {
    //Es el componente que contiene el recuadro de la extensión KonvaJs 
    return (
        <div id="SandboxView">
            <div className="flex justify-center items-center">        
                <Card className="px-1 py-1 max-w-[1200px] min-w-[1200px] max-h-[500px] min-h-[500px] ">
                    <CardBody className='flex justify-center items-center'>
                    {/*<KonvaComponent/><KonvaHandler/>*/}
                    <KonvaPLS />
                    </CardBody>

                    {/*<Divider/><CardFooter></CardFooter>*/}
                    
                </Card>
            </div>
            
        </div>
  );
};

export default VisualContainerComponent;

