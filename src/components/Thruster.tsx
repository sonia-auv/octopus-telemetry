import React from "react";

import ThrusterControlSlider from "./common/slider/ThrusterControlSlider";
import ThrusterEffortIndicatorSlider from "./common/slider/ThrusterEffortIndicatorSlider";
import Grid from './common/grid/Grid';
import RedButtonImg from './image/redButton.png';

import { useROSTopicPublisher, MessageFactory } from '../hooks/useROSTopicPublisher'

const marks = [
    {
        value: -38,
        label: '-38 N',
    },
    {
        value: -12,
        label: '-12 N',
    },
    {
        value: 12,
        label: '12 N',
    },
    {
        value: 38,
        label: '38 N',
    }]

const marksIndicator = [
    {
        value: -50,
        label: '-50 N',
    },
    {
        value: -25,
        label: '-25 N',
    },
    {
        value: 0,
        label: '0 N',
    },
    {
        value: 25,
        label: '25 N',
    },
    {
        value: 50,
        label: '50 N',
    }]


type ThrusterLevel = {
    identification: number
    effort: number,
    pwm: number,
    minMark: number,
    maxMark: number,
    step: number,
    thumbEnabled: boolean
}

export const Thruster = ({ identification, effort, pwm,  minMark, maxMark, step, thumbEnabled }: ThrusterLevel) => {

    const thrusterEffortPublisher = useROSTopicPublisher<any>("/provider_thruster/thruster_effort", "std_msgs/String")

    function ThrusterControlThumbComponent(props: any) {
        return (
            <span {...props}>
                {!thumbEnabled ?
                    <img src={RedButtonImg} width="100%" height="100%" alt="thumb" /> : null
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

        // TODO: Check data formating ? may be just use var toPublish = { ID: identification, effort: newValue } and no need stringify?
        var msg = JSON.stringify({ ID: identification, effort: newValue })
        var toPublish = MessageFactory({
            data: msg
        })
        thrusterEffortPublisher(toPublish)
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container style={{ height: 'calc(100% - 120px)' }}>
                    <Grid key={0} item >
                        <h1 style={{ fontSize: '20px', marginBottom: '0px', marginLeft: '40px' }}>T{identification}</h1>
                        <ThrusterEffortIndicatorSlider
                            orientation="vertical"
                            value={effort}
                            min={minMark}
                            max={maxMark}
                            valueLabelDisplay="off"
                            disabled={true}
                            marks={marksIndicator}
                            ThumbComponent={ThrusterEffortThumbComponent}
                            handlerChange={() => { }}
                        />
                        <h1 style={{ fontSize: '15px', marginTop: '-25px', marginLeft: '40px' }}>{effort} N</h1>
                        <h1 style={{ fontSize: '15px', marginTop: '-10px', marginLeft: '15px' }}>PWM: {pwm} </h1>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

}

export default Thruster