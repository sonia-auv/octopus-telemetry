import React, { useCallback, useState } from 'react';
import Switch from '../common/switch/Switch';
import Button from '../common/button/Button';
import {GeneralContext} from "../../context/generalContext";
import { useROSService} from '../../hooks/useROSService'
import { useROSTopicPublisher, MessageFactory } from "../../hooks/useROSTopicPublisher";


const Controls = (props) => {

    const [dryTestActive, setdryTestActive] = useState(false);
    const [thrusterActive, setThrusterActive] = useState(false);

    const callDryTestService = async () => {

        dryTestServiceCall(); 
    }

    const dryTestCallback = useCallback(
        () => {
            setdryTestActive(false);
          },
          []
        
    )

    const thrusterActivation = () => {
        if(!thrusterActive){
            var toPublish = MessageFactory({
                slave: 49,
                bus: 0,
                data: true
            })
            setThrusterActive(true);
        }   
        else{
            var toPublish = MessageFactory({
                slave: 49,
                bus: 0,
                data: false
            })
            setThrusterActive(false);
        }

        providerPowerMsgPublisher(toPublish);
    }

    const dryTestServiceCall = useROSService(dryTestCallback, "/provider_thruster/dry_test", "std_srvs/Empty")
    const providerPowerMsgPublisher = useROSTopicPublisher("/provider_power/activate_all_ps", "/sonia_common/ActivateAllPS");

    return (
        <GeneralContext.Consumer>
            {context => context &&(
                <div style={{ flexDirection: 'row', width: '200px'}}>
                    <Switch onLabel="Normal"
                            offLabel="Dry Run"
                            vertical={true}
                            value={context.isDryRunMode}
                            handler={() => context.setIsDryRunMode(!context.isDryRunMode)}/>
                    
                    <Button disabled={context.isDryRunMode } style={{ marginLeft: '25%' , width: '100px', fontSize: '11px' }} 
                            handler={callDryTestService} label="Dry Test"/>
                    <Button disabled={ context.isDryRunMode} style={{ marginLeft: '25%', marginTop: '10px' , width: '100px', fontSize: '11px' }} 
                            handler={thrusterActivation} label={ !thrusterActive ? "Activate" : "Deactivate" }/>
                </div>
            )}
        </GeneralContext.Consumer>
    );

};

export default Controls;