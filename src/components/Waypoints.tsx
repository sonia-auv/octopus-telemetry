import { useState } from 'react';
import Switch from './common/switch/Switch';
import { GeneralContext } from "../context/generalContext";
import Button from './common/button/Button';
import Select from './common/select/Select';
import InputLabel from './common/Input/InputLabel';
import FormControl from './common/Form/FormControl';
import TextField from './common/textfield/Textfield';

import { useROSTopicPublisher, MessageFactory } from '../hooks/useROSTopicPublisher';
import { useROSTopicSubscriber } from '../hooks/useROSTopicSubscriber';
import { useROSService, ServiceRequestFactory } from '../hooks/useROSService'

const Waypoints = () => {

    let frame0 = {value: "Abs. position & Abs. angle"};
    let frame1 = {value: "Rel. position & Rel. angle"};
    let frame2 = {value: "Rel. position & Abs. angle"};
    let frame3 = {value: "Abs. position & Rel. angle"};

    let method0 = {value: "Hermite"};
    let method1 = {value: "v5cubic"};
    let method2 = {value: "Spline"};

    const [isRotationMode, setIsRotationMode] = useState(false);
    const [allFrames] = useState([frame0, frame1, frame2, frame3]);
    const [allMethods] = useState([method0, method1, method2]);
    const [currentFrameSelected, setCurrentMissionName] = useState("");
    const [currentMethodSelected, setCurrentMethodName] = useState("");

    const [currentModeId, setCurrentModeId] = useState<Number>(0);

    const [cmdX, setCmdX] = useState('0.00');
    const [cmdY, setCmdY] = useState('0.00');
    const [cmdZ, setCmdZ] = useState('0.00');
    const [cmdRoll, setCmdRoll] = useState('0.00');
    const [cmdPitch, setCmdPitch] = useState('0.00');
    const [cmdYaw, setCmdYaw] = useState('0.00');
    const [cmdFrame, setCmdFrame] = useState('0');
    const [cmdSpeed, setCmdSpeed] = useState('0');
    const [cmdFine, setCmdFine] = useState('0.00');
    const [cmdMethod, setCmdMethod] = useState('0');
    const [positionZ, setPositionZ] = useState('0.00');
    
    const setInitialPositionPublisher = useROSTopicPublisher<any>("/proc_simulation/start_simulation", "geometry_msgs/Pose");
    const sendSingleAddPosePublisher = useROSTopicPublisher<any>("/proc_control/add_pose", "sonia_common/AddPose");
    const sendMultipleAddPosePublisher = useROSTopicPublisher<any>("/proc_planner/send_multi_addpose", "sonia_common/MultiAddPose");
    const resetTrajectoryPublisher = useROSTopicPublisher<any>("/proc_control/reset_traj", "std_msgs/Bool");
    
    const getPoseCallback = (pose: any) => {
        console.log(pose)
        var toPublish = MessageFactory({
            position:{
                x: pose.object_pose.position.x,
                y: pose.object_pose.position.y,
                z: pose.object_pose.position.z
            },
            orientation:{
                x: pose.object_pose.orientation.x,
                y: pose.object_pose.orientation.y,
                z: pose.object_pose.orientation.z,
                w: pose.object_pose.orientation.w
            }
        });
        setInitialPositionPublisher(toPublish)
    }
    
    const topicServiceCall = useROSService<any>(getPoseCallback, "obj_pose_srv", "sonia_common/ObjectPoseService")
    
    const checkSyntax = (v: any) => [...v].every(c => '0123456789.-'.includes(c));
    
    const setMpcMode = (data: Number) => {
        setCurrentModeId(data);
    }
    
    const setMpcInfo = (x: any) => {
        setMpcMode(x.mpc_mode);
    }
    
    useROSTopicSubscriber<any>(setMpcInfo, "/proc_control/controller_info", "sonia_common/MpcInfo");

    const auvPositionCallback = (x:any) => {
        setPositionZ(x.pose.pose.position.z.toFixed(2));
    }


    useROSTopicSubscriber<any>(auvPositionCallback, "/telemetry/auv_states", "nav_msgs/Odometry");
    
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
    
    const handleCmdMethodChange = (e: any) => {
        setCurrentMethodName(e.target.value as string);
        if(e.target.value === method0.value || e.target.value === "None"){
            setCmdMethod('0')
        }
        else if(e.target.value === method1.value){
            setCmdMethod('1')
        }
        else if(e.target.value === method2.value){
            setCmdMethod('2')
        }
    }

    const addPoseHandler = () => 
    {
        let z_axis_problem = false;
        var xVal = !isNaN(parseFloat(cmdX)) ? parseFloat(cmdX) : parseFloat('0.0');
        var yVal = !isNaN(parseFloat(cmdY)) ? parseFloat(cmdY) : parseFloat('0.0');
        var zVal = !isNaN(parseFloat(cmdZ)) ? parseFloat(cmdZ) : parseFloat('0.0');
        var zPose = !isNaN(parseFloat(positionZ)) ? parseFloat(positionZ) : parseFloat('0.0');
        if(zVal + zPose > 5.0){ z_axis_problem = true; }
        var rollVal = !isNaN(parseFloat(cmdRoll)) ? parseFloat(cmdRoll) : parseFloat('0.0');
        var pitchVal = !isNaN(parseFloat(cmdPitch)) ? parseFloat(cmdPitch) : parseFloat('0.0');
        var yawVal = !isNaN(parseFloat(cmdYaw)) ? parseFloat(cmdYaw) : parseFloat('0.0');
        var frameVal = !isNaN(parseInt(cmdFrame)) ? parseInt(cmdFrame) : parseInt('0');
        var speedVal = !isNaN(parseInt(cmdSpeed)) ? parseInt(cmdSpeed) : parseInt('0');
        var fineVal = !isNaN(parseFloat(cmdFine)) ? parseFloat(cmdFine) : parseFloat('0.0');
        var methodVal = !isNaN(parseInt(cmdMethod)) ? parseInt(cmdMethod) : parseInt('0');
        if(z_axis_problem){
            alert("Depth too low");
        }
        else{
            if(currentModeId === 11){
                if(speedVal <= 0) {
                    alert("Speed incorrect")
                }
                else {
                    // Single waypoint trajectory.
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
                    console.log(toPublish);
                    sendSingleAddPosePublisher(toPublish);
                    resetCommands();
                }
            }
            else if (currentModeId === 10){
                if(speedVal < 0 || speedVal > 2) {
                    alert("Speed profile incorrect")
                }
                else {
                    // Multi waypoints trajectory.
                    let toPublish = MessageFactory({
                        interpolation_method: methodVal,
                        pose: [
                            {position: {
                                x: xVal, y: yVal, z: zVal,
                            },
                            orientation:{
                                x: rollVal, y: pitchVal, z: yawVal,
                            },
                            frame: frameVal,
                            speed: speedVal,
                            fine: fineVal,
                            rotation: isRotationMode},
                        ]
                    });
                    sendMultipleAddPosePublisher(toPublish);
                    resetCommands();
                }
            }
        }
    }
    
    const resetCommands = () => {
        setCmdX('0.00');
        setCmdY('0.00');
        setCmdZ('0.00');
        setCmdRoll('0.00');
        setCmdPitch('0.00');
        setCmdYaw('0.00');
        setCmdSpeed('0');
        setCmdFine('0.00');
    }
    
    const resetTrajectory = () => {
        var toPublish = MessageFactory({
            data: true
        })
        resetTrajectoryPublisher(toPublish);
    }
        
    const setInitialPositionHandler = () => {
        // TODO: process.env.REACT_APP_LOCAL_AUV
        var request = ServiceRequestFactory({ object_name: 'AUV8' });
        topicServiceCall(request)
    }
    


    return (
        <GeneralContext.Consumer>
            {context => context && (
                <div style={{ width: '100%', height: '100%', flexDirection: 'row', textAlign: 'center', alignContent: 'center' }}>
                    <h1 style={{ fontSize: '20px', textAlign: 'center' }}>Waypoints</h1>
                    <Button style={{ width: '150px', marginBottom: '10px', fontSize: '10px', alignSelf: 'center' }} handler={resetTrajectory} label="Reset Trajectory" /> 
                    <Button style={{ marginLeft: '10px', marginBottom: '10px', width: '150px', fontSize: '10px', alignSelf: 'center' }} handler={setInitialPositionHandler} label="Set initial position" />
                    <Switch onLabel="Long Path"
                            offLabel="Short Path"
                            vertical={false}
                            value={isRotationMode}
                            handler={() => setIsRotationMode(!isRotationMode)}/>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        <div style={{ padding: '10px 10px', border: '1px solid lightgray', width: '150px', margin: '10px'}}>Position<br></br>
                            <TextField type="number" value={cmdX} handlerChange={handleCmdXChange} handlerKeyDown={()=>{}} testId="waypoint_cmdx_id" label="X" style={{ padding: '10px 10px ', marginTop: '10px'}} /><br></br>
                            <TextField type="number" value={cmdY} handlerChange={handleCmdYChange} handlerKeyDown={()=>{}} testId="waypoint_cmdy_id" label="Y" style={{ padding: '10px 10px' }} /><br></br>
                            <TextField type="number" value={cmdZ} handlerChange={handleCmdZChange} handlerKeyDown={()=>{}} testId="waypoint_cmdz_id" label="Z" style={{ padding: '10px 10px' }} />
                        </div>
                        <div style={{ padding: '10px 10px', border: '1px solid lightgray', width: '150px', margin: '10px'}}>Orientation<br></br>
                            <TextField type="number" value={cmdRoll} handlerChange={handleCmdRollChange} handlerKeyDown={()=>{}} testId="waypoint_cmdroll_id" label="Roll" style={{ padding: '10px 10px', marginTop: '10px' }} /><br></br>
                            <TextField type="number" value={cmdPitch} handlerChange={handleCmdPitchChange} handlerKeyDown={()=>{}} testId="waypoint_cmdpitch_id" label="Pitch" style={{ padding: '10px 10px' }} /><br></br>
                            <TextField type="number" value={cmdYaw} handlerChange={handleCmdYawChange} handlerKeyDown={()=>{}} testId="waypoint_cmdyaw_id" label="Yaw" style={{ padding: '10px 10px' }} />
                        </div>
                        <div style={{ padding: '10px 10px', border: '1px solid lightgray', width: '150px', margin: '10px'}}>Reference<br></br>
                            <TextField type="number" value={cmdSpeed} handlerChange={handleCmdSpeedChange} handlerKeyDown={()=>{}} testId="waypoint_cmdspeed_id" label="Speed" style={{ padding: '10px 10px', marginTop: '10px' }} /><br></br>
                            <TextField type="number" value={cmdFine} handlerChange={handleCmdFineChange} handlerKeyDown={()=>{}} testId="waypoint_cmdfine_id" label="Fine" style={{ padding: '10px 10px' }} />
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
                    </FormControl><br></br>
                    <FormControl disabled={currentModeId === 10 ? false : true} >
                        <InputLabel id="select-outlined-label">Method</InputLabel>
                        <Select
                            labelId="select-outlined-label"
                            id="select-outlined"
                            label="Method"
                            style={{ backgroundColor: 'white', width: '150%', alignSelf: 'center', textAlign: 'left'}}
                            handlerChange={handleCmdMethodChange}
                            value={currentMethodSelected}
                            listValue={allMethods} >
                        </Select>
                    </FormControl>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '10px'}}>
                        <Button style={{ fontSize: '20px', alignSelf: 'center', width: '50%'}} handler={addPoseHandler} 
                                label={currentModeId === 0 ? "Select a mode" : "Add Pose"}
                                disabled={currentModeId === 0 ? true : false}/>
                    </div>
                </div>
            )}
        </GeneralContext.Consumer>
    );
};

export default Waypoints;
