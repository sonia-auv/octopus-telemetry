import React, { useState, useCallback } from "react";
import GridLayout, { contextType } from 'react-grid-layout'
import { Thruster } from './components/Thruster'
import ThrustersModule from "./components/ThustersModule";
import ActuatorModule from "./components/ActuatorModule";
import ImageViewer from "./components/ImageViewer";
import Pfd from "./components/Pfd";
import TestBoardModule from "./components/TestBoardModule";
import Waypoints from "./components/Waypoints";
import VisionUI from "./components/VisionUi";
import { useROSTopicSubscriber } from "./hooks/useROSTopicSubscriber";
import {GeneralContext, defaultModules} from "./context/generalContext";
import { ThemeProvider } from 'styled-components';
import {lightTheme, darkTheme} from "./components/Theme"
import {GlobalStyles} from "./components/global";
import ToolbarModule from "./components/ToolbarModule";
import ModulePicker from './components/modulepicker/ModulePicker'
import { Module, ActiveModules } from './components/modulepicker/ModulesMetadata'
import { Drawer } from '@material-ui/core'
import './App.css'


export const App = () => {
    const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("isDarkMode") as string ) ? 'dark': 'light');
    const [thruster1, setThruster1] = useState(0)
    const [thruster2, setThruster2] = useState(0)
    const [thruster3, setThruster3] = useState(0)
    const [thruster4, setThruster4] = useState(0)
    const [thruster5, setThruster5] = useState(0)
    const [thruster6, setThruster6] = useState(0)
    const [thruster7, setThruster7] = useState(0)
    const [thruster8, setThruster8] = useState(0)

    const originalLayout = JSON.parse(localStorage.getItem("layout") as string )|| []
    const [layout, setLayout] = useState(originalLayout)

    const onLayoutChange = (layout:any) => {
        localStorage.setItem("layout", JSON.stringify(layout))
        setLayout(layout)
    }

    const saveChosenModulesToStorage = (activeModules: ActiveModules) => {
        const out = Object.assign({}, ...Object.keys(activeModules.data).map(key => ({
            [key]: activeModules.data[key].active
        })))
        localStorage.setItem("activeModules", JSON.stringify(out))
    }

    const loadChosenModulesFromStorage = () => {
        const out = JSON.parse(localStorage.getItem('activeModules') as string)
        if (!out) {
            return
        }
        Object.keys(out).map((key: string, index: number) => {
            defaultModules.data[key].active = out[key]
        })
    }

    const moduleBorder = { border: '1px solid black', borderRadius: '10px', borderColor: 'gray', borderStyle: 'dashed' }

    const thrusterEffortCallback = useCallback(
        (x: any) => {
            let id = x.ID
            let effort = x.effort
            switch(id){
                case 1:
                    setThruster1(effort)
                    break;
                case 2:
                    setThruster2(effort)
                    break;
                case 3:
                    setThruster3(effort)
                    break;
                case 4:
                    setThruster4(effort)
                    break;
                case 5:
                    setThruster5(effort)
                    break;
                case 6:
                    setThruster6(effort)
                    break;
                case 7:
                    setThruster7(effort)
                    break;
                case 8:
                    setThruster8(effort)
                    break;
            }
        },
        []
    )

    useROSTopicSubscriber<any>(thrusterEffortCallback, "/provider_thruster/effort", "sonia_common/ThrusterEffort")

    const [isDarkMode, setIsDarkMode] = React.useState(theme === 'dark')
    const [isDryRunMode, setIsDryRunMode] = React.useState(false);
    const [isRelativeUnits, setIsRelativeUnits] = React.useState(false)
    const [isRoboticArmClosed, setIsRoboticArmClosed] = React.useState(false)
    const [isWayPointVelocityMode, setIsWayPointVelocityMode] = React.useState(false)

    loadChosenModulesFromStorage()
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
  
      setActiveModules(updatedActiveModules);
      saveChosenModulesToStorage(updatedActiveModules);
    };

    const [sideBarVisible, setSideBarVisible] = useState(false)
  
    return (

        <div>
            <GeneralContext.Provider value={{ isDarkMode, setIsDarkMode, isDryRunMode, setIsDryRunMode, isRelativeUnits,
                setIsRelativeUnits, isRoboticArmClosed, setIsRoboticArmClosed, isWayPointVelocityMode, setIsWayPointVelocityMode, activeModules, setActiveModules, updateActiveModule }}>
                <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                    <GlobalStyles />
                    <ToolbarModule handleShowSidebar={setSideBarVisible} />
                    <div className="App__main-wrapper">
                    <Drawer ModalProps={{ onBackdropClick: () => setSideBarVisible(false) }} variant="temporary" anchor="left" open={sideBarVisible} onClose={() => setSideBarVisible(false)}>
                        <ModulePicker toggleSidebar={() => {
                            setSideBarVisible(false)
                            }} visible={sideBarVisible} />
                    </Drawer>
                    <GeneralContext.Consumer>
                        {context => (
                    
                    <GridLayout 
                                layout={layout}
                                cols={32}
                                rowHeight={50}
                                width={2800}
                                verticalCompact={false}
                                preventCollision={true}
                                onLayoutChange={(e) => onLayoutChange(e)}
                                draggableCancel={".MuiSlider-valueLabel, .MuiSlider-thumb, .MuiButton-label, .switch, .MuiSelect-root, .MuiFormControl-root, .MuiTypography-root, .MuiInputBase-root, .MuiList-root"}>
                                {context.activeModules.data['thrusters'].active ? (
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

                            <Thruster key={8}
                                      effort={thruster8}
                                      identification={8}
                                      minMark={-100}
                                      maxMark={100}
                                      step={25}
                                      thumbEnabled={!isDryRunMode}
                            />
                        </div>) : (<React.Fragment></React.Fragment>)}
                                {context.activeModules.data['actuators'].active ? (
                                       <div key="actuator"
                             data-grid={{ x: 20, y: 0, w: 5, h: 6, minW: 5, maxW: 10, minH: 6, maxH: 10 }}
                             style={{ display: 'flex', ...moduleBorder}}>
                            <ActuatorModule />
                        </div>    
                        ) : (<React.Fragment></React.Fragment>)}
             
                                {context.activeModules.data['imageViewer1'].active ? (
                                             <div key="imageViewer"
                             data-grid={{ x: 0, y: 7, w: 10, h: 10, minW: 8, maxW: 30, minH: 8, maxH: 30 }}
                             style={{ display: 'flex' , ...moduleBorder}}>
                            <ImageViewer />
                        </div>) : (<React.Fragment></React.Fragment>)}

                                {context.activeModules.data['pfd'].active ? (
                                    <div key="pfd"
                                            data-grid={{ x: 11, y: 7, w: 22, h:12, minW: 8, maxW: 30, minH: 8, maxH: 30 }}
                                            style={{ display: 'flex' , ...moduleBorder}}>
                                            <Pfd />
                                        </div>
                                ) : (<React.Fragment></React.Fragment>)}
  
                                {context.activeModules.data['testBoard'].active ? (
                                                      <div key="testBoard"
                             data-grid={{ x: 20, y: 0, w: 5, h:9 , minW: 8, maxW: 30, minH: 8, maxH: 30 }}
                             style={{ display: 'flex' , ...moduleBorder}}>
                            <TestBoardModule />
                        </div>      
                        ) : (<React.Fragment></React.Fragment>)}

                                {context.activeModules.data['waypoints'].active ? (
                                    <div key="waypoints"
                             data-grid={{ x: 50, y: 0, w: 5, h:9 , minW: 8, maxW: 30, minH: 8, maxH: 30 }}
                             style={{ display: 'flex' , ...moduleBorder}}>
                            <Waypoints />
                        </div>      
                        ) : (<React.Fragment></React.Fragment>)}
                  
                                {context.activeModules.data['imageViewer2'].active ? (
                                           <div key="imageViewer2"
                             data-grid={{ x: 0, y: 17, w: 10, h: 10, minW: 8, maxW: 30, minH: 8, maxH: 30 }}
                             style={{ display: 'flex' , ...moduleBorder}}>
                            <ImageViewer />
                        </div>) : (<React.Fragment></React.Fragment>)}
         
                                {context.activeModules.data['visionUi'].active ? (<div key="visionUi"
                                    data-grid={{ x: 0, y: 27, w: 11, h: 17, minW: 11, maxW: 30, minH: 17, maxH: 30 }}
                                    style={{ display: 'flex', ...moduleBorder }}>
                                    <VisionUI />
                                </div>) : <React.Fragment></React.Fragment>}
                    </GridLayout>
                        )}
                    </GeneralContext.Consumer>                
                    </div>
   </ThemeProvider>
            </GeneralContext.Provider>
        </div>
    );
}

export default App;