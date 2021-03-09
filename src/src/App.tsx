import React, { useState, useEffect, useCallback } from "react";
import GridLayout from 'react-grid-layout'
import { Thruster } from './components/Thruster'
import ThrustersModule from "./components/ThustersModule";
import { useROSTopicSubscriber } from "./hooks/useROSTopicSubscriber";
import {GeneralContext} from "./context/generalContext";
import { ThemeProvider } from 'styled-components';
import {lightTheme, darkTheme} from "./components/Theme"
import {GlobalStyles} from "./components/global";
import ToolbarModule from "./components/ToolbarModule";


export const App = () => {
    const [theme, setTheme] = useState('dark');
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

    useROSTopicSubscriber<any>(thrusterEffortCallback, "/provider_thruster/effort", "sonia_common/ThrusterEffort")

    const style = { height: 'calc(100% - 55px)' };
    const [isDryRunMode, setIsDryRunMode] = React.useState(false);
    const [isRelativeUnits, setIsRelativeUnits] = React.useState(false)
    return (
        <GeneralContext.Provider value={{isDryRunMode, setIsDryRunMode, isRelativeUnits, setIsRelativeUnits}}>
            <div className="margin-top" style={style} >
                <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
                <GlobalStyles />
                <ToolbarModule />
                <GridLayout className="layout"
                    cols={12}
                    rowHeight={100}
                    verticalCompact={false}
                    draggableCancel={".MuiSlider-valueLabel, .MuiSlider-thumb"}>
                    <div key="a"
                        data-grid={{ x: 2, y: 0, w: 8, h: 5, minW: 8, maxW: 12, minH: 3, maxH: 6 }}
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
                                    thumbEnabled={!isDryRunMode}
                                />
                            )
                        })}
                    </div>
                </GridLayout>
                </ThemeProvider>
            </div>
        </GeneralContext.Provider>
    );
}

export default App;