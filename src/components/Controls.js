import React, { useCallback, useState } from 'react';
import Switch from './common/switch/Switch';
import Button from './common/button/Button';
import {GeneralContext} from "../context/generalContext";
import { useROSService} from '../hooks/useROSService'
import ROSLIB from 'roslib';
import { FastfoodOutlined } from '@material-ui/icons';

const Controls = (props) => {

    const [dryTestActive, setdryTestActive] = useState(false);

    const callDryTestService = async () => {

        dryTestServiceCall(); 
    }

    const dryTestCallback = useCallback(
        () => {
            setdryTestActive(false);
          },
          []
        
    )

    const dryTestServiceCall = useROSService(dryTestCallback, "/provider_thrusters/dry_test", "std_srvs/Empty")

    return (
        <GeneralContext.Consumer>
            {context => context &&(
                <div style={{ flexDirection: 'row' }}>
                    <Switch onLabel="Normal"
                            offLabel="Dry Run"
                            vertical={true}
                            value={context.isDryRunMode}
                            handler={() => context.setIsDryRunMode(!context.isDryRunMode)}/>

                    <Switch onLabel="PWM"
                            offLabel="Rel. (%)"
                            vertical={false}
                            value={context.isRelativeUnits}
                            handler={() => context.setIsRelativeUnits(!context.isRelativeUnits)}/>
                    
                    <Button disabled={context.isDryRunMode } style={{ marginLeft: '25%' , fontSize: '9px' }} handler={callDryTestService} label="Dry Test"/>
                </div>
            )}
        </GeneralContext.Consumer>
    );
};

export default Controls;