import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
import { withStyles } from '@material-ui/core/styles';
import LabelAndValueModule from "./LabelAndValueModule";

const ThrusterEffortIndicator = withStyles({

    root: {
        height: '0px',
        width: '100px',
        backgroundImage: 'linear-gradient(to right, red,yellow,green)'

    },
    thumb: {
        "&.Mui-disabled": {
            transform: 'rotate(90deg)',
            width: '40px',
            height: '10px',
            borderRadius: '0px',
        }
    },
    track:{
        background: 'transparent'
    },
    rail:{
        background: 'transparent'
    }
})(Slider);

export const BatterieLevelIndicator = (props: any) => {

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridGap: '20px',
            margin: 'auto'}}>
            <div>
                <LabelAndValueModule
                    label={props.label}
                    value={props.value}
                    unit={props.unit}

                />
            </div>

            <div style={{margin: 'auto'}}>
                <ThrusterEffortIndicator
                    orientation="horizontal"
                    value= {props.value}
                    min={0}
                    max={28}
                    disabled={true} />
            </div>
        </div>

    )

}

export default BatterieLevelIndicator