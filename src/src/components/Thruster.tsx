import React, { useContext } from "react";
import ThrusterControlSlider from "./common/slider/ThrusterControlSlider";
import ThrusterEffortIndicatorSlider from "./common/slider/ThrusterEffortIndicatorSlider";
import Grid from '@material-ui/core/Grid';
import { useROSTopicPublisher, MessageFactory } from '../hooks/useROSTopicPublisher'
import RedButtonImg from './image/redButton.png';
import { GeneralContext } from "../context/generalContext";

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


type ThrusterLevel = {
    identification: number
    effort: number,
    minMark: number,
    maxMark: number,
    step: number,
    thumbEnabled: boolean
}

export const Thruster = ({ identification, effort, minMark, maxMark, step, thumbEnabled }: ThrusterLevel) => {

    const context = useContext(GeneralContext)

    // TODO: METTRE LE BON TOPIC
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

        // TODO: FORMATAGE DES DONNES PAS CERTAIN DU FORMAT
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
                            handlerChange={handleChange}
                        />
                        <h1 style={{ fontSize: '20px', marginTop: '-10px', marginLeft: '-104px' }}>{effort} %</h1>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

}

export default Thruster