import React, { useState } from 'react';
import { GeneralContext } from "../context/generalContext";
import Button from './common/button/Button';
import { useROSService} from '../hooks/useROSService'
import { useROSTopicPublisher, MessageFactory } from "../hooks/useROSTopicPublisher";
import { useROSTopicSubscriber } from '../hooks/useROSTopicSubscriber';

const disabledButtonStyle = {
    marginLeft: '15px', 
    marginRight: '15px',
    width: '150px', 
    color: 'black'
};

const disabledThrustButtonStyle = {
    marginLeft: '15px', 
    marginRight: '15px',
    width: '50px', 
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
const redColor = '#F21D12';
const greenColor = '#17C40E';
const orangeColor = '#F28712';

const ControlModule = () => {

    const [mpcStatusBkgColor, setMpcStatusBkgColor] = useState<string>(redColor);
    const [mpcActiveBkgColor, setMpcActiveBkgColor] = useState<string>(greenColor);
    const [sensorOnBkgColor, setSensorOnBkgColor] = useState<string>(redColor);

    const [targetReachedBkgColor, setTargetReachedBkgColor] = useState<string>(greenColor);
    const [trajectoryDoneBkgColor, setTrajectoryDoneBkgColor] = useState<string>(redColor);

    const [dvlStatusBkgColor, setDvlStatusBkgColor] = useState<string>(greenColor);
    const [dvlStarted, setDvlStarted] = useState<boolean>(true);

    const [sonarStatusBkgColor, setSonarStatusBkgColor] = useState<string>(greenColor);
    const [sonarStarted, setSonarStarted] = useState<boolean>(true);

    const [currentModeId, setCurrentModeId] = useState<Number>(0);
    
    const [ovGains, setOvGains] = useState<Array<Number>>([0,0,0,0,0,0,0,0,0,0,0,0,0]);
    const [mvGains, setMvGains] = useState<Array<Number>>([0,0,0,0,0,0,0,0]);
    const [mvrGains, setMvrGains] = useState<Array<Number>>([0,0,0,0,0,0,0,0]);
    const [minThrust, setMinThrust] = useState<Number>(0.0);
    const [maxThrust, setMaxThrust] = useState<Number>(0.0);
    const [thrusterStatus, setThrusterStatus] = useState<Array<Boolean>>([true,true,true,true,true,true,true,true]);

    const setMode = (id: Number) => {
        setCurrentModeId(id);
        // Send set mode with ROS here.
        var toPublish = MessageFactory({
           data: id,
        })
        setModePublisher(toPublish);
    }

    const setMpcMode = (data: Number) => {
        setCurrentModeId(data);
    }

    const startStopDVL = () => {
        var toPublish;
        if(dvlStarted){
            toPublish = MessageFactory({
                data: false,
            })
            setDVLStartedPublisher(toPublish); 
        }
        else{
            toPublish = MessageFactory({
                data: true,
            })
            setDVLStartedPublisher(toPublish);
        }
    }

    const startStopSonar = () => {
        var toPublish
        if(sonarStarted){
            toPublish = MessageFactory({
                data: false,
            })
            setSonarStartedPublisher(toPublish); 
        }
        else{
            toPublish = MessageFactory({
                data: true,
            })
            setSonarStartedPublisher(toPublish);
        }
    }

    const setMpcActive= (data: boolean) => {
        if( data ){
            setMpcActiveBkgColor(greenColor);
        }
        else{   
            setMpcActiveBkgColor(redColor);
        }
    }

    const sensorOnCallback = (x: any) => {
        let data : boolean = x.data;
        if( data ){
            setSensorOnBkgColor(greenColor);
        }
        else{   
            setSensorOnBkgColor(redColor);
        }
    }

    const setTargetReached = (data : boolean) => {
        if( data ){
            setTargetReachedBkgColor(greenColor);
        }
        else{   
            setTargetReachedBkgColor(redColor);
        }
    }

    const setTrajectoryDone = (data : boolean) => {
        if( data ){
            setTrajectoryDoneBkgColor(greenColor);
        }
        else{   
            setTrajectoryDoneBkgColor(redColor);
        }
    }

    const dvlStatusCallback = (x: any) => {
        let data : boolean = x.data;
        if( data ){
            setDvlStatusBkgColor(greenColor);
            setDvlStarted(true);
        }
        else{   
            setDvlStatusBkgColor(redColor);
            setDvlStarted(false);
        }
    }

    const sonarStatusCallback = (x: any) => {
        let data : boolean = x.data;
        if( data ){
            setSonarStatusBkgColor(greenColor);
            setSonarStarted(true);
        }
        else{   
            setSonarStarted(false);
            setSonarStatusBkgColor(redColor);
        }
    }

    const setMpcStatus = (data: Number) => {
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

    const setMpcInfo = (x: any) => {
        setMpcActive(x.is_mpc_alive);
        setMpcStatus(x.mpc_status);
        setMpcMode(x.mpc_mode);
        setTargetReached(x.target_reached);
        setTrajectoryDone(x.is_trajectory_done);
        setOvGains(x.currentGains.OV);
        setMvGains(x.currentGains.MV);
        setMvrGains(x.currentGains.MVR);
        setMinThrust(x.currentGains.min_thrust);
        setMaxThrust(x.currentGains.max_thrust);
        setThrusterStatus(x.thrusters_status);
    }

    const imuTare = () => {
        imuTareServiceCall({});
    }

    const imuTareCallback = (x: any) => {
        // Do nothing.
    }
    
    const depthTare = () => {
        if (process.env.REACT_APP_AUV === 'AUV7'){
            var toPublish;
            toPublish = MessageFactory({
                data: true,
            })
            console.log(process.env.REACT_APP_AUV);
            auv7TarePublisher(toPublish); 
        }
        else if(process.env.REACT_APP_AUV === 'AUV8'){
            depthTareServiceCall({});
            console.log(process.env.REACT_APP_AUV);
        }
        
    }

    const depthTareCallback = (x: any) => {
        // Do nothing
    }

    const renderNumArray = (array : Array<Number>) => {
        let str = '';
        let length = array.length;
        array.forEach((value, i) => {
            str += value.toFixed(2);
            str += (i === length - 1 ? "" : " ; ");
        });
        return str;
    }

    const auv7TarePublisher = useROSTopicPublisher<any>("/provider_dvl/setDepthOffset", "std_msgs/Bool", false);
    const setModePublisher = useROSTopicPublisher<any>("/proc_control/set_mode", "std_msgs/UInt8", false);
    const setDVLStartedPublisher = useROSTopicPublisher<any>("/provider_dvl/enable_disable_ping", "std_msgs/Bool", true);
    const setSonarStartedPublisher = useROSTopicPublisher<any>("/provider_sonar/enable_disable_ping", "std_msgs/Bool", true);
    const imuTareServiceCall = useROSService<any>(imuTareCallback, "/provider_imu/tare", "std_srvs/Empty")
    const depthTareServiceCall = useROSService<any>(depthTareCallback, "/provider_depth/tare", "std_srvs/Empty")

    useROSTopicSubscriber<any>(sensorOnCallback, "/proc_control/sensor_on", "std_msgs/Bool");
    useROSTopicSubscriber<any>(dvlStatusCallback, "/provider_dvl/enable_disable_ping", "std_msgs/Bool");
    useROSTopicSubscriber<any>(sonarStatusCallback, "/provider_sonar/enable_disable_ping", "std_msgs/Bool");

    // New mpc info message.
    useROSTopicSubscriber<any>(setMpcInfo, "/proc_control/controller_info", "sonia_common/MpcInfo");
    
    return (
        <GeneralContext.Consumer>
            {context => context && (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                <h1 style={{ fontSize: '20px', textAlign: 'center' }}>Control Module</h1> 
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row'}}>
                    <span style={{ marginLeft: '10px', width: '55%', display: 'flex', flexDirection: 'column', border: '1px solid lightgray'}}>
                        <h1 style={{ fontSize: '15px', textAlign: 'center' }}>MPC</h1>   
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
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
                        <h1 style={{ fontSize: '15px', textAlign: 'center' }}>Modes</h1>  
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <Button disabled={currentModeId === 10} 
                                    style={Object.assign({backgroundColor: currentModeId === 10 ? modeSelectedColor : modeDefaultColor}, modeButtonStyle)}
                                    handler={() => { setMode(10) }} label="MPC Planner"/>
                            <Button disabled={true} //  Disable
                                    style={Object.assign({backgroundColor: currentModeId === -1 ? modeSelectedColor : modeDefaultColor}, modeButtonStyle)}
                                    handler={() => { setMode(19) }} label="Empty"/>
                            <Button disabled={true} //  Disable
                                    style={Object.assign({backgroundColor: currentModeId === -1 ? modeSelectedColor : modeDefaultColor}, modeButtonStyle)}
                                    handler={() => { setMode(20) }} label="Empty"/>
                        </div> 
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <Button disabled={true}  // Disable
                                    style={Object.assign({backgroundColor: currentModeId === -1 ? modeSelectedColor : modeDefaultColor}, modeButtonStyle)}
                                    handler={() => { setMode(21) }} label="Empty"/>
                            <Button disabled={currentModeId === 0} 
                                    style={Object.assign({backgroundColor: currentModeId === 0 ? modeSelectedColor : modeDefaultColor}, modeButtonStyle)} 
                                    handler={ ()=>{ setMode(0) } } label="Soft Kill"/>
                            <Button disabled={currentModeId === 11} 
                                    style={Object.assign({backgroundColor: currentModeId === 11 ? modeSelectedColor : modeDefaultColor}, modeButtonStyle)}
                                    handler={() => { setMode(11) }} label="MPC Single Wpts"/>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Button disabled={true} 
                                    style={Object.assign({backgroundColor: currentModeId === -1 ? modeSelectedColor : modeDefaultColor}, modeButtonStyle)}
                                    handler={() => { setMode(32) }} label="Empty"/>
                            <Button disabled={true} // Dont forget...
                                    style={Object.assign({backgroundColor: currentModeId === -1 ? modeSelectedColor : modeDefaultColor}, modeButtonStyle)} 
                                    handler={ ()=>{ setMode(-1) } } label="Empty"/>
                            <Button disabled={true} // Dont forget...
                                    style={Object.assign({backgroundColor: currentModeId === -1 ? modeSelectedColor : modeDefaultColor}, modeButtonStyle)}
                                    handler={() => { setMode(-1) }} label="Empty"/>
                        </div>
                    </span>
                    <span style={{ display: 'flex', flexDirection: 'column', border: '1px solid lightgray'}}>
                        <h1 style={{ fontSize: '15px', textAlign: 'center' }}>Trajectory</h1>   
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <Button disabled={true} 
                                    style={Object.assign({backgroundColor: targetReachedBkgColor}, disabledButtonStyle)}
                                    handler={() => {}} label="Target Reached"/>
                            <Button disabled={true} 
                                    style={Object.assign({backgroundColor: trajectoryDoneBkgColor}, disabledButtonStyle)} 
                                    handler={() => {}} label="Done"/>
                        </div>     
                        <h1 style={{ fontSize: '15px', textAlign: 'center' }}>DVL</h1> 
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <Button disabled={true} 
                                    style={Object.assign({backgroundColor: dvlStatusBkgColor}, disabledButtonStyle)}
                                    handler={() => {}} label="DVL Status"/>
                            <Button disabled={false} 
                                    style={Object.assign({}, disabledButtonStyle)} 
                                    handler={ startStopDVL } label={dvlStarted ? "Stop DVL" : "Start DVL" }/>
                        </div>  
                        <h1 style={{ fontSize: '15px', textAlign: 'center' }}>Tare</h1> 
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <Button disabled={false} 
                                    style={Object.assign({}, disabledButtonStyle)} 
                                    handler={() => {imuTare()}} label="IMU"/>
                            <Button disabled={false} 
                                    style={Object.assign({}, disabledButtonStyle)} 
                                    handler={() => {depthTare()}} label="Depth"/>
                        </div> 
                        <h1 style={{ fontSize: '15px', textAlign: 'center' }}>Sonar</h1> 
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '15px'}}>
                            <Button disabled={true} 
                                    style={Object.assign({backgroundColor: sonarStatusBkgColor}, disabledButtonStyle)}
                                    handler={() => {}} label="Sonar Status"/>
                            <Button disabled={false} 
                                    style={Object.assign({}, disabledButtonStyle)} 
                                    handler={ startStopSonar } label={sonarStarted ? "Stop SONAR" : "Start SONAR" }/>
                        </div>
                    </span>
                </div> 
                <div style={{ marginLeft: '10px', marginRight: '10px', border: '1px solid lightgray' }}>
                    <h1 style={{ fontSize: '15px', textAlign: 'center' }}>MPC Gains</h1> 
                    <div style={{ marginLeft: '10px', fontSize: '15px', textAlign: 'left'}}>
                        <p>OV:  {renderNumArray(ovGains)}</p>
                        <p>MV:  {renderNumArray(mvGains)}</p>
                        <p>MVR: {renderNumArray(mvrGains)}</p>
                    </div>                   
                </div>
                <div style={{ marginLeft: '10px', marginRight: '10px', border: '1px solid lightgray', justifyContent: 'center' }}>
                    <h1 style={{ fontSize: '15px', textAlign: 'center' }}>Thrusters status</h1> 
                    <p>Thrust MIN: {minThrust} N, MAX: {maxThrust} N</p>
                    <div style={{ marginBottom: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        {
                            thrusterStatus.map((val, i) => {
                                return(<Button disabled={true} // Dont forget...
                                    style={Object.assign({backgroundColor: (val ? greenColor : redColor)}, disabledThrustButtonStyle)}
                                    handler={() => { setMode(-1) }} label={i+1}/>)
                            })
                        }  
                    </div>
                        
                </div>
            </div>
            )}
        </GeneralContext.Consumer>
    );
};

export default ControlModule;
