import React from 'react';
import GridLayout from 'react-grid-layout';
import ThrustersModule from './components/ThrustersModule';
import { GeneralContext } from './context/generalContext';
import './App.css';

export const App = () => {
  const [isDryRunMode, setIsDryRunMode] = React.useState(false);
  const [isRelativeUnits, setIsRelativeUnits] = React.useState(false);

  return (
    <div className="App">
      <GeneralContext.Provider
        value={{
          isDryRunMode,
          setIsDryRunMode,
          isRelativeUnits,
          setIsRelativeUnits,
        }}
      >
        {/* <GridLayout
          className="layout"
          cols={12}
          rowHeight={100}
          width={1200}
          verticalCompact={false}
          draggableCancel={'.MuiSlider-valueLabel, .MuiSlider-thumb'}
        > */}
        <ThrustersModule />
        {/* </GridLayout> */}
      </GeneralContext.Provider>
    </div>
  );
};

export default App;
