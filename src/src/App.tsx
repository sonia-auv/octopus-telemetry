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

export const App = () => {

    const [thrusters, setThrusters] = useState<{ ID: number, effort: number, thumbEnabled: boolean }[]>(
        [
            { ID: 1, effort: 0, thumbEnabled: true },
            { ID: 2, effort: 0, thumbEnabled: false },
            { ID: 3, effort: 0, thumbEnabled: true },
            { ID: 4, effort: 0, thumbEnabled: false },
            { ID: 5, effort: 0, thumbEnabled: true },
        ]);

    const thrusterEffortCallback = useCallback(
        (x: any) => {
            let data = x.data
            let parsed = JSON.parse(data)
            setThrusters([
                { ID: 1, effort: parsed[1], thumbEnabled: true },
                { ID: 2, effort: parsed[2], thumbEnabled: false },
                { ID: 3, effort: parsed[3], thumbEnabled: true },
                { ID: 4, effort: parsed[4], thumbEnabled: false },
                { ID: 5, effort: parsed[5], thumbEnabled: true },
            ])
        },
        []
    )

    useROSTopicSubscriber<any>(thrusterEffortCallback, "/testSubscribe", "std_msgs/String")

    const style = { height: 'calc(100% - 55px)' };
    const [isDryRunMode, setIsDryRunMode] = React.useState(false);
    const [isRelativeUnits, setIsRelativeUnits] = React.useState(false)
    const [isRoboticArmClosed, setIsRoboticArmClosed] = React.useState(false)
    const [isWayPointVelocityMode, setIsWayPointVelocityMode] = React.useState(false)

    return (
        <div className="margin-top" style={style} >
            <GeneralContext.Provider value={{ isDryRunMode, setIsDryRunMode, isRelativeUnits, setIsRelativeUnits, isRoboticArmClosed, setIsRoboticArmClosed, isWayPointVelocityMode, setIsWayPointVelocityMode }}>
                <GridLayout className="layout"
                    cols={32}
                    rowHeight={50}
                    width={2000}
                    verticalCompact={false}
                    draggableCancel={".MuiSlider-valueLabel, .MuiSlider-thumb, .MuiButton-label, .switch"}>
                    <div key="a"
                        data-grid={{ x: 0, y: 0, w: 17, h: 6, minW: 17, maxW: 22, minH: 6, maxH: 10 }}
                        style={{ display: 'flex' }}>
                        <ThrustersModule />
                        {thrusters.map((thruster, id) => {
                            return (
                                <Thruster key={id}
                                    effort={thruster.effort}
                                    identification={thruster.ID}
                                    minMark={-100}
                                    maxMark={100}
                                    step={25}
                                    thumbEnabled={isDryRunMode} />
                            )
                        })}
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
                         data-grid={{ x: 20, y: 0, w: 5, h:9 , minW: 8, maxW: 30, minH: 8, maxH: 30 }}
                         style={{ display: 'flex' }}>
                        <TestBoardModule />
                    </div>
                    <div key="f"
                         data-grid={{ x: 50, y: 0, w: 5, h:9 , minW: 8, maxW: 30, minH: 8, maxH: 30 }}
                         style={{ display: 'flex' }}>
                        <Waypoints />
                    </div>
                    <div key="g"
                        data-grid={{ x: 0, y: 17, w: 10, h: 10, minW: 8, maxW: 30, minH: 8, maxH: 30 }}
                        style={{ display: 'flex' }}>
                        <ImageViewer />
                    </div>
                </GridLayout>
            </GeneralContext.Provider>
        </div>
    );
}

export default App;