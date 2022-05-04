import { useState } from 'react';
import { GeneralContext } from "../context/generalContext";
import TextField from './common/textfield/Textfield';

import { useROSTopicSubscriber } from '../hooks/useROSTopicSubscriber';

const Target = () => {

    const [positionX, setPositionX] = useState('0.00');
    const [positionY, setPositionY] = useState('0.00');
    const [positionZ, setPositionZ] = useState('0.00');
    const [orientationX, setOrientationX] = useState('0.00');
    const [orientationY, setOrientationY] = useState('0.00');
    const [orientationZ, setOrientationZ] = useState('0.00');  

    var data = {
        "pitchAngle": "0.00",
        "bankAngle": "0.00",
        "altitude": "0.00",
        "heading": "0.00",
        "posX": "0.00",
        "posY": "0.00",
    }

    
    const getPositionCallback = (x: any) => {
        setPositionX(x.pose.pose.position.x.toFixed(2));
        setPositionY(x.pose.pose.position.y.toFixed(2));
        setPositionZ((-x.pose.pose.position.z).toFixed(2));
        setOrientationX(x.pose.pose.orientation.x.toFixed(2));
        setOrientationY(x.pose.pose.orientation.y.toFixed(2));
        setOrientationZ(x.pose.pose.orientation.z.toFixed(2));
    }

    const getMultiPositionCallback = (x: any) => {
        var length = x.transforms.length();
        setPositionX(x.transforms[length].translation.x);
        setPositionY(x.transforms[length].translation.y);
        setPositionZ(x.transforms[length].translation.z);
        setOrientationZ(x.transforms[length].rotation.z);
        setOrientationZ(x.transforms[length].rotation.z);
        setOrientationZ(x.transforms[length].rotation.z);
    }
    
    
    const resetTrajectoryCallback = () => {
        setPositionX(data.posX)
        setPositionY(data.posY)
        setPositionZ(data.altitude)        
        setOrientationX(data.bankAngle)
        setOrientationY(data.pitchAngle)
        setOrientationZ(data.heading)
    }

    const odomCallback = (x: any) => {
        try{ data.posX = x.pose.pose.position.x.toFixed(2); } catch(error){ data.posX = "0.00" }
        try{ data.posY = x.pose.pose.position.y.toFixed(2); } catch(error){ data.posY = "0.00" }
        try{ data.altitude = (-x.pose.pose.position.z).toFixed(2); } catch(error){ data.altitude = "0.00" }
        try{ data.bankAngle = x.pose.pose.orientation.x.toFixed(2); } catch(error){ data.bankAngle = "0.00" }
        try{ data.pitchAngle = x.pose.pose.orientation.y.toFixed(2); } catch(error){ data.pitchAngle = "0.00" }
        try{ data.heading = x.pose.pose.orientation.z.toFixed(2); } catch(error){ data.heading = "0.00" }
    }

    useROSTopicSubscriber<any>(getPositionCallback, "/proc_control/add_pose", "sonia_common/AddPose");
    useROSTopicSubscriber<any>(getMultiPositionCallback, "/proc_control/send_multi_addpose", "sonia_common/MultiAddPose");
    useROSTopicSubscriber<any>(resetTrajectoryCallback, "/proc_control/reset_traj", "std_msgs/Bool");
    useROSTopicSubscriber<any>(odomCallback, "/telemetry/auv_states", "nav_msgs/Odometry");

    const handleCmdChange = () => {}

    return (
        <GeneralContext.Consumer>
            {context => context && (
                <div style={{ width: '100%', height: '100%', flexDirection: 'row', textAlign: 'center', alignContent: 'center' }}>
                    <h1 style={{ fontSize: '20px', textAlign: 'center' }}>Target</h1>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        <div style={{ padding: '10px 10px', border: '1px solid lightgray', width: '150px', margin: '10px'}}>Position<br></br>
                            <TextField type="number" disabled={true} value={positionX} handlerChange={handleCmdChange} handlerKeyDown={()=>{}} testId="waypoint_cmdx_id" label="X" style={{ padding: '10px 10px ', marginTop: '10px'}}  /><br></br>
                            <TextField type="number" disabled={true} value={positionY} handlerChange={handleCmdChange} handlerKeyDown={()=>{}} testId="waypoint_cmdy_id" label="Y" style={{ padding: '10px 10px' }} /><br></br>
                            <TextField type="number" disabled={true} value={positionZ} handlerChange={handleCmdChange} handlerKeyDown={()=>{}} testId="waypoint_cmdz_id" label="Z" style={{ padding: '10px 10px' }} />
                        </div>
                        <div style={{ padding: '10px 10px', border: '1px solid lightgray', width: '150px', margin: '10px'}}>Orientation<br></br>
                            <TextField type="number" disabled={true} value={orientationX} handlerChange={handleCmdChange} handlerKeyDown={()=>{}} testId="waypoint_cmdroll_id" label="Roll" style={{ padding: '10px 10px', marginTop: '10px' }} /><br></br>
                            <TextField type="number" disabled={true} value={orientationY} handlerChange={handleCmdChange} handlerKeyDown={()=>{}} testId="waypoint_cmdpitch_id" label="Pitch" style={{ padding: '10px 10px' }} /><br></br>
                            <TextField type="number" disabled={true} value={orientationZ} handlerChange={handleCmdChange} handlerKeyDown={()=>{}} testId="waypoint_cmdyaw_id" label="Yaw" style={{ padding: '10px 10px' }} />
                        </div>
                        {/* <div style={{ padding: '10px 10px', border: '1px solid lightgray', width: '150px', margin: '10px'}}>Reference<br></br>
                            <TextField type="number" value={cmdSpeed} handlerChange={handleCmdSpeedChange} handlerKeyDown={()=>{}} testId="waypoint_cmdspeed_id" label="Speed" style={{ padding: '10px 10px', marginTop: '10px' }} /><br></br>
                            <TextField type="number" value={cmdFine} handlerChange={handleCmdFineChange} handlerKeyDown={()=>{}} testId="waypoint_cmdfine_id" label="Fine" style={{ padding: '10px 10px' }} />
                        </div> */}
                    </div>
                </div>
            )}
        </GeneralContext.Consumer>
    );
};

export default Target;
