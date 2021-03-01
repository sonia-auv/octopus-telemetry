import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useROSTopicPublisher } from '../hooks/useROSTopicPublisher'
import RedButtonImg from './image/redButton.png';
import ROSLIB from "roslib";

const marks = [
    {
        value: -75,
        label: '-75%',
    },
    {
        value: -25,
        label: '-25%',
    },
    {
        value: 25,
        label: '25%',
    },
    {
        value: 75,
        label: '75%',
    }]

const marksIndicator = [
    {
        value: -100,
        label: '-100%',
    },
    {
        value: -50,
        label: '-50%',
    },
    {
        value: 0,
        label: '0%',
    },
    {
        value: 50,
        label: '50%',
    },
    {
        value: 100,
        label: '100%',
    }]

const ThrusterEffortIndicator = withStyles({

    root: {
        width: '50px',
        padding: '10px'

    },
})(Slider);

const getMarks = (from: number, to: number, step: number) => {
    const values = [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);
    return values.map(val => ({ value: val, label: val }))
}

export const BatterieLevelIndicator = () => {


    function ThrusterEffortThumbComponent(props: any) {
        return (
            <span {...props}>
                <span className="triangleLeft" />
                <span className="triangleRight" />
            </span>
        );
    }




    return (
        <ThrusterEffortIndicator
            orientation="horizontal"
            value={30}
            min={10}
            max={50}
            disabled={true}
            ThumbComponent={ThrusterEffortThumbComponent}/>
    )

}

export default BatterieLevelIndicator