import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {withStyles} from "@material-ui/core/styles";


const TestBoardModule = () => {

    const ButtonStyle = withStyles({
        contained: {
            backgroundColor: 'lightgrey',
            border: '2px solid rgba(0, 0, 0, 1.0)'
        },

    })(Button);

    const [slave, setSlave] = React.useState("")
    const [cmd, setCmd] = React.useState("")
    const [data, setData] = React.useState("")
    const [rate, setRate] = React.useState("")
    const handleSubmit = () => {
        console.log(slave)
    }
    const handleStart = () => {
        console.log(slave)
        console.log(cmd)
        console.log(data)
        console.log(rate)
    }
    const handleStop = () => {
        console.log("Stop")
    }
    return (
        <div>
            <h1>Test board</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField id="outlined-basic"
                               label="Slave"
                               variant="outlined"
                               name="slave"
                               type="number"
                               value={slave}
                               style={{margin: '5px'}}
                               onChange={(event)=>setSlave(event.target.value)}/>
                </div>
                <div>
                    <TextField id="outlined-basic"
                               label="Cmd"
                               variant="outlined"
                               name="cmd"
                               value={cmd}
                               style={{margin: '5px'}}
                               onChange={(event)=>setCmd(event.target.value)} />
                </div>
                <div>
                    <TextField id="outlined-basic"
                               label="Data"
                               variant="outlined"
                               name="data"
                               style={{margin: '5px'}}
                               value={data}
                               onChange={(event)=>setData(event.target.value)} />
                </div>
                <div>
                    <TextField id="outlined-basic"
                               label="Rate"
                               variant="outlined"
                               name="rate"
                               value={rate}
                               type="number"
                               style={{margin: '5px'}}
                               onChange={(event)=>setRate(event.target.value)} />
                </div>
                <div>
                    <ButtonStyle variant='contained' style={{ fontSize: '20px', alignSelf: 'center' }}
                                 onClick={handleStart}>
                        Start
                    </ButtonStyle>
                </div>
                <div>
                    <ButtonStyle variant='contained' style={{ fontSize: '20px', alignSelf: 'center' }}
                                 onClick={handleStop}>
                        Stop
                    </ButtonStyle>
                </div>
            </form>
        </div>
    )
}
export default TestBoardModule