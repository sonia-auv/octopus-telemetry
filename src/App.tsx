import React, { useState } from "react";
import GridLayout from 'react-grid-layout'
import ThrustersModule from "./components/thrusters/ThustersModule";
import ActuatorModule from "./components/ActuatorModule";
import ImageViewer from "./components/ImageViewer";
import MissionManager from "./components/MissionManager";
import Pfd from "./components/PFD/Pfd";
import ControlModule from "./components/ControlModule";
import TestBoardModule from "./components/TestBoardModule";
import Waypoints from "./components/Waypoints";
import VisionUI from "./components/visionui/VisionUi";
import {GeneralContext, defaultModules} from "./context/generalContext";
import { ThemeProvider } from 'styled-components';
import {lightTheme, darkTheme} from "./components/Theme"
import {GlobalStyles} from "./components/global";
import ToolbarModule from "./components/toolbar/ToolbarModule";
import ModulePicker from './components/modulepicker/ModulePicker'
import { Module, ActiveModules } from './components/modulepicker/ModulesMetadata'
import { Drawer } from '@material-ui/core'
import PowerModule from "./components/powermodule/PowerModule";
import SetPwmModule from "./components/thrusters/SetPwmModule";
// import TemplateModule from "./components/TemplateModule";
import './App.css'
// import { useROSTopicSubscriber } from "./hooks/useROSTopicSubscriber";
// import ROSLIB from "roslib";

export const App = () => {
    const [theme] = useState(JSON.parse(localStorage.getItem("isDarkMode") as string ) ? 'dark': 'light');
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

    const [isDarkMode, setIsDarkMode] = React.useState(theme === 'dark');
    const [isRelativeUnits, setIsRelativeUnits] = React.useState(false);
    const [isRoboticArmClosed, setIsRoboticArmClosed] = React.useState(false);
    const [isWayPointVelocityMode, setIsWayPointVelocityMode] = React.useState(false);

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

    // const dryRunModeCallback = (val : any) => {
    //     console.log(val);
    //     setIsDryRunMode(!val.data);
    // };

    // const dryRunModeMsgSubscriber = useROSTopicSubscriber(dryRunModeCallback, "/telemetry/dry_run", "/std_msgs/Bool");

    const [sideBarVisible, setSideBarVisible] = useState(false)
  
    return (
        <div>
            <GeneralContext.Provider value={{ isDarkMode, setIsDarkMode, isRelativeUnits,
                setIsRelativeUnits, isRoboticArmClosed, setIsRoboticArmClosed, isWayPointVelocityMode, setIsWayPointVelocityMode, activeModules, setActiveModules, updateActiveModule }}>
                <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                    <GlobalStyles />
                    <ToolbarModule handleShowSidebar={setSideBarVisible} />
                    <div className="App__main-wrapper">
                    <Drawer ModalProps={{ onBackdropClick: () => setSideBarVisible(false) }} variant="temporary" anchor="left" open={sideBarVisible} onClose={() => setSideBarVisible(false)}>
                        <ModulePicker  />
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
                                            data-grid={{ x: 0, y: 0, w: 20, h: 8, minW: 20, maxW: 20, minH: 8, maxH: 8 }}
                                            style={{ display: 'flex', ...moduleBorder}}>
                                            <ThrustersModule />
                        </div>) : (<React.Fragment></React.Fragment>)}
                                {context.activeModules.data['actuators'].active ? (
                                       <div key="actuator"
                                            data-grid={{ x: 20, y: 0, w: 5, h: 6, minW: 5, maxW: 10, minH: 6, maxH: 10 }}
                                            style={{ display: 'flex', ...moduleBorder}}>
                                            <ActuatorModule />
                        </div>) : (<React.Fragment></React.Fragment>)}
                                {context.activeModules.data['imageViewer1'].active ? (
                                        <div key="imageViewer"
                                            data-grid={{ x: 0, y: 7, w: 10, h: 10, minW: 8, maxW: 30, minH: 8, maxH: 30 }}
                                            style={{ display: 'flex' , ...moduleBorder}}>
                                            <ImageViewer />
                        </div>) : (<React.Fragment></React.Fragment>)}
                                {context.activeModules.data['pfd'].active ? (
                                        <div key="pfd"
                                            data-grid={{ x: 11, y: 7, w: 13, h:12, minW: 13, maxW: 13, minH: 12, maxH: 12 }}
                                            style={{ display: 'flex' , ...moduleBorder}}>
                                            <Pfd />
                        </div>) : (<React.Fragment></React.Fragment>)}
                                {context.activeModules.data['testBoard'].active ? (
                                        <div key="testBoard"
                                            data-grid={{ x: 20, y: 0, w: 5, h:9 , minW: 8, maxW: 30, minH: 8, maxH: 30 }}
                                            style={{ display: 'flex' , ...moduleBorder}}>
                                            <TestBoardModule />
                        </div>) : (<React.Fragment></React.Fragment>)}
                                {context.activeModules.data['waypoints'].active ? (
                                        <div key="waypoints"
                                            data-grid={{ x: 50, y: 0, w: 7, h:12 , minW: 7, maxW: 7, minH: 12, maxH: 12 }}
                                            style={{ display: 'flex' , ...moduleBorder}}>
                                            <Waypoints />
                        </div>) : (<React.Fragment></React.Fragment>)}
                                {context.activeModules.data['imageViewer2'].active ? (
                                        <div key="imageViewer2"
                                            data-grid={{ x: 0, y: 17, w: 10, h: 10, minW: 8, maxW: 30, minH: 8, maxH: 30 }}
                                            style={{ display: 'flex' , ...moduleBorder}}>
                                            <ImageViewer />
                        </div>) : (<React.Fragment></React.Fragment>)}
                                {context.activeModules.data['visionUi'].active ? (
                                        <div key="visionUi"
                                            data-grid={{ x: 0, y: 27, w: 11, h: 17, minW: 11, maxW: 30, minH: 17, maxH: 30 }}
                                            style={{ display: 'flex', ...moduleBorder }}>
                                            <VisionUI />
                        </div>) : <React.Fragment></React.Fragment>}
                                {context.activeModules.data['powerModule'].active ? (
                                        <div key="powerModule" 
                                            data-grid={{ x: 0, y: 37, w: 12, h: 8, maxW: 20, maxH: 20 }} 
                                            style={{ display: 'flex', ...moduleBorder }}>
                                            <PowerModule />
                        </div>) : <React.Fragment></React.Fragment>}
                                {context.activeModules.data['controlModule'].active ? (
                                        <div key="controlModule"
                                            data-grid={{ x: 0, y: 20, w: 10, h: 11, minW: 10, maxW: 10, minH: 11, maxH: 11 }}
                                            style={{ display: 'flex', ...moduleBorder }}>
                                            <ControlModule />
                        </div>) : <React.Fragment></React.Fragment>}
                                {context.activeModules.data['missionManager'].active ? (
                                        <div key="missionManager"
                                            data-grid={{ x: 0, y: 20, w: 5, h: 6, minW: 5, maxW: 5, minH: 6, maxH: 6 }}
                                            style={{ display: 'flex', ...moduleBorder }}>
                                            <MissionManager />
                        </div>) : <React.Fragment></React.Fragment>}
                                {context.activeModules.data['setPwmModule'].active ? (
                                        <div key="setPwmModule"
                                            data-grid={{ x: 0, y: 20, w: 4, h: 10, minW: 4, maxW: 4, minH: 10, maxH: 10 }}
                                            style={{ display: 'flex', ...moduleBorder }}>
                                            <SetPwmModule />
                        </div>) : <React.Fragment></React.Fragment>}
                                {/* {context.activeModules.data['templateModule'].active ? (
                                        <div key="templateModule"
                                            data-grid={{ x: 0, y: 20, w: 4, h: 9, minW: 4, maxW: 4, minH: 9, maxH: 9 }}
                                            style={{ display: 'flex', ...moduleBorder }}>
                                            <TemplateModule />
                        </div>) : <React.Fragment></React.Fragment>} */}
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