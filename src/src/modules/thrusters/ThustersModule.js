import React, { useState } from 'react';
import Controls from './Controls';

const ThrustersModule = (props) => {
  let [isDryRun, setIsDryRun] = useState(true);
  let [isRelativeUnits, setIsRelativeUnits] = useState(true);

  return (
    <div>
      <Controls />
    </div>
  );
};

export default ThrustersModule;
