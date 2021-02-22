import React, { useCallback,useContext } from 'react';
import Switch from './Switch';
import { GeneralContext } from "../context/generalContext";
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useROSService } from '../hooks/useROSService'
import ROSLIB from "roslib";

const ActuatorModule = () => {

    const ButtonStyle = withStyles({
        contained: {
            backgroundColor: 'lightgrey',
            border: '2px solid rgba(0, 0, 0, 1.0)'
        },

    })(Button);

    // Reponse en retour a l appel du service
    const actuactorServiceCallback = useCallback(
        (x: any) => {
        }, []
    )

    const context = useContext(GeneralContext)
    const actuactorServiceCall = useROSService<any>(actuactorServiceCallback, "/provider_actuators/do_action_srv", "provider_actuators")

    // FORMATAGE DU MESSAGE A ENVOYER AU SERVICE A VERIFIER
    const HandleChangeSwitch = (value: any) => {

        context.setIsRoboticArmClosed(!context.isRoboticArmClosed)
        var request = new ROSLIB.ServiceRequest({
            ELEMENT_ARM: 2,
            ARM_OPEN: !value,
            ACTION_ARM_EXEC: 1
        });
        actuactorServiceCall(request)
    } 

    // FORMATAGE DU MESSAGE A ENVOYER AU SERVICE A VERIFIER
    const handleChangeButtonTorpedo = () => {
        var request = new ROSLIB.ServiceRequest({
            ELEMENT_TORPEDO: 0,
            SIDE_PORT: 0,
            ACTION_DROPPER_LAUCH: 1
        });
        actuactorServiceCall(request)
    }

    // FORMATAGE DU MESSAGE A ENVOYER AU SERVICE A VERIFIER
    const handleChangeButtonDropObject = () => {
        var request = new ROSLIB.ServiceRequest({
            ELEMENT_TORPEDO: 1,
            SIDE_PORT: 0,
            ACTION_DROPPER_LAUCH: 1
        });
        actuactorServiceCall(request)
    }

    return (
        <GeneralContext.Consumer>
            {context => context && (
                <div style={{ width: '100%', height: '100%', flexDirection: 'row', backgroundColor: '#85D2BB', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '20px', textAlign: 'center' }}>ROBOTIC ARM</h1>
                    <Switch onLabel="Open"
                        offLabel="Closed"
                        vertical={false}
                        value={!context.isRoboticArmClosed}
                        handler={HandleChangeSwitch} />
                    <h1 style={{ fontSize: '20px', textAlign: 'center' }}>TORPEDO</h1>
                    <ButtonStyle variant='contained' style={{ fontSize: '20px', alignSelf: 'center' }} onClick={handleChangeButtonTorpedo}>LAUNCH</ButtonStyle>
                    <h1 style={{ fontSize: '20px', textAlign: 'center' }}>DROP OBJECT</h1>
                    <ButtonStyle variant='contained' style={{ fontSize: '20px', alignSelf: 'center' }} onClick={handleChangeButtonDropObject}>DROP</ButtonStyle>
                </div>
            )}
        </GeneralContext.Consumer>
    );
};

export default ActuatorModule;
