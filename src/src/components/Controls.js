import React, { useState } from 'react';
import Switch from './Switch';
import {GeneralContext} from "../context/testContext";

const Controls = (props) => {
    const [isDryRunMode, setIsDryRunMode] = React.useState(false);
  return (
    <div style={{ flexDirection: 'row' }}>
        <GeneralContext.Provider value={{isDryRunMode, setIsDryRunMode}}>
            <Switch onLabel="Normal" offLabel="Dry Run" vertical={true} />
        </GeneralContext.Provider>
      <Switch onLabel="PWM" offLabel="Rel. (%)" vertical={false} />
    </div>
  );
};

export default Controls;
