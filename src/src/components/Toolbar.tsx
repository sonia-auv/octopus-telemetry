import React, {useCallback} from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import SimpleMenu from "./SimpleMenu"
import IconButton from '@material-ui/core/IconButton';
import { useROSService } from '../hooks/useROSService'
import ROSLIB from "roslib";


const ToolbarModule = () => {
    const toolbarServiceCallback = useCallback(
        (x: any) => {
        }, []
    )

    //TODO Verifier le message type
    const toolbarServicesCall = useROSService<any>(toolbarServiceCallback, "/proc_control/enable_control", "enable_controls")

    let handleAllAxisClicked = () => {
        const request = new ROSLIB.ServiceRequest({
            X: 1,
            Y:1,
            Z: 1,
            PITCH: 1,
            ROLL: 1,
            YAW: 1
        });
        toolbarServicesCall(request)
    }

    let handleXYAxisClicked = () => {
        const request = new ROSLIB.ServiceRequest({
            X: 1,
            Y:1,
            Z: -1,
            PITCH: -1,
            ROLL: -1,
            YAW: -1
        });
        toolbarServicesCall(request)
    }

    let handleDepthAxisClicked = () => {
        const request = new ROSLIB.ServiceRequest({
            X:- 1,
            Y: -1,
            Z: 1,
            PITCH: -1,
            ROLL: -1,
            YAW: -1
        });
        toolbarServicesCall(request)
    }

    let handleRollAxisClicked = () => {
        const request = new ROSLIB.ServiceRequest({
            X: -1,
            Y: -1,
            Z: -1,
            PITCH: -1,
            ROLL: 1,
            YAW: -1
        });
        toolbarServicesCall(request)
    }

    let handleYawAxisClicked = () => {
        const request = new ROSLIB.ServiceRequest({
            X: -1,
            Y: -1,
            Z: -1,
            PITCH: -1,
            ROLL: -1,
            YAW: 1
        });
        toolbarServicesCall(request)
    }

    let handlePitchAxisClicked = () => {
        const request = new ROSLIB.ServiceRequest({
            X:- 1,
            Y: -1,
            Z: -1,
            PITCH: 1,
            ROLL: -1,
            YAW: -1
        });
        toolbarServicesCall(request)
    }

    let handleStartFrontCameraClicked = () => {
        console.log("Start front camera was clicked")
    }

    let handleStartBottomCameraClicked = () => {
        console.log("Start bottom camera was clicked")
    }

    return (
        <AppBar position="static" style={{ background: '#2E3B55' }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <SimpleMenu />
                </IconButton>
                <Button variant="contained" onClick={handleAllAxisClicked}>
                    All
                </Button>
                <Button variant="contained" style={{margin: '15px'}} onClick={handleXYAxisClicked}>
                   XY
                </Button>
                <Button variant="contained" style={{margin: '15px'}} onClick={handleDepthAxisClicked}>
                    Depth
                </Button>
                <Button variant="contained" style={{margin: '15px'}} onClick={handleRollAxisClicked}>
                    Roll
                </Button>
                <Button variant="contained" style={{margin: '15px'}} onClick={handlePitchAxisClicked}>
                    Pitch
                </Button>
                <Button variant="contained" style={{margin: '15px'}} onClick={handleYawAxisClicked}>
                    Yaw
                </Button>

                <Button color="secondary" style={{margin: '15px'}} onClick={handleStartFrontCameraClicked}>
                    Start front
                </Button>

                <Button color="secondary"style={{margin: '15px'}} onClick={handleStartBottomCameraClicked}>
                    Start bottom
                </Button>
                <div style={{marginLeft: "auto"}}>
                    <Button variant="contained" color="secondary" className="right"style={{margin: '15px'}}>
                        Mission switch
                    </Button>

                    <Button variant="contained" color="secondary" style={{margin: '15px'}}>
                        kill switch
                    </Button>
                </div>

            </Toolbar>
        </AppBar>
    )
}

export default ToolbarModule