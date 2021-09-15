import React from 'react';

import Button from './common/button/Button';
import TextField from './common/textfield/Textfield';
import Checkbox from './common/Checkbox/Checkbox'
import FormControlLabel from './common/Form/FormControlLabel';

import { useROSTopicPublisher, MessageFactory } from "../hooks/useROSTopicPublisher";

const TestBoardModule = () => {

    const [slave, setSlave] = React.useState("")
    const [cmd, setCmd] = React.useState("")
    const [data, setData] = React.useState("")
    const [rate, setRate] = React.useState("")
    const [isSingleSend, setIsSingleSend] = React.useState(true)
    let intervalVar: any
    const testBoardPublisher = useROSTopicPublisher<any>("/interface_rs485/dataRx", "sonia_common/SendRS485Msg")

    const handleStart = () => {

        let toPublish = MessageFactory({
            slave: slave,
            cmd: +cmd,
            data: data
        })
        if (!isSingleSend && rate > '0') {
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
        <div style={{ width: '100%', height: '100%', flexDirection: 'row', textAlign: 'center' }}>
            <h1>Test board</h1>
            <form>
                <div>
                    <TextField testId="outlined-basic-01"
                        label="Slave"
                        name="slave"
                        type="number"
                        value={slave}
                        style={{ margin: '5px', color: 'red' }}
                        color="secondary"
                        handlerChange={(event) => setSlave(event.target.value)}
                        handlerKeyDown={() => { }}
                        autoFocus={true}
                    />
                </div>
                <div>
                    <TextField testId="outlined-basic-02"
                        label="Cmd"
                        name="cmd"
                        type="number"
                        value={cmd}
                        style={{ margin: '5px' }}
                        handlerChange={(event) => setCmd(event.target.value)}
                        handlerKeyDown={() => { }}
                        autoFocus={true}
                    />
                </div>
                <div>
                    <TextField testId="outlined-basic-03"
                        label="Data"
                        name="data"
                        style={{ margin: '5px' }}
                        value={data}
                        handlerChange={(event) => setData(event.target.value)}
                        handlerKeyDown={() => { }}
                        autoFocus={true}
                    />
                </div>
                <div>
                    <TextField testId="outlined-basic-04"

                        label="Rate"
                        name="rate"
                        value={rate}
                        type="number"
                        style={{ margin: '5px' }}
                        handlerChange={(event) => setRate(event.target.value)}
                        handlerKeyDown={() => { }}
                        autoFocus={true}
                    />
                </div>
                <div style={{ margin: "5px" }}>
                    <FormControlLabel
                        control={<Checkbox checked={isSingleSend} handler={handleSingleCheck} name="checkedA" />}
                        label="Single send"
                    />
                </div>
                <div style={{ margin: "5px" }}>
                    <Button label="Start" style={{ fontSize: '20px', alignSelf: 'center' }}
                        handler={handleStart} />
                </div>
                <div style={{ margin: "5px" }}>
                    <Button label="Stop" style={{ fontSize: '20px', alignSelf: 'center' }}
                        handler={handleStop} />
                </div>
            </form>
        </div>
    )
}
export default TestBoardModule