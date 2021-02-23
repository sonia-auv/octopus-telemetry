import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import SimpleMenu from "./SimpleMenu"
import IconButton from '@material-ui/core/IconButton';

let handleAllAxisClicked = () => {
    console.log("All axis is clicked")
}

let handleXYAxisClicked = () => {
    console.log("XY axis was clicked")
}

let handleDepthAxisClicked = () => {
    console.log("Z axis was clicked")
}

let handleStartFrontCameraClicked = () => {
    console.log("Start front camera was clicked")
}

let handleStartBottomCameraClicked = () => {
    console.log("Start bottom camera was clicked")
}

const myToolbar = (props: any) => {

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
                <Button variant="contained" style={{margin: '15px'}}>
                    Roll
                </Button>
                <Button variant="contained" style={{margin: '15px'}}>
                    Pitch
                </Button>
                <Button variant="contained" style={{margin: '15px'}}>
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

export default myToolbar