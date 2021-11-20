import React, { useCallback, useState } from 'react';
import Switch from '../common/switch/Switch';
import Button from '../common/button/Button';
import {GeneralContext} from "../../context/generalContext";
import { useROSService} from '../../hooks/useROSService'
import { useROSTopicPublisher, MessageFactory } from "../../hooks/useROSTopicPublisher";

const Controls = () => {

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
                slave: 49,
                bus: 0,
                data: true
            })
            setThrusterActive(true);
        }   
        else{
            toPublish = MessageFactory({
                slave: 49,
                bus: 0,
                data: false
            })
            setThrusterActive(false);
        }

        providerPowerMsgPublisher(toPublish);
    }

    const dryRunMode = (val : Boolean) =>{
        var toPublish = MessageFactory({
            data: val,
        })
        console.log(toPublish);
        dryRunMsgPublisher(toPublish);
    }

    const dryTestServiceCall = useROSService(dryTestCallback, "/provider_thruster/dry_test", "std_srvs/Empty")
    const providerPowerMsgPublisher = useROSTopicPublisher("/provider_power/activate_all_ps", "/sonia_common/ActivateAllPS");
    const dryRunMsgPublisher = useROSTopicPublisher("/telemetry/dry_run", "/std_msgs/Bool");

    return (
        <GeneralContext.Consumer>
            {context => context &&(
                <div style={{flexDirection: 'row', width: '500px', marginRight: '50px', marginLeft: '50px', alignContent: 'center'}}>
                    <Switch onLabel="Normal"
                            offLabel="Dry Run"
                            vertical={true}
                            value={context.isDryRunMode}
                            handler={() => { 
                                             context.setIsDryRunMode(!context.isDryRunMode);
                                             dryRunMode(context.isDryRunMode);}
                                            }/>                 
                    <Button disabled={context.isDryRunMode } style={{width: '100px', fontSize: '11px' }} 
                            handler={callDryTestService} label="Dry Test"/>
                    <Button disabled={ context.isDryRunMode} style={{marginTop: '10px' , width: '100px', fontSize: '11px' }} 
                            handler={thrusterActivation} label={ !thrusterActive ? "Activate" : "Deactivate" }/>
                </div>
            )}
        </GeneralContext.Consumer>
    );

};

export default Controls;