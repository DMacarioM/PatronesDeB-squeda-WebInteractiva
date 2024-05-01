import React, { useContext } from 'react';
import {LogContext} from "../LogProvider";
import {Divider} from "@nextui-org/react";

const Log = () => {
  const { logs } = useContext(LogContext);
  return (
    <div>
      {logs.map((log, index) => (
        <React.Fragment key={index}>
          <Divider/>
          <div className="flex justify-between pr-1 py-1">
            <p className="max-w-[450px]">{index}. - {log}</p>
            <p className="font-bold">'Supuesto botón'</p>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Log;
