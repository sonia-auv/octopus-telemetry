import React, { useState, useCallback } from 'react';
import GridLayout from 'react-grid-layout';
import { Thruster } from './components/Thruster';
import ThrustersModule from './components/ThustersModule';
import ActuatorModule from './components/ActuatorModule';
import ImageViewer from './components/ImageViewer';
import Pfd from './components/Pfd';
import TestBoardModule from './components/TestBoardModule';
import Waypoints from './components/Waypoints';
import VisionUI from './components/VisionUi';
import { useROSTopicSubscriber } from './hooks/useROSTopicSubscriber';
import { GeneralContext, defaultModules } from './context/generalContext';
import {
  Module,
  ActiveModules,
} from './components/modulepicker/ModulesMetadata';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './components/Theme';
import { GlobalStyles } from './components/global';
import ToolbarModule from './components/ToolbarModule';
import ModulePicker from './components/modulepicker/ModulePicker';

export const App = () => {
  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem('isDarkMode') as string) ? 'dark' : 'light'
  );
  const [thruster1, setThruster1] = useState(0);
  const [thruster2, setThruster2] = useState(0);
  const [thruster3, setThruster3] = useState(0);
  const [thruster4, setThruster4] = useState(0);
  const [thruster5, setThruster5] = useState(0);
  const [thruster6, setThruster6] = useState(0);
  const [thruster7, setThruster7] = useState(0);
  const [thruster8, setThruster8] = useState(0);

  const originalLayout =
    JSON.parse(localStorage.getItem('layout') as string) || [];
  const [layout, setLayout] = useState(originalLayout);

    const moduleBorder = { border: '1px solid black', borderRadius: '10px', borderColor: 'gray', borderStyle: 'dashed' }

  const thrusterEffortCallback = useCallback((x: any) => {
    let id = x.ID;
    let effort = x.effort;
    switch (id) {
      case 1:
        setThruster1(effort);
        break;
      case 2:
        setThruster2(effort);
        break;
      case 3:
        setThruster3(effort);
        break;
      case 4:
        setThruster4(effort);
        break;
      case 5:
        setThruster5(effort);
        break;
      case 6:
        setThruster6(effort);
        break;
      case 7:
        setThruster7(effort);
        break;
      case 8:
        setThruster8(effort);
        break;
    }
  }, []);

  useROSTopicSubscriber<any>(
    thrusterEffortCallback,
    '/provider_thruster/effort',
    'sonia_common/ThrusterEffort'
  );

  const style = { height: 'calc(100% - 55px)' };
  const [isDarkMode, setIsDarkMode] = React.useState(theme === 'dark');
  const [isDryRunMode, setIsDryRunMode] = React.useState(false);
  const [isRelativeUnits, setIsRelativeUnits] = React.useState(false);
  const [isRoboticArmClosed, setIsRoboticArmClosed] = React.useState(false);
  const [isWayPointVelocityMode, setIsWayPointVelocityMode] = React.useState(
    false
  );
  const [activeModules, setActiveModules] = React.useState(defaultModules);

  const updateActiveModule = (module: Module, active: boolean) => {
    const updatedModule: Module = {
      ...module,
      active,
    };
    const updatedActiveModules: ActiveModules = {
      data: {
        ...activeModules.data,
        [module.meta.key]: updatedModule,
      },
    };

        <div className="margin-top" style={style} >
            <GeneralContext.Provider value={{ isDarkMode, setIsDarkMode, isDryRunMode, setIsDryRunMode, isRelativeUnits,
                setIsRelativeUnits, isRoboticArmClosed, setIsRoboticArmClosed, isWayPointVelocityMode, setIsWayPointVelocityMode }}>
                <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                    <GlobalStyles />
                    <ToolbarModule />
                    <GridLayout className="layout"
                                layout={layout}
                                cols={32}
                                rowHeight={50}
                                width={2800}
                                verticalCompact={false}
                                onLayoutChange={(e) => onLayoutChange(e)}
                                draggableCancel={".MuiSlider-valueLabel, .MuiSlider-thumb, .MuiButton-label, .switch, .MuiSelect-root, .MuiFormControl-root, .MuiTypography-root, .MuiInputBase-root, .MuiList-root"}>
                        <div key="thrusters"
                             data-grid={{ x: 0, y: 0, w: 17, h: 6, minW: 17, maxW: 22, minH: 6, maxH: 10 }}
                             style={{ display: 'flex', ...moduleBorder}}>
                            <ThrustersModule />
                            <Thruster key={1}
                                      effort={thruster1}
                                      identification={1}
                                      minMark={-100}
                                      maxMark={100}
                                      step={25}
                                      thumbEnabled={!isDryRunMode}
                            />
                            <Thruster key={2}
                                      effort={thruster2}
                                      identification={2}
                                      minMark={-100}
                                      maxMark={100}
                                      step={25}
                                      thumbEnabled={!isDryRunMode}
                            />
                            <Thruster key={3}
                                      effort={thruster3}
                                      identification={3}
                                      minMark={-100}
                                      maxMark={100}
                                      step={25}
                                      thumbEnabled={!isDryRunMode}
                            />
                            <Thruster key={4}
                                      effort={thruster4}
                                      identification={4}
                                      minMark={-100}
                                      maxMark={100}
                                      step={25}
                                      thumbEnabled={!isDryRunMode}
                            />
                            <Thruster key={5}
                                      effort={thruster5}
                                      identification={5}
                                      minMark={-100}
                                      maxMark={100}
                                      step={25}
                                      thumbEnabled={!isDryRunMode}
                            />
                            <Thruster key={6}
                                      effort={thruster6}
                                      identification={6}
                                      minMark={-100}
                                      maxMark={100}
                                      step={25}
                                      thumbEnabled={!isDryRunMode}
                            />
                            <Thruster key={7}
                                      effort={thruster7}
                                      identification={1}
                                      minMark={-100}
                                      maxMark={100}
                                      step={25}
                                      thumbEnabled={!isDryRunMode}
                            />

  return (
    <div className="margin-top" style={style}>
      <GeneralContext.Provider
        value={{
          isDarkMode,
          setIsDarkMode,
          isDryRunMode,
          setIsDryRunMode,
          isRelativeUnits,
          setIsRelativeUnits,
          isRoboticArmClosed,
          setIsRoboticArmClosed,
          isWayPointVelocityMode,
          setIsWayPointVelocityMode,
          activeModules,
          setActiveModules,
          updateActiveModule,
        }}
      >
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <ToolbarModule />
          <ModulePicker />
          <GeneralContext.Consumer>
            {(context) => (
              <GridLayout
                className="layout"
                layout={layout}
                cols={32}
                rowHeight={50}
                width={2800}
                verticalCompact={false}
                onLayoutChange={(e) => onLayoutChange(e)}
                draggableCancel={
                  '.MuiSlider-valueLabel, .MuiSlider-thumb, .MuiButton-label, .switch, .MuiSelect-root, .MuiFormControl-root, .MuiTypography-root, .MuiInputBase-root, .MuiList-root'
                }
              >
                {context.activeModules.data['thrusters'].active ? (
                  <div
                    key="thrusters"
                    data-grid={{
                      x: 0,
                      y: 0,
                      w: 17,
                      h: 6,
                      minW: 17,
                      maxW: 22,
                      minH: 6,
                      maxH: 10,
                    }}
                    style={{ display: 'flex' }}
                  >
                    <ThrustersModule />
                    <Thruster
                      key={1}
                      effort={thruster1}
                      identification={1}
                      minMark={-100}
                      maxMark={100}
                      step={25}
                      thumbEnabled={!isDryRunMode}
                    />
                    <Thruster
                      key={2}
                      effort={thruster2}
                      identification={2}
                      minMark={-100}
                      maxMark={100}
                      step={25}
                      thumbEnabled={!isDryRunMode}
                    />
                    <Thruster
                      key={3}
                      effort={thruster3}
                      identification={3}
                      minMark={-100}
                      maxMark={100}
                      step={25}
                      thumbEnabled={!isDryRunMode}
                    />
                    <Thruster
                      key={4}
                      effort={thruster4}
                      identification={4}
                      minMark={-100}
                      maxMark={100}
                      step={25}
                      thumbEnabled={!isDryRunMode}
                    />
                    <Thruster
                      key={5}
                      effort={thruster5}
                      identification={5}
                      minMark={-100}
                      maxMark={100}
                      step={25}
                      thumbEnabled={!isDryRunMode}
                    />
                    <Thruster
                      key={6}
                      effort={thruster6}
                      identification={6}
                      minMark={-100}
                      maxMark={100}
                      step={25}
                      thumbEnabled={!isDryRunMode}
                    />
                    <Thruster
                      key={7}
                      effort={thruster7}
                      identification={1}
                      minMark={-100}
                      maxMark={100}
                      step={25}
                      thumbEnabled={!isDryRunMode}
                    />

                    <Thruster
                      key={8}
                      effort={thruster8}
                      identification={8}
                      minMark={-100}
                      maxMark={100}
                      step={25}
                      thumbEnabled={!isDryRunMode}
                    />
                  </div>
                ) : (
                  // TODO this is hacky
                  <React.Fragment></React.Fragment>
                )}
                <div
                  key="actuator"
                  data-grid={{
                    x: 20,
                    y: 0,
                    w: 5,
                    h: 6,
                    minW: 5,
                    maxW: 10,
                    minH: 6,
                    maxH: 10,
                  }}
                  style={{ display: 'flex' }}
                >
                  <ActuatorModule />
                </div>
                {context.activeModules.data['imageViewer'].active ? (
                  <div
                    key="imageViewer"
                    data-grid={{
                      x: 0,
                      y: 7,
                      w: 10,
                      h: 10,
                      minW: 8,
                      maxW: 30,
                      minH: 8,
                      maxH: 30,
                    }}
                    style={{ display: 'flex' }}
                  >
                    <ImageViewer />
                  </div>
                ) : (
                  // TODO also hacky
                  <React.Fragment></React.Fragment>
                )}

                        </div>
                        <div key="actuator"
                             data-grid={{ x: 20, y: 0, w: 5, h: 6, minW: 5, maxW: 10, minH: 6, maxH: 10 }}
                             style={{ display: 'flex', ...moduleBorder}}>
                            <ActuatorModule />
                        </div>
                        <div key="imageViewer"
                             data-grid={{ x: 0, y: 7, w: 10, h: 10, minW: 8, maxW: 30, minH: 8, maxH: 30 }}
                             style={{ display: 'flex' , ...moduleBorder}}>
                            <ImageViewer />
                        </div>
                        <div key="pfd"
                             data-grid={{ x: 11, y: 7, w: 22, h:12, minW: 8, maxW: 30, minH: 8, maxH: 30 }}
                             style={{ display: 'flex' , ...moduleBorder}}>
                            <Pfd />
                        </div>
                        <div key="testBoard"
                             data-grid={{ x: 20, y: 0, w: 5, h:9 , minW: 8, maxW: 30, minH: 8, maxH: 30 }}
                             style={{ display: 'flex' , ...moduleBorder}}>
                            <TestBoardModule />
                        </div>
                        <div key="waypoints"
                             data-grid={{ x: 50, y: 0, w: 5, h:9 , minW: 8, maxW: 30, minH: 8, maxH: 30 }}
                             style={{ display: 'flex' , ...moduleBorder}}>
                            <Waypoints />
                        </div>
                        <div key="imageViewer2"
                             data-grid={{ x: 0, y: 17, w: 10, h: 10, minW: 8, maxW: 30, minH: 8, maxH: 30 }}
                             style={{ display: 'flex' , ...moduleBorder}}>
                            <ImageViewer />
                        </div>
                        <div key="visionUi"
                            data-grid={{ x: 0, y: 27, w: 11, h: 17, minW: 11, maxW: 30, minH: 17, maxH: 30 }}
                            style={{ display: 'flex' , ...moduleBorder}}>
                            <VisionUI />
                        </div>
                    </GridLayout>
                </ThemeProvider>
            </GeneralContext.Provider>
        </div>
    );
}

export default App;
