import { useCallback, useContext, useState } from 'react';
import Switch from './Switch';
import { GeneralContext } from "../context/generalContext";
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { useROSService } from '../hooks/useROSService'
import ROSLIB from "roslib";
import { useROSTopicSubscriber } from "../hooks/useROSTopicSubscriber";

const Waypoints = () => {

    const ButtonStyle = withStyles({
        contained: {
            backgroundColor: 'lightgrey',
            border: '2px solid rgba(0, 0, 0, 1.0)'
        },

    })(Button);

    const context = useContext(GeneralContext)

    //////////////////////////////////////
    // CONTROL MODE
    //////////////////////////////////////

    // Reponse en retour a l appel du service
    const controlModeServiceCallback = useCallback(
        (x: any) => {
        }, []
    )

    // FORMATAGE DU MESSAGE A ENVOYER AU SERVICE A VERIFIER
    const HandleChangeSwitch = (value: any) => {

        context.setIsWayPointVelocityMode(!context.isWayPointVelocityMode)
        var mode
        if (!context.isWayPointVelocityMode)
            mode = 0
        if (!context.isWayPointVelocityMode)
            mode = 2

        var request = new ROSLIB.ServiceRequest({
            MODE: mode,
        });
        controlModeServiceCall(request)
    }

    const controlModeServiceCall = useROSService<any>(controlModeServiceCallback, "/proc_control/set_control_mode", "proc_control")

    //////////////////////////////////////
    // CLEAR WAYPOINT
    //////////////////////////////////////

    // Reponse en retour a l appel du service
    const clearWaypointServiceCallback = useCallback(
        (x: any) => {
        }, []
    )

    // FORMATAGE DU MESSAGE A ENVOYER AU SERVICE A VERIFIER
    const handleClearWayPoint = (value: any) => {

        var request = new ROSLIB.ServiceRequest({
        });
        clearWayPointServiceCall(request)
    }

    const clearWayPointServiceCall = useROSService<any>(clearWaypointServiceCallback, "/proc_control/clear_waypoint", "proc_control")

    //////////////////////////////////////
    // SET INITIAL POSITION
    //////////////////////////////////////

    // Reponse en retour a l appel du service
    const setInitialPositionServiceCallback = useCallback(
        (x: any) => {
        }, []
    )

    // FORMATAGE DU MESSAGE A ENVOYER AU SERVICE A VERIFIER
    const handleSetInitialPosition = (value: any) => {

        var request = new ROSLIB.ServiceRequest({
        });
        setInitialPositionServiceCall(request)

        // Send clear waypoint with 500 ms delay
        setTimeout(handleClearWayPoint, 500)

    }

    const setInitialPositionServiceCall = useROSService<any>(setInitialPositionServiceCallback, "/proc_navigation/set_world_x_y_offset", "proc_navigation")

    const checkSyntax = (v: any) => [...v].every(c => '0123456789.-'.includes(c));

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

    //////////////////////////////////////
    // SEND TARGET POSITIONS
    //////////////////////////////////////

    // Reponse en retour a l appel du service
    const sendPositionTargetServiceCallback = useCallback(
        (x: any) => {
        }, []
    )

    const sendPositionTargetServiceCall = useROSService<any>(sendPositionTargetServiceCallback, "/proc_control/set_global_target", "proc_control")

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

            //Depth is limited to 3
            if (finalZ > 3)
            {
                finalZ = 3
                setLastValidCmdZ('3.0')
                setCmdZ('3.0')
            }

            // FORMATAGE DU MESSAGE A ENVOYER AU SERVICE A VERIFIER
            var request = new ROSLIB.ServiceRequest({
                X: finalX,
                Y: finalY,
                Z: finalZ,
                ROLL: finalRoll,
                PICH: finalPitch,
                YAW: finalYaw
            });
            sendPositionTargetServiceCall(request)

        }
    }

    /////////////////////////////////////
    // CONTROL MODE FEEDBACK
    /////////////////////////////////////

    const controlModeCallback = useCallback(
        (x: any) => {

            if (x.data == 0)
                context.setIsWayPointVelocityMode(false)

            if (x.data == 2)
                context.setIsWayPointVelocityMode(true)

        }, []
    )

    useROSTopicSubscriber<any>(controlModeCallback, "/proc_control/control_mode", "std_msgs/UInt8")

    /////////////////////////////////////
    // POSITION TARGET FEEDBACK
    /////////////////////////////////////

    const positionTargetFeedBackCallback = useCallback(
        (x: any) => {

            setCmdX(x.position.x.toFixed(2)) 
            setLastValidCmdX(x.position.x.toFixed(2)) 

            setCmdY(x.position.y.toFixed(2)) 
            setLastValidCmdY(x.position.y.toFixed(2)) 

            setCmdZ(x.position.z.toFixed(2)) 
            setLastValidCmdZ(x.position.z.toFixed(2)) 

            setCmdRoll(x.orientation.x.toFixed(2)) 
            setLastValidCmdRoll(x.orientation.x.toFixed(2)) 

            setCmdPitch(x.orientation.y.toFixed(2)) 
            setLastValidCmdPitch(x.orientation.y.toFixed(2)) 

            setCmdYaw(x.orientation.z.toFixed(2)) 
            setLastValidCmdYaw(x.orientation.z.toFixed(2)) 

        }, []
    )

    const velocityTargetFeedBackCallback = useCallback(
        (x: any) => {

            setCmdX(x.linear.x.toFixed(2)) 
            setLastValidCmdX(x.linear.x.toFixed(2)) 

            setCmdY(x.linear.y.toFixed(2)) 
            setLastValidCmdY(x.linear.y.toFixed(2)) 

            setCmdZ(x.linear.z.toFixed(2)) 
            setLastValidCmdZ(x.linear.z.toFixed(2)) 

            setCmdRoll(x.angular.x.toFixed(2)) 
            setLastValidCmdRoll(x.angular.x.toFixed(2)) 

            setCmdPitch(x.angular.y.toFixed(2)) 
            setLastValidCmdPitch(x.angular.y.toFixed(2)) 

            setCmdYaw(x.angular.z.toFixed(2)) 
            setLastValidCmdYaw(x.angular.z.toFixed(2)) 

        }, []
    )

    useROSTopicSubscriber<any>(positionTargetFeedBackCallback, "/proc_control/current_target", "geometry_msgs/Pose")
    useROSTopicSubscriber<any>(velocityTargetFeedBackCallback, "/proc_control/current_target_velocity", "geometry_msgs/Twist")

    return (
        <GeneralContext.Consumer>
            {context => context && (
                <div style={{ width: '100%', height: '100%', flexDirection: 'row', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '20px', textAlign: 'center' }}>Waypoints</h1>
                    <ButtonStyle variant='contained' style={{ width: '150px', fontSize: '10px', alignSelf: 'center' }} onClick={handleClearWayPoint}>Clear Waypoint</ButtonStyle>
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
