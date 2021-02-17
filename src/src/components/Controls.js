import React, { useState } from 'react';
import Switch from './Switch';
import {GeneralContext} from "../context/generalContext";

const Controls = (props) => {
    return (
        <GeneralContext.Consumer>
            {context => context &&(
                <div style={{ flexDirection: 'row' }}>
                    <Switch onLabel="Normal"
                            offLabel="Dry Run"
                            vertical={true}
                            value={context.isDryRunMode}
                            handler={()=>context.setIsDryRunMode(!context.isDryRunMode)}/>

                    <Switch onLabel="PWM"
                            offLabel="Rel. (%)"
                            vertical={false}
                            value={context.isRelativeUnits}
                            handler={() => context.setIsRelativeUnits(!context.isRelativeUnits)}/>
                </div>
            )}
        </GeneralContext.Consumer>
  );
};

export default Controls;
