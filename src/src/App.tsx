import React, { useState, useCallback } from "react";
import GridLayout from 'react-grid-layout'
import { Thruster } from './components/Thruster'
import ThrustersModule from "./components/ThustersModule";
import ActuatorModule from "./components/ActuatorModule";
import ImageViewer from "./components/ImageViewer";
import Pfd from "./components/Pfd";
import TestBoardModule from "./components/TestBoardModule";
import Waypoints from "./components/Waypoints";
import { useROSTopicSubscriber } from "./hooks/useROSTopicSubscriber";
import {GeneralContext} from "./context/generalContext";
import { ThemeProvider } from 'styled-components';
import {lightTheme, darkTheme} from "./components/Theme"
import {GlobalStyles} from "./components/global";
import ToolbarModule from "./components/ToolbarModule";

export const App = () => {
    const [theme, setTheme] = useState('dark');
    const [thruster1, setThruster1] = useState(0)
    const [thruster2, setThruster2] = useState(0)
    const [thruster3, setThruster3] = useState(0)
    const [thruster4, setThruster4] = useState(0)
    const [thruster5, setThruster5] = useState(0)
    const [thruster6, setThruster6] = useState(0)
    const [thruster7, setThruster7] = useState(0)
    const [thruster8, setThruster8] = useState(0)

    const [isDryRunMode, setIsDryRunMode] = React.useState(false);
    const [isRelativeUnits, setIsRelativeUnits] = React.useState(false)
    const [isRoboticArmClosed, setIsRoboticArmClosed] = React.useState(false)
    const [isWayPointVelocityMode, setIsWayPointVelocityMode] = React.useState(false)

    /*
        The default X and Y positions of each module
     */

    const thrustersDefaultPosX = 0
    const thrustersDefaultPosY = 0

    const actuatorDefaultPosX = 20
    const actuatorDefaultPosY = 0

    const imageViewerDefaultPosX = 0
    const imageViewerDefaultPosY = 7

    const pfdDefaultPosX = 11
    const pfdDefaultPosY = 7

    const testBoardDefaultPosX = 20
    const testBoardDefaultPosY = 0

    const waypointDefaultPosX = 50
    const waypointDefaultPosY = 0

    const imageViewer2DefaultPosX = 0
    const imageViewer2DefaultPosY = 17

    // this method saves the x and y position of each module in the local storage
    const updateModulePosition = (modules: any) => {
        modules.forEach(function(module: any){
            const id = module.i
            const xPos = module.x
            const yPos = module.y
            localStorage.setItem(id + "X", xPos)
            localStorage.setItem(id + "Y", yPos)
        })
    }
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


    /*
        For each module we look for it's X and Y position in the local storage.
        If the values are not found, we use the default positions.
     */

    const thrustersX = localStorage.getItem("thrustersX") === null ? thrustersDefaultPosX : parseInt(localStorage.getItem("thrustersX") as string)
    const thrustersY = localStorage.getItem("thrustersY") === null ? thrustersDefaultPosY : parseInt(localStorage.getItem("thrustersY") as string)

    const actuatorX = localStorage.getItem("actuatorX") === null ? actuatorDefaultPosX : parseInt(localStorage.getItem("actuatorX") as string)
    const actuatorY = localStorage.getItem("actuatorY") === null ? actuatorDefaultPosY : parseInt(localStorage.getItem("actuatorY") as string)

    const imageViewerX = localStorage.getItem("imageViewerX") === null ? imageViewerDefaultPosX : parseInt(localStorage.getItem("imageViewerX") as string)
    const imageViewerY = localStorage.getItem("imageViewerY") === null ? imageViewerDefaultPosY : parseInt(localStorage.getItem("imageViewerY") as string)

    const testBoardX = localStorage.getItem("testBoardX") === null ? testBoardDefaultPosX : parseInt(localStorage.getItem("testBoardX") as string)
    const testBoardY = localStorage.getItem("testBoardY") === null ? testBoardDefaultPosY : parseInt(localStorage.getItem("testBoardY") as string)

    const waypointX = localStorage.getItem("waypointX") === null ? waypointDefaultPosX : parseInt(localStorage.getItem("waypointX") as string)
    const waypointY = localStorage.getItem("waypointY") === null ? waypointDefaultPosY : parseInt(localStorage.getItem("waypointY") as string)

    const imageViewer2X = localStorage.getItem("imageViewer2X") === null ? imageViewer2DefaultPosX : parseInt(localStorage.getItem("imageViewer2X") as string)
    const imageViewer2Y = localStorage.getItem("imageViewer2Y") === null ? imageViewer2DefaultPosY : parseInt(localStorage.getItem("imageViewer2Y") as string)

    const pfdX = localStorage.getItem("pfdX") === null ? pfdDefaultPosX : parseInt(localStorage.getItem("pfdX") as string)
    const pfdY = localStorage.getItem("pfdY") === null ? pfdDefaultPosY : parseInt(localStorage.getItem("pfdY") as string)

    return (
        <div className="margin-top">
            <GeneralContext.Provider value={{ isDryRunMode, setIsDryRunMode, isRelativeUnits, setIsRelativeUnits, isRoboticArmClosed, setIsRoboticArmClosed, isWayPointVelocityMode, setIsWayPointVelocityMode }}>
                <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
                    <GlobalStyles />
                    <ToolbarModule />
                    <GridLayout className="layout"
                                cols={32}
                                rowHeight={50}
                                width={2800}
                                verticalCompact={false}
                                draggableCancel={".MuiSlider-valueLabel, .MuiSlider-thumb, .MuiButton-label, .switch"}
                                onDragStop={(e)=>updateModulePosition(e)}>
                    <div key="thrusters"
                        data-grid={{ x: thrustersX, y: thrustersY, w: 17, h: 6, minW: 17, maxW: 22, minH: 6, maxH: 10 }}
                        style={{ display: 'flex' }}>
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


                    </div>
                    <div key="actuator"
                        data-grid={{ x: actuatorX, y: actuatorY, w: 5, h: 6, minW: 5, maxW: 10, minH: 6, maxH: 10 }}
                        style={{ display: 'flex' }}>
                        <ActuatorModule />
                    </div>
                    <div key="imageViewer"
                        data-grid={{ x: imageViewerX, y: imageViewerY, w: 10, h: 10, minW: 8, maxW: 30, minH: 8, maxH: 30 }}
                        style={{ display: 'flex' }}>
                        <ImageViewer />
                    </div>
                    <div key="pfd"
                        data-grid={{ x: pfdX, y: pfdY, w: 22, h:12, minW: 8, maxW: 30, minH: 8, maxH: 30 }}
                        style={{ display: 'flex' }}>
                        <Pfd />
                    </div>
                    <div key="testBoard"
                         data-grid={{ x: testBoardX, y: testBoardY, w: 5, h:9 , minW: 8, maxW: 30, minH: 8, maxH: 30 }}
                         style={{ display: 'flex' }}>
                        <TestBoardModule />
                    </div>
                    <div key="waypoint"
                         data-grid={{ x: waypointX, y: waypointY, w: 5, h:9 , minW: 8, maxW: 30, minH: 8, maxH: 30 }}
                         style={{ display: 'flex' }}>
                        <Waypoints />
                    </div>
                    <div key="imageViewer2"
                        data-grid={{ x: imageViewer2X, y: imageViewer2Y, w: 10, h: 10, minW: 8, maxW: 30, minH: 8, maxH: 30 }}
                        style={{ display: 'flex' }}>
                        <ImageViewer />
                    </div>
                </GridLayout>
                </ThemeProvider>
            </GeneralContext.Provider>
        </div>
    );
}

export default App;