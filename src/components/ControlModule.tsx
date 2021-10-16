import React, { useState } from 'react';
import { GeneralContext } from "../context/generalContext";
import Button from './common/button/Button';

import { useROSTopicPublisher, MessageFactory } from "../hooks/useROSTopicPublisher";
import { useROSTopicSubscriber } from '../hooks/useROSTopicSubscriber';

const disabledButtonStyle = {
    marginLeft: '15px', 
    marginRight: '15px',
    width: '150px', 
    color: 'black'
};

const modeButtonStyle = {
    marginLeft: '10px', 
    marginRight: '10px',
    marginBottom: '5px',
    width: '200px'

};

const modeSelectedColor = 'gray';
const modeDefaultColor = 'white';
const redColor = '#FF0000';
const greenColor = '#00DB00';
const orangeColor = '#FF7100';

const ControlModule = () => {

    const [mpcStatusBkgColor, setMpcStatusBkgColor] = useState<string>(redColor);
    const [mpcActiveBkgColor, setMpcActiveBkgColor] = useState<string>(greenColor);
    const [sensorOnBkgColor, setSensorOnBkgColor] = useState<string>(redColor);

    const [targetReachedBkgColor, setTargetReachedBkgColor] = useState<string>(greenColor);

    const [dvlStatusBkgColor, setDvlStatusBkgColor] = useState<string>(greenColor);

    const [currentModeId, setCurrentModeId] = useState<Number>(0);

    const setMode = (id: Number) => {
        setCurrentModeId(id);
        // Send set mode with ROS here.
        var toPublish = MessageFactory({
                data: id,
        })
        setModePublisher(toPublish);
    }

    const startDVL = () => {

    }

    const mpcActiveCallback = (x: any) => {
        let data : boolean = x.data;
        if( data ){
            setMpcActiveBkgColor(greenColor);
        }
        else{   
            setMpcActiveBkgColor(redColor);
        }
    }

    const mpcStatusCallback = (x: any) => {
        let data : Number = x.data;
        if(data === 1 || data === 2){
            setMpcStatusBkgColor(greenColor);
        }
        else if(data === 0){
            setMpcStatusBkgColor(orangeColor);
        }
        else{
            setMpcStatusBkgColor(redColor);
        }
    }

    const setModePublisher = useROSTopicPublisher<any>("/proc_control/set_mode", "std_msgs/UInt8");
    useROSTopicSubscriber<any>(mpcActiveCallback, "/proc_control/is_mpc_active", "std_msgs/Bool");
    useROSTopicSubscriber<any>(mpcStatusCallback, "/proc_control/mpc_status", "std_msgs/Int8");
    
    return (
        <GeneralContext.Consumer>
            {context => context && (
            <div style={{ width: '100%', height: '100%', flexDirection: 'row', textAlign: 'center' }}>
                <h1 style={{ fontSize: '20px', textAlign: 'center' }}>Control Module</h1>   
                <div style={{ display: 'flex', flexDirection: 'row'}}>
                    <Button disabled={true} 
                            style={Object.assign({backgroundColor: mpcActiveBkgColor}, disabledButtonStyle)}
                            handler={() => {}} label="MPC Active"/>
                    <Button disabled={true} 
                            style={Object.assign({backgroundColor: mpcStatusBkgColor}, disabledButtonStyle)} 
                            handler={() => {}} label="MPC Status"/>
                    <Button disabled={true} 
                            style={Object.assign({backgroundColor: sensorOnBkgColor}, disabledButtonStyle)} 
                            handler={() => {}} label="Sensor On"/>
                </div>   
                <h1 style={{ fontSize: '20px', textAlign: 'center' }}>Target</h1>    
                <Button disabled={true} 
                        style={Object.assign({backgroundColor: targetReachedBkgColor}, disabledButtonStyle)} 
                        handler={() => {}} label="Reached"/>
                <h1 style={{ fontSize: '20px', textAlign: 'center' }}>Modes</h1>  
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Button disabled={currentModeId === 10} 
                            style={Object.assign({backgroundColor: currentModeId === 10 ? modeSelectedColor : modeDefaultColor}, modeButtonStyle)}
                            handler={() => { setMode(10) }} label="MPC Auto"/>
                    <Button disabled={currentModeId === 19} 
                            style={Object.assign({backgroundColor: currentModeId === 19 ? modeSelectedColor : modeDefaultColor}, modeButtonStyle)}
                            handler={() => { setMode(19) }} label="MPC 3D Mouse"/>
                    <Button disabled={currentModeId === 20} 
                            style={Object.assign({backgroundColor: currentModeId === 20 ? modeSelectedColor : modeDefaultColor}, modeButtonStyle)}
                            handler={() => { setMode(20) }} label="Model 3D Mouse"/>
                </div> 
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Button disabled={currentModeId === 21} 
                            style={Object.assign({backgroundColor: currentModeId === 21 ? modeSelectedColor : modeDefaultColor}, modeButtonStyle)}
                            handler={() => { setMode(21) }} label="B Matrix 3D Mouse"/>
                    <Button disabled={currentModeId === 0} 
                            style={Object.assign({backgroundColor: currentModeId === 0 ? modeSelectedColor : modeDefaultColor}, modeButtonStyle)} 
                            handler={ ()=>{ setMode(0) } } label="Soft Kill"/>
                    <Button disabled={currentModeId === 11} 
                            style={Object.assign({backgroundColor: currentModeId === 11 ? modeSelectedColor : modeDefaultColor}, modeButtonStyle)}
                            handler={() => { setMode(11) }} label="MPC Single Wpts"/>
                </div>
                <h1 style={{ fontSize: '20px', textAlign: 'center' }}>DVL</h1> 
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <Button disabled={true} 
                            style={Object.assign({backgroundColor: dvlStatusBkgColor}, disabledButtonStyle)}
                            handler={() => {}} label="DVL Status"/>
                    <Button disabled={false} 
                            style={Object.assign({}, disabledButtonStyle)} 
                            handler={ startDVL } label="Start DVL"/>
                </div>  
            </div>
            )}
        </GeneralContext.Consumer>
    );
};

export default ControlModule;
