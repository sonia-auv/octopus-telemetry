import React, { useState, useCallback, useContext } from 'react';
import { GeneralContext } from "../context/generalContext";
import InputLabel from './common/Input/InputLabel';
import Button from './common/button/Button';
import Select from './common/select/Select';
import FormControl from './common/Form/FormControl';

import { useROSService} from '../hooks/useROSService'
import { useROSTopicPublisher, MessageFactory } from "../hooks/useROSTopicPublisher";

const ControlModule = () => {

    const [currentMissionName, setCurrentMissionName] = useState("");
    const [allMissions, setMissionsList] = useState<[]>([]);

    const defaultHandler = () => {}

    return (
        <GeneralContext.Consumer>
            {context => context && (
                <div style={{ width: '100%', height: '100%', flexDirection: 'row', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '20px', textAlign: 'center' }}>Control Module</h1>            
                    <Button disabled={allMissions.length === 0} style={{ fontSize: '20px', alignSelf: 'center' }} handler={defaultHandler} label="Test"/>
                </div>
            )}
        </GeneralContext.Consumer>
    );
};

export default ControlModule;
