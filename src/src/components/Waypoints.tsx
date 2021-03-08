import React, { useCallback, useContext, useState } from 'react';
import Switch from './Switch';
import { GeneralContext } from "../context/generalContext";
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { useROSService } from '../hooks/useROSService'
import ROSLIB from "roslib";
import { isNumber } from 'util';

const Waypoints = () => {

    const ButtonStyle = withStyles({
        contained: {
            backgroundColor: 'lightgrey',
            border: '2px solid rgba(0, 0, 0, 1.0)'
        },

    })(Button);

    // Reponse en retour a l appel du service
    const actuactorServiceCallback = useCallback(
        (x: any) => {
        }, []
    )

    const context = useContext(GeneralContext)
    const actuactorServiceCall = useROSService<any>(actuactorServiceCallback, "/provider_actuators/do_action_srv", "provider_actuators")

    // FORMATAGE DU MESSAGE A ENVOYER AU SERVICE A VERIFIER
    const HandleChangeSwitch = (value: any) => {

        context.setIsWayPointVelocityMode(!context.isWayPointVelocityMode)
        var request = new ROSLIB.ServiceRequest({
            ELEMENT_ARM: 2,
            ARM_OPEN: !value,
            ACTION_ARM_EXEC: 1
        });
        actuactorServiceCall(request)
    }

    // FORMATAGE DU MESSAGE A ENVOYER AU SERVICE A VERIFIER
    const handleClearWaypoint = () => {
        var request = new ROSLIB.ServiceRequest({
            ELEMENT_TORPEDO: 1,
            SIDE_PORT: 0,
            ACTION_DROPPER_LAUCH: 1
        });
        actuactorServiceCall(request)
    }

    // FORMATAGE DU MESSAGE A ENVOYER AU SERVICE A VERIFIER
    const handleSetInitialPosition = () => {
        var request = new ROSLIB.ServiceRequest({
            ELEMENT_TORPEDO: 1,
            SIDE_PORT: 0,
            ACTION_DROPPER_LAUCH: 1
        });
        actuactorServiceCall(request)
    }

    const checkSyntax = (v: any) => [...v].every(c => '0123456789.'.includes(c));

    const [cmdX, setCmdX] = useState('0.00');
    const [lastValidCmdX, setLastValidCmdX] = useState('0.00');
    const [cmdY, setCmdY] = useState('0.00');
    const [lastValidCmdY, setLastValidCmdY] = useState('0.00');
    const [cmdZ, setCmdZ] = useState('0.00');
    const [lastValidCmdZ, setLastValidCmdZ] = useState('0.00');
    const [cmdRoll, setCmdRoll] = useState('0.00');
    const [lastValidCmdRoll, setLastValidCmdRoll] = useState('0.00');
    const [cmdPitch, setCmdPitch] = useState('0.00');
    const [lastValidCmdPitch, setLastValidCmdPitch] = useState('0.00');
    const [cmdYaw, setCmdYaw] = useState('0.00');
    const [lastValidCmdYaw, setLastValidCmdYaw] = useState('0.00');

    const handleCmdXChange = (e: any) => {
        if (checkSyntax(e.target.value)) {
            setCmdX(e.target.value)
        }
    }

    const handleCmdYChange = (e: any) => {
        if (checkSyntax(e.target.value)) {
            setCmdY(e.target.value)
        }
    }

    const handleCmdZChange = (e: any) => {
        if (checkSyntax(e.target.value)) {
            setCmdZ(e.target.value)
        }
    }

    const handleCmdRollChange = (e: any) => {
        if (checkSyntax(e.target.value)) {
            setCmdRoll(e.target.value)
        }
    }

    const handleCmdPitchChange = (e: any) => {
        if (checkSyntax(e.target.value)) {
            setCmdPitch(e.target.value)
        }
    }

    const handleCmdYawChange = (e: any) => {
        if (checkSyntax(e.target.value)) {
            setCmdYaw(e.target.value)
        }
    }

    const handleCmdKeyDown = (e: any) => {

        if (e.key === 'Enter') {
            
            // Handle command X axis
            var x = parseFloat(cmdX)
            var finalX
            if (!isNaN(x)) {
                //Input is valid
                setLastValidCmdX(cmdX)
                finalX = cmdX
            } else {
                //Use last valid value instead
                finalX = parseFloat(lastValidCmdX)
            }

            // Handle command Y axis
            var y = parseFloat(cmdY)
            var finalY
            if (!isNaN(y)) {
                //Input is valid
                setLastValidCmdY(cmdY)
                finalY = cmdY
            } else {
                //Use last valid value instead
                finalY = parseFloat(lastValidCmdY)
            }

            // Handle command Z axis
            var z = parseFloat(cmdZ)
            var finalZ
            if (!isNaN(z)) {
                //Input is valid
                setLastValidCmdZ(cmdZ)
                finalZ = cmdZ
            } else {
                //Use last valid value instead
                finalZ = parseFloat(lastValidCmdZ)
            }

            // Handle command Roll axis
            var roll = parseFloat(cmdRoll)
            var finalRoll
            if (!isNaN(roll)) {
                //Input is valid
                setLastValidCmdRoll(cmdRoll)
                finalRoll = cmdRoll
            } else {
                //Use last valid value instead
                finalRoll = parseFloat(lastValidCmdRoll)
            }

            // Handle command Pitch axis
            var pitch = parseFloat(cmdPitch)
            var finalPitch
            if (!isNaN(pitch)) {
                //Input is valid
                setLastValidCmdPitch(cmdPitch)
                finalPitch = cmdPitch
            } else {
                //Use last valid value instead
                finalPitch = parseFloat(lastValidCmdPitch)
            }

            // Handle command Yaw axis
            var yaw = parseFloat(cmdYaw)
            var finalYaw
            if (!isNaN(yaw)) {
                //Input is valid
                setLastValidCmdYaw(cmdYaw)
                finalYaw = cmdYaw
            } else {
                //Use last valid value instead
                finalYaw = parseFloat(lastValidCmdYaw)
            }

            console.log(finalX)
            console.log(finalY)
            console.log(finalZ)
            console.log(finalRoll)
            console.log(finalPitch)
            console.log(finalYaw)

        }
    }

    return (
        <GeneralContext.Consumer>
            {context => context && (
                <div style={{ width: '100%', height: '100%', flexDirection: 'row', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '20px', textAlign: 'center' }}>Waypoints</h1>
                    <ButtonStyle variant='contained' style={{ width: '150px', fontSize: '10px', alignSelf: 'center' }} onClick={handleClearWaypoint}>Clear Waypoint</ButtonStyle>
                    <ButtonStyle variant='contained' style={{ marginLeft: '50px', width: '150px', fontSize: '10px', alignSelf: 'center' }} onClick={handleSetInitialPosition}>Set initial Position</ButtonStyle>
                    <Switch onLabel="Velocity"
                        offLabel="Position"
                        vertical={false}
                        value={!context.isWayPointVelocityMode}
                        handler={HandleChangeSwitch} />
                    <div style={{ padding: '10px 10px', border: '1px solid lightgray', width: '150px', float: 'left' }}>Command<br></br>
                        <TextField value={cmdX} onChange={handleCmdXChange} onKeyDown={handleCmdKeyDown} id="waypoint_cmdx_id" label="X" variant="outlined" style={{ padding: '10px 10px' }} /><br></br>
                        <TextField value={cmdY} onChange={handleCmdYChange} onKeyDown={handleCmdKeyDown} id="waypoint_cmdy_id" label="Y" variant="outlined" style={{ padding: '10px 10px' }} /><br></br>
                        <TextField value={cmdZ} onChange={handleCmdZChange} onKeyDown={handleCmdKeyDown} id="waypoint_cmdz_id" label="Z" variant="outlined" style={{ padding: '10px 10px' }} />
                    </div>
                    <div style={{ padding: '10px 10px', border: '1px solid lightgray', width: '150px', float: 'right' }}>Command<br></br>
                        <TextField value={cmdRoll} onChange={handleCmdRollChange} onKeyDown={handleCmdKeyDown} id="waypoint_cmdroll_id" label="Roll" variant="outlined" style={{ padding: '10px 10px' }} /><br></br>
                        <TextField value={cmdPitch} onChange={handleCmdPitchChange} onKeyDown={handleCmdKeyDown} id="waypoint_cmdpitch_id" label="Pitch" variant="outlined" style={{ padding: '10px 10px' }} /><br></br>
                        <TextField value={cmdYaw} onChange={handleCmdYawChange} onKeyDown={handleCmdKeyDown} id="waypoint_cmdyaw_id" label="Yaw" variant="outlined" style={{ padding: '10px 10px' }} />
                    </div>
                </div>
            )}
        </GeneralContext.Consumer>
    );
};

export default Waypoints;
