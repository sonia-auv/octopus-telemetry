import React, { useState } from 'react';
import Switch from './Switch';

const Controls = (props) => {
  return (
    <div style={{ flexDirection: 'row' }}>
      <Switch onLabel="Normal" offLabel="Dry Run" vertical={true} />
      <Switch onLabel="PWM" offLabel="Rel. (%)" vertical={false} />
    </div>
  );
};

export default Controls;
