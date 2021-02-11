import React from "react";
import Slider from "@material-ui/core/Slider";


type ThrusterLevel = {
    identification: number
    effort: number,
    minMark: number,
    maxMark: number,
    step: number
}

const getMarks = (from: number, to:number, step:number) => {
    const values = [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);
    return values.map(val => ({value: val, label: val}))
}

export const Thruster = ({ identification, effort, minMark, maxMark, step }: ThrusterLevel) => {
    let markValues = getMarks(minMark, maxMark, step)
    return (
        <Slider
            orientation= "vertical"
            value={effort}
            min={minMark}
            max={maxMark}
            valueLabelDisplay="on"
            marks={markValues}
        />
    )

}

export default Thruster