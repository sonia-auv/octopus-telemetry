import React, { useCallback, useState } from 'react';
import Switch from '../common/switch/Switch';
import Button from '../common/button/Button';
import {GeneralContext} from "../../context/generalContext";
import { useROSService} from '../../hooks/useROSService'
import { useROSTopicPublisher, MessageFactory } from "../../hooks/useROSTopicPublisher";
import { useROSTopicSubscriber } from '../../hooks/useROSTopicSubscriber';
import ConsoleLogStream from 'rosnodejs/dist/lib/logging/ConsoleLogStream';

const Controls = () => {
    const [isDryRunMode, setIsDryRunMode] = useState(true);
    const [dryTestActive, setdryTestActive] = useState(false);
    const [thrusterActive, setThrusterActive] = useState(false);

    const callDryTestService = async () => {
        dryTestServiceCall({}); 
    }

    const dryTestCallback = useCallback(
        (response: ROSLIB.ServiceResponse) => {
            setdryTestActive(false);
          },
          []
        
    )

    const thrusterActivation = () => {
        var toPublish;
        if(!thrusterActive){
            toPublish = MessageFactory({
                data: true
            })
            setThrusterActive(true);
        }   
        else{
            toPublish = MessageFactory({
                data: false
            })
            setThrusterActive(false);
        }
        providerPowerMsgPublisher(toPublish);
    }

    const dryRunMode = () =>{
        var toPublish;
        if(!isDryRunMode){
            toPublish = MessageFactory({
                data: true
            })
            setIsDryRunMode(true);
        }   
        else{
            toPublish = MessageFactory({
                data: false
            })
            setIsDryRunMode(false);
        }
        dryRunMsgPublisher(toPublish);
    }

    const dryRunCallback = (x: any) => {
        setIsDryRunMode(x.data);
    }

    const thrusterActiveCallback = (x: any) => {
        setThrusterActive(x.data);
    }

    const dryTestServiceCall = useROSService(dryTestCallback, "/provider_thruster/dry_test", "std_srvs/Empty")
    const providerPowerMsgPublisher = useROSTopicPublisher("/provider_power/activate_all_motor", "/std_msgs/Bool", true);
    const dryRunMsgPublisher = useROSTopicPublisher("/telemetry/dry_run", "/std_msgs/Bool", true);

    useROSTopicSubscriber(dryRunCallback, "/telemetry/dry_run", "/std_msgs/Bool");
    useROSTopicSubscriber(thrusterActiveCallback, "/provider_power/activate_all_motor", "/std_msgs/Bool");

    return (
        <GeneralContext.Consumer>
            {context => context &&(
                <div style={{flexDirection: 'row', width: '500px', marginRight: '50px', marginLeft: '50px', alignContent: 'center'}}>
                    <Button disabled={false} style={{marginTop: '10px', width: '100px', fontSize: '11px' }} 
                            handler={dryRunMode} label={ isDryRunMode ? "Normal" : "Dry Run" }/>             
                    <Button disabled={!isDryRunMode} style={{marginTop: '10px', width: '100px', fontSize: '11px' }} 
                            handler={callDryTestService} label="Dry Test"/>
                    <Button disabled={!isDryRunMode} style={{marginTop: '10px', width: '100px', fontSize: '11px' }} 
                            handler={thrusterActivation} label={ !thrusterActive ? "Activate" : "Deactivate" }/>
                </div>
            )}
        </GeneralContext.Consumer>
    );

};

export default Controls;