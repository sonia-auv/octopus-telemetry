import React, { useState } from 'react';
import Switch from './Switch';
import {useGeneral} from "../context/generalContext";

const Controls = (props) => {
    const {isDryRunMode, setIsDryRunMode, isRelativeUnits, setIsRelativeUnits} = useGeneral()
    return (
    <div style={{ flexDirection: 'row' }}>
      <Switch onLabel="Normal" offLabel="Dry Run" vertical={true} value={isDryRunMode} handler={setIsDryRunMode}/>
      <Switch onLabel="PWM" offLabel="Rel. (%)" vertical={false} value={isRelativeUnits} handler={setIsRelativeUnits}/>
    </div>
  );
};

export default Controls;
