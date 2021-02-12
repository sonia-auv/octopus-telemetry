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

const ThrusterControlSlider = withStyles({

    root: {
        "&.MuiSlider-vertical": {
            width: '80px',
            padding: '0px 10px',
        },
        marginLeft: '-132px',
    },

    thumb: {
        color: '#3796BF',
        width: '60px',
        height: '45px',
        borderRadius: '4px',
        "&.Mui-disabled": {
            width: '60px',
            height: '45px',
            borderRadius: '4px',
        },
    },

    vertical: {
        "& .MuiSlider-thumb": {
            marginLeft: '0px',
            marginBottom: '-20px',
            "&.Mui-disabled": {
                marginBottom: '-20px',
                marginLeft: '0px',
            }
        }
    },
    mark: {
        color: 'black',
        backgroundColor: 'black',
        opacity: 1.0,
        width: '60px',
    },
    marked: {
        "&.MuiSlider-vertical": {
            marginBottom: '30px',
            marginTop: '30px',
        },
    },
    markActive: {
        color: 'black',
        backgroundColor: 'black',
        opacity: 1.0,
        width: '60px',
    },
    rail: {
        color: 'black',
        opacity: 1.0,
        marginLeft: '30px'
    },
    track: {
        color: 'black',
        opacity: 1.0,
        marginLeft: '30px'
    },
    markLabel: {
        color: 'black',
        marginLeft: '68px'
    },
})(Slider);

const ThrusterEffortIndicator = withStyles({

    root: {
        "&.MuiSlider-vertical": {
            width: '80px',
            padding: '0px 22px',
            marginTop: '30px',
        },
    },

    thumb: {
        "&.Mui-disabled": {
            color: 'gba(37, 35, 35, 0.64)',
            width: '72px',
            height: '3px',
            borderRadius: '0px',
            "& .triangleLeft": {
                height: 0,
                width: 0,
                borderTop: '12px solid transparent',
                borderBottom: '12px solid transparent',
                borderLeft: '16px solid currentColor',
                marginRight: '38px',
                marginTop: '0px'
            },
            "& .triangleRight": {
                height: 0,
                width: 0,
                borderTop: '12px solid transparent',
                borderBottom: '12px solid transparent',
                borderRight: '16px solid currentColor',
                marginLeft: '20px',
                marginTop: '0px'
            },
        },
    },

    vertical: {
        "& .MuiSlider-thumb": {
            "&.Mui-disabled": {
                marginBottom: '0px',
                marginLeft: '-6px'
            }
        }
    },
    mark: {
        color: 'black',
        backgroundColor: 'black',
        opacity: 1.0,
        width: '60px',
        height: '3px'
    },
    marked: {
        "&.MuiSlider-vertical": {
            marginBottom: '30px',
            marginTop: '30px',
        },
    },
    markActive: {
        color: 'black',
        backgroundColor: 'black',
        opacity: 1.0,
        width: '60px',
    },
    rail: {
        color: 'black',
        opacity: 1.0,
        marginLeft: '30px'
    },
    track: {
        color: 'black',
        opacity: 1.0,
        marginLeft: '30px'
    },
    markLabel: {
        color: 'black',
        marginLeft: '80px',
        fontWeight: 'bold'
    },
})(Slider);

type ThrusterLevel = {
    identification: number
    effort: number,
    minMark: number,
    maxMark: number,
    step: number,
    thumbEnabled: boolean
}

const getMarks = (from: number, to: number, step: number) => {
    const values = [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);
    return values.map(val => ({ value: val, label: val }))
}

export const Thruster = ({ identification, effort, minMark, maxMark, step, thumbEnabled }: ThrusterLevel) => {

    // TODO: METTRE LE BON TOPIC
    const thrusterEffortPublisher = useROSTopicPublisher<any>("/provider_thruster/thruster_effort", "std_msgs/String")

    function ThrusterControlThumbComponent(props: any) {
        return (
            <span {...props}>
                {!thumbEnabled ?
                    <img src={RedButtonImg} width="100%" height="100%" /> : null
                }
            </span>
        );
    }

    function ThrusterEffortThumbComponent(props: any) {
        return (
            <span {...props}>
                <span className="triangleLeft" />
                <span className="triangleRight" />
            </span>
        );
    }

    const [value, setValue] = React.useState(1);

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);

        // TODO: FORMATAGE DES DONNES PAS CERTAIN DU FORMAT
        var msg = JSON.stringify({ ID:identification, effort:newValue})
        var toPublish = new ROSLIB.Message({
            data: msg
        })
        thrusterEffortPublisher(toPublish)
    };

    let markValues = getMarks(minMark, maxMark, step)
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container style={{ height: 'calc(100% - 120px)' }}>
                    <Grid key={0} item >
                        <h1 style={{ fontSize: '20px', marginBottom: '0px', marginLeft: '40px' }}>T{identification}</h1>
                        <ThrusterEffortIndicator
                            orientation="vertical"
                            value={effort}
                            min={minMark}
                            max={maxMark}
                            valueLabelDisplay="off"
                            disabled={true}
                            marks={marksIndicator}
                            ThumbComponent={ThrusterEffortThumbComponent}
                        />
                        <h1 style={{ fontSize: '20px', marginTop: '-10px', marginLeft: '40px' }}>{effort} %</h1>
                    </Grid>
                    <Grid key={1} item>
                        <h1 style={{ fontSize: '20px', marginBottom: '0px', marginLeft: '-104px' }}>T{identification}</h1>
                        <ThrusterControlSlider
                            orientation="vertical"
                            value={value}
                            min={minMark}
                            max={maxMark}
                            valueLabelDisplay="off"
                            marks={marks}
                            disabled={!thumbEnabled}
                            ThumbComponent={ThrusterControlThumbComponent}
                            defaultValue={0}
                            onChange={handleChange}
                        />
                        <h1 style={{ fontSize: '20px', marginTop: '-10px', marginLeft: '-104px' }}>{effort} %</h1>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

}

export default Thruster