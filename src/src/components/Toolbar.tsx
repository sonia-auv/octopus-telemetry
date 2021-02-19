import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"

const myToolbar = (props: any) => {
    return (
        <AppBar position="fixed" style={{ background: '#2E3B55' }}>
            <Toolbar>
                <Button variant="contained">
                    All
                </Button>
                <Button variant="contained">
                   XY
                </Button>
                <Button variant="contained">
                    Depth
                </Button>
                <Button variant="contained">
                    Roll
                </Button>
                <Button variant="contained">
                    Pitch
                </Button>
                <Button variant="contained">
                    Yaw
                </Button>

                <Button color="secondary">
                    Start front
                </Button>

                <Button color="secondary">
                    Start bottom
                </Button>
                <div style={{marginLeft: "auto"}}>
                    <Button variant="contained" color="secondary" className="right">
                        Mission switch
                    </Button>

                    <Button variant="contained" color="secondary">
                        kill switch
                    </Button>
                </div>

            </Toolbar>
        </AppBar>
    )
}

export default myToolbar