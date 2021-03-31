import { useCallback,useContext } from 'react';

import Switch from './common/switch/Switch';
import Button from './common/button/Button';

import { GeneralContext } from "../context/generalContext";
import { useROSService, ServiceRequestFactory } from '../hooks/useROSService'

const ActuatorModule = () => {

    // Reponse en retour a l appel du service
    const actuactorServiceCallback = useCallback(
        (x: any) => {
        }, []
    )

    const context = useContext(GeneralContext)
    const actuactorServiceCall = useROSService<any>(actuactorServiceCallback, "/provider_actuators/do_action_srv", "sonia_common/ActuatorDoActionSrv")

    // FORMATAGE DU MESSAGE A ENVOYER AU SERVICE A VERIFIER
    const HandleChangeSwitch = (value: any) => {

        context.setIsRoboticArmClosed(!context.isRoboticArmClosed)
        var request = ServiceRequestFactory({
            element: 2,
            side: !value,
            action: 1
        });
        actuactorServiceCall(request)
    } 

    // FORMATAGE DU MESSAGE A ENVOYER AU SERVICE A VERIFIER
    const handleChangeButtonTorpedo = () => {
        var request = ServiceRequestFactory({
            element: 0,
            side: 0,
            action: 1
        });
        actuactorServiceCall(request)
    }

    // FORMATAGE DU MESSAGE A ENVOYER AU SERVICE A VERIFIER
    const handleChangeButtonDropObject = () => {
        var request = ServiceRequestFactory({
            element: 1,
            side: 0,
            action: 1
        });
        actuactorServiceCall(request)
    }

    return (
        <GeneralContext.Consumer>
            {context => context && (
                <div style={{ width: '100%', height: '100%', flexDirection: 'row', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '20px', textAlign: 'center' }}>ROBOTIC ARM</h1>
                    <Switch onLabel="Open"
                        offLabel="Closed"
                        vertical={false}
                        value={!context.isRoboticArmClosed}
                        handler={HandleChangeSwitch} />
                    <h1 style={{ fontSize: '20px', textAlign: 'center' }}>TORPEDO</h1>
                    <Button  style={{ fontSize: '20px', alignSelf: 'center' }} handler={handleChangeButtonTorpedo} label="Launch" />
                    <h1 style={{ fontSize: '20px', textAlign: 'center' }}>DROP OBJECT</h1>
                    <Button  style={{ fontSize: '20px', alignSelf: 'center' }} handler={handleChangeButtonDropObject} label="Drop" />
                </div>
            )}
        </GeneralContext.Consumer>
    );
};

export default ActuatorModule;