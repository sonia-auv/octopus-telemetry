import { useState } from 'react';
import Switch from './common/switch/Switch';
import { GeneralContext } from "../context/generalContext";
import Button from './common/button/Button';
import Select from './common/select/Select';
import InputLabel from './common/Input/InputLabel';
import FormControl from './common/Form/FormControl';
import TextField from './common/textfield/Textfield';

import { useROSTopicPublisher, MessageFactory } from '../hooks/useROSTopicPublisher';

const Waypoints = () => {

    let frame0 = {value: "Abs. position & Abs. angle"};
    let frame1 = {value: "Rel. position & Rel. angle"};
    let frame2 = {value: "Rel. position & Abs. angle"};
    let frame3 = {value: "Abs. position & Rel. angle"};

    const [isRotationMode, setIsRotationMode] = useState(false);
    const [allFrames] = useState([frame0, frame1, frame2, frame3]);
    const [currentFrameSelected, setCurrentMissionName] = useState("");

    const [cmdX, setCmdX] = useState('0.00');
    const [cmdY, setCmdY] = useState('0.00');
    const [cmdZ, setCmdZ] = useState('0.00');
    const [cmdRoll, setCmdRoll] = useState('0.00');
    const [cmdPitch, setCmdPitch] = useState('0.00');
    const [cmdYaw, setCmdYaw] = useState('0.00');
    const [cmdFrame, setCmdFrame] = useState('0');
    const [cmdSpeed, setCmdSpeed] = useState('1');
    const [cmdFine, setCmdFine] = useState('0.00');

    const setInitialPositionPublisher = useROSTopicPublisher<any>("/proc_simulation/start_simulation", "geometry_msgs/Pose")
    const sendPositionTargetPublisher = useROSTopicPublisher<any>("/proc_control/add_pose", "sonia_common/AddPose")

    const checkSyntax = (v: any) => [...v].every(c => '0123456789.-'.includes(c));

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

    const handleCmdFrameChange = (e: any) => {
        setCurrentMissionName(e.target.value as string);
        if(e.target.value === frame0.value || e.target.value === "None"){
            setCmdFrame('0')
        }
        else if(e.target.value === frame1.value){
            setCmdFrame('1')
        }
        else if(e.target.value === frame2.value){
            setCmdFrame('2')
        }
        else if(e.target.value === frame3.value){
            setCmdFrame('3')
        } 
    }

    const handleCmdSpeedChange = (e: any) => {
        if (checkSyntax(e.target.value)) {
            setCmdSpeed(e.target.value)
        }
    }

    const handleCmdFineChange = (e: any) => {
        if (checkSyntax(e.target.value)) {
            setCmdFine(e.target.value)
        }
    }

    const addPoseHandler = () => 
    {
        let z_axis_problem = false;
        var xVal = !isNaN(parseFloat(cmdX)) ? parseFloat(cmdX) : parseFloat('0.0');
        var yVal = !isNaN(parseFloat(cmdY)) ? parseFloat(cmdY) : parseFloat('0.0');
        var zVal = !isNaN(parseFloat(cmdZ)) ? parseFloat(cmdZ) : parseFloat('0.0');
        if(zVal > 3.0){ z_axis_problem = true; }
        var rollVal = !isNaN(parseFloat(cmdRoll)) ? parseFloat(cmdRoll) : parseFloat('0.0');
        var pitchVal = !isNaN(parseFloat(cmdPitch)) ? parseFloat(cmdPitch) : parseFloat('0.0');
        var yawVal = !isNaN(parseFloat(cmdYaw)) ? parseFloat(cmdYaw) : parseFloat('0.0');
        var frameVal = !isNaN(parseInt(cmdFrame)) ? parseInt(cmdFrame) : parseInt('0');
        var speedVal = !isNaN(parseInt(cmdSpeed)) ? parseInt(cmdSpeed) : parseInt('5');
        var fineVal = !isNaN(parseFloat(cmdFine)) ? parseFloat(cmdFine) : parseFloat('0.0');
        if(z_axis_problem){
            alert("Depth too high.");
        }
        else{
            let toPublish = MessageFactory({
                position: {
                    x: xVal, y: yVal, z: zVal,
                },
                orientation:{
                    x: rollVal, y: pitchVal, z: yawVal,
                },
                frame: frameVal,
                speed: speedVal,
                fine: fineVal,
                rotation: isRotationMode
            });
            sendPositionTargetPublisher(toPublish);
            resetCommands();
        }
    }

     const resetCommands = () => {
         setCmdX('0.00');
         setCmdY('0.00');
         setCmdZ('0.00');
         setCmdRoll('0.00');
         setCmdPitch('0.00');
         setCmdYaw('0.00');
         setCmdSpeed('5');
         setCmdFine('0.00');
     }


    
    const setInitialPositionHandler = () => {
        var toPublish = MessageFactory({
            position:{
                x: 0.0,
                y: 0.0,
                z: 0.0
            },
            orientation:{
                x: 0.0,
                y: 0.0,
                z: 0.0,
                w: 1.0
            }
        });
        setInitialPositionPublisher(toPublish)
    }

    return (
        <GeneralContext.Consumer>
            {context => context && (
                <div style={{ width: '100%', height: '100%', flexDirection: 'row', textAlign: 'center', alignContent: 'center' }}>
                    <h1 style={{ fontSize: '20px', textAlign: 'center' }}>Waypoints</h1>
                    {/* Remove disabled to make the button usable. */}
                    <Button style={{ width: '150px', marginBottom: '10px', fontSize: '10px', alignSelf: 'center' }} disabled={true} handler={()=>{}} label="Clear Waypoint" /> 
                    <Button style={{ marginLeft: '10px', marginBottom: '10px', width: '150px', fontSize: '10px', alignSelf: 'center' }} handler={setInitialPositionHandler} label="Set initial position" />
                    <Switch onLabel="Long Path"
                            offLabel="Short Path"
                            vertical={false}
                            value={isRotationMode}
                            handler={() => setIsRotationMode(!isRotationMode)}/>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        <div style={{ padding: '10px 10px', border: '1px solid lightgray', width: '150px', margin: '10px'}}>Position<br></br>
                            <TextField value={cmdX} handlerChange={handleCmdXChange} handlerKeyDown={()=>{}} testId="waypoint_cmdx_id" label="X" style={{ padding: '10px 10px ', marginTop: '10px'}} /><br></br>
                            <TextField value={cmdY} handlerChange={handleCmdYChange} handlerKeyDown={()=>{}} testId="waypoint_cmdy_id" label="Y" style={{ padding: '10px 10px' }} /><br></br>
                            <TextField value={cmdZ} handlerChange={handleCmdZChange} handlerKeyDown={()=>{}} testId="waypoint_cmdz_id" label="Z" style={{ padding: '10px 10px' }} />
                        </div>
                        <div style={{ padding: '10px 10px', border: '1px solid lightgray', width: '150px', margin: '10px'}}>Orientation<br></br>
                            <TextField value={cmdRoll} handlerChange={handleCmdRollChange} handlerKeyDown={()=>{}} testId="waypoint_cmdroll_id" label="Roll" style={{ padding: '10px 10px', marginTop: '10px' }} /><br></br>
                            <TextField value={cmdPitch} handlerChange={handleCmdPitchChange} handlerKeyDown={()=>{}} testId="waypoint_cmdpitch_id" label="Pitch" style={{ padding: '10px 10px' }} /><br></br>
                            <TextField value={cmdYaw} handlerChange={handleCmdYawChange} handlerKeyDown={()=>{}} testId="waypoint_cmdyaw_id" label="Yaw" style={{ padding: '10px 10px' }} />
                        </div>
                        <div style={{ padding: '10px 10px', border: '1px solid lightgray', width: '150px', margin: '10px'}}>Reference<br></br>
                            <TextField value={cmdSpeed} handlerChange={handleCmdSpeedChange} handlerKeyDown={()=>{}} testId="waypoint_cmdspeed_id" label="Speed" style={{ padding: '10px 10px', marginTop: '10px' }} /><br></br>
                            <TextField value={cmdFine} handlerChange={handleCmdFineChange} handlerKeyDown={()=>{}} testId="waypoint_cmdfine_id" label="Fine" style={{ padding: '10px 10px' }} />
                        </div>
                    </div>
                    <FormControl>
                        <InputLabel id="select-outlined-label">Frame</InputLabel>
                        <Select
                            labelId="select-outlined-label"
                            id="select-outlined"
                            label="Frame"
                            style={{ backgroundColor: 'white', width: '150%', alignSelf: 'center', textAlign: 'left'}}
                            handlerChange={handleCmdFrameChange}
                            value={currentFrameSelected}
                            listValue={allFrames} >
                        </Select>
                    </FormControl>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '10px'}}>
                        <Button style={{ fontSize: '20px', alignSelf: 'center', width: '50%'}} handler={addPoseHandler} label="Add Pose"/>
                    </div>
                </div>
            )}
        </GeneralContext.Consumer>
    );
};

export default Waypoints;
