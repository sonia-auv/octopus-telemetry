import React, { useState, useEffect, useCallback} from "react";
import * as ROSLIB from 'roslib';
import Slider from '@material-ui/core/Slider'
import GridLayout from 'react-grid-layout'
import { useROSTopicSubscriber } from "./hooks/useROSTopicSubscriber";

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

    useROSTopicSubscriber<any>(thrusterEffortCallback, "/testPublisher", "std_msgs/String") // TODO Set message type



    const style = { height: 'calc(100% - 55px)' };
    console.log(thrusters)
    const marks = [
        {
            value: -100,
            label: 100
        },
        {
            value: -75,
            label: -75
        },
        {
            value: -50,
            label: -50
        },
        {
            value: -25,
            label: -25
        },
        {
            value: 0,
            label: 0
        },
        {
            value: 25,
            label: 25
        },
        {
            value: 50,
            label: 50
        },
        {
            value: 75,
            label: 75
        },
        {
            value: 100,
            label: 100
        }]
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
                    <Slider
                        orientation= "vertical"
                        value={thrusters[0].effort}
                        min={-100}
                        max={100}
                        valueLabelDisplay="on"
                        marks={marks}
                    />
                    <Slider
                        orientation= "vertical"
                        value={thrusters[1].effort}
                        min={-100}
                        max={100}
                        valueLabelDisplay="on"
                        marks={marks}
                    />
                    <Slider
                        orientation= "vertical"
                        value={thrusters[2].effort}
                        min={-100}
                        max={100}
                        valueLabelDisplay="on"
                        marks={marks}
                    />
                    <Slider
                        orientation= "vertical"
                        value={thrusters[3].effort}
                        min={-100}
                        max={100}
                        valueLabelDisplay="on"
                        marks={marks}
                    />
                    <Slider
                        orientation= "vertical"
                        value={thrusters[4].effort}
                        min={-100}
                        max={100}
                        valueLabelDisplay="on"
                        marks={marks}
                    />
                </div>


                <div key="b"
                     data-grid={{x: 4, y: 0, w: 4, h: 4}}
                     style={{height: 400}}>
                    <Slider
                        orientation= "vertical"
                        value={thrusters[0].effort}
                        min={-100}
                        max={100}
                        valueLabelDisplay="on"
                        marks={marks}
                    />
                    <Slider
                        orientation= "vertical"
                        value={thrusters[1].effort}
                        min={-100}
                        max={100}
                        valueLabelDisplay="on"
                        marks={marks}
                    />
                    <Slider
                        orientation= "vertical"
                        value={thrusters[2].effort}
                        min={-100}
                        max={100}
                        valueLabelDisplay="on"
                        marks={marks}
                    />
                    <Slider
                        orientation= "vertical"
                        value={thrusters[3].effort}
                        min={-100}
                        max={100}
                        valueLabelDisplay="on"
                        marks={marks}
                    />
                    <Slider
                        orientation= "vertical"
                        value={thrusters[4].effort}
                        min={-100}
                        max={100}
                        valueLabelDisplay="on"
                        marks={marks}
                    />
                </div>

            </GridLayout>


        </div>
    );

}

export default App;