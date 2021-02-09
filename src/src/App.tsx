import React, { useState, useEffect, useCallback} from "react";
import GridLayout from 'react-grid-layout'
import { useROSTopicSubscriber } from "./hooks/useROSTopicSubscriber";
import {ThrustersForm} from './components/ThrustersForm'
import {Thruster} from './components/Thruster'


export const App = () => {

    const [readMode, setReadMode] = useState(true);
    const [thrusters, setThrusters] = useState<{ ID: number, effort: number }[]>(
        [
            {ID: 1, effort: 0},
            {ID: 2, effort: 0},
            {ID: 3, effort: 0},
            {ID: 4, effort: 0},
            {ID: 5, effort: 0},


        ]);

    const thrusterEffortCallback = useCallback(
        (x: any) => {
            let data = x.data
            let parsed = JSON.parse(data)
            setThrusters([
                {ID: 1, effort:parsed[1]},
                {ID: 2, effort:parsed[2]},
                {ID: 3, effort:parsed[3]},
                {ID: 4, effort:parsed[4]},
                {ID: 5, effort:parsed[5]},

                ])
        },
        []
    )

    useROSTopicSubscriber<any>(thrusterEffortCallback, "/testSubscribe", "std_msgs/String")

    const style = { height: 'calc(100% - 55px)' };
    return (
        <div className="margin-top" style={style} >
            <GridLayout className="layout"
                        cols={12}
                        rowHeight={200}
                        width={1200}
                        verticalCompact={false}>
                <div key="a"
                     data-grid={{x: 4, y: 0, w: 4, h: 4}}
                     style={{height: 400}}>
                    {thrusters.map((thruster, id) =>{
                        return (
                            <Thruster key={id}
                                  effort={thruster.effort}
                                  identification={thruster.ID} />
                        )
                    })}
                </div>
                <div key="b"
                    data-grid={{x: 0, y: 0, w: 1, h: 1}}
                    style={{height: 600}}>
                    <ThrustersForm /> //TODO replace with the right component
                </div>
            </GridLayout>


        </div>
    );

}

export default App;