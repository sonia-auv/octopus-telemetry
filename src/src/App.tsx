import React, { useState, useEffect, useCallback } from "react";
import GridLayout from 'react-grid-layout'
import { Thruster } from './components/Thruster'
import ThrustersModule from "./components/ThustersModule";
import ActuatorModule from "./components/ActuatorModule";
import ImageViewer from "./components/ImageViewer";
import Pfd from "./components/Pfd";
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

    const style = { height: 'calc(100% - 55px)' };
    const [isDryRunMode, setIsDryRunMode] = React.useState(false);
    const [isRelativeUnits, setIsRelativeUnits] = React.useState(false)
    const [isRoboticArmClosed, setIsRoboticArmClosed] = React.useState(false)
    const [isWayPointVelocityMode, setIsWayPointVelocityMode] = React.useState(false)

    return (

        <div className="margin-top" style={style} >
            <GeneralContext.Provider value={{ isDryRunMode, setIsDryRunMode, isRelativeUnits, setIsRelativeUnits, isRoboticArmClosed, setIsRoboticArmClosed }}>
                <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
                    <GlobalStyles />
                    <ToolbarModule />
                    <GridLayout className="layout"
                                cols={32}
                                rowHeight={50}
                                width={2800}
                                verticalCompact={false}
                                draggableCancel={".MuiSlider-valueLabel, .MuiSlider-thumb, .MuiButton-label, .switch"}>
                    <div key="a"
                        data-grid={{ x: 0, y: 0, w: 17, h: 6, minW: 17, maxW: 22, minH: 6, maxH: 10 }}
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
                    <div key="b"
                        data-grid={{ x: 20, y: 0, w: 5, h: 6, minW: 5, maxW: 10, minH: 6, maxH: 10 }}
                        style={{ display: 'flex' }}>
                        <ActuatorModule />
                    </div>
                    <div key="c"
                        data-grid={{ x: 0, y: 7, w: 10, h: 10, minW: 8, maxW: 30, minH: 8, maxH: 30 }}
                        style={{ display: 'flex' }}>
                        <ImageViewer />
                    </div>
                    <div key="d"
                        data-grid={{ x: 11, y: 7, w: 22, h:12, minW: 8, maxW: 30, minH: 8, maxH: 30 }}
                        style={{ display: 'flex' }}>
                        <Pfd />
                    </div>
                    <div key="e"
                        data-grid={{ x: 11, y: 19, w: 8, h:7, minW: 8, maxW: 15, minH: 7, maxH: 15 }}
                        style={{ display: 'flex' }}>
                        <Waypoints />
                    </div>
                    <div key="f"
                        data-grid={{ x: 0, y: 17, w: 10, h: 10, minW: 8, maxW: 30, minH: 8, maxH: 30 }}
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