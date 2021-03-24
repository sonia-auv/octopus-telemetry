import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox'
import {withStyles} from "@material-ui/core/styles";
import {useROSTopicPublisher} from "../hooks/useROSTopicPublisher";
import FormControlLabel from '@material-ui/core/FormControlLabel';


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
    const [isSingleSend, setIsSingleSend] = React.useState(true)
    let intervalVar: any
    const testBoardPublisher = useROSTopicPublisher<any>("/interface_rs485/dataRx", "sonia_common/SendRS485Msg")

    const handleStart = () => {
        let toPublish = {
            slave: slave,
            cmd: cmd,
            data: data
        }
        if(!isSingleSend){
            console.log("Continuous publishing...")
            intervalVar = setInterval(function () {
                testBoardPublisher(toPublish)
          }, parseInt(rate))

        }
        else {
            testBoardPublisher(toPublish)
        }
    }
    const handleStop = () => {
        console.log("Continuous publishing stopped...")
        clearInterval(intervalVar)
    }
    const handleSingleCheck = () => {
        setIsSingleSend(!isSingleSend)
    }
    return (
        <div>
            <h1>Test board</h1>
            <form>
                <div>
                    <TextField id="outlined-basic-01"
                               label="Slave"
                               variant="outlined"
                               name="slave"
                               type="number"
                               value={slave}
                               style={{margin: '5px'}}
                               onChange={(event)=>setSlave(event.target.value)}/>
                </div>
                <div>
                    <TextField id="outlined-basic-02"
                               label="Cmd"
                               variant="outlined"
                               name="cmd"
                               value={cmd}
                               style={{margin: '5px'}}
                               onChange={(event)=>setCmd(event.target.value)} />
                </div>
                <div>
                    <TextField id="outlined-basic-03"
                               label="Data"
                               variant="outlined"
                               name="data"
                               style={{margin: '5px'}}
                               value={data}
                               onChange={(event)=>setData(event.target.value)} />
                </div>
                <div>
                    <TextField id="outlined-basic-04"
                               label="Rate"
                               variant="outlined"
                               name="rate"
                               value={rate}
                               type="number"
                               style={{margin: '5px'}}
                               onChange={(event)=>setRate(event.target.value)} />
                </div>
                <div style={{margin: "5px"}}>
                    <FormControlLabel
                        control={<Checkbox checked={isSingleSend} onChange={handleSingleCheck} name="checkedA" />}
                        label="Single send"
                    />
                </div>
                <div style={{margin: "5px"}}>
                    <ButtonStyle variant='contained' style={{ fontSize: '20px', alignSelf: 'center' }}
                                 onClick={handleStart}>
                        Start
                    </ButtonStyle>
                </div>
                <div style={{margin: "5px"}}>
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