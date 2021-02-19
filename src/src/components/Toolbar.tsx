import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import SimpleMenu from "./SimpleMenu"
import IconButton from '@material-ui/core/IconButton';

const myToolbar = (props: any) => {
    return (
        <AppBar position="static" style={{ background: '#2E3B55' }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <SimpleMenu />
                </IconButton>
                <Button variant="contained">
                    All
                </Button>
                <Button variant="contained" style={{margin: '15px'}}>
                   XY
                </Button>
                <Button variant="contained" style={{margin: '15px'}}>
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

                <Button color="secondary" style={{margin: '15px'}}>
                    Start front
                </Button>

                <Button color="secondary"style={{margin: '15px'}}>
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