import React, { useState, useEffect, useCallback} from "react";
import Slider from "@material-ui/core/Slider";


type ThrusterLevel = {
    id: number
    level: number,
}

export const Thruster = ({ id, level }: ThrusterLevel) => {



    const style = { height: 'calc(100% - 55px)' };
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
        <Slider
            orientation= "vertical"
            value={level}
            min={-100}
            max={100}
            valueLabelDisplay="on"
            marks={marks}
        />
    )

}

export default Thruster