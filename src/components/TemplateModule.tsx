import React, { useState } from 'react';
import { GeneralContext } from "../context/generalContext";
import Button from './common/button/Button';

import { useROSTopicPublisher, MessageFactory } from "../hooks/useROSTopicPublisher";
import { useROSTopicSubscriber } from '../hooks/useROSTopicSubscriber';

const TemplateModule = () => {
    return (
        <GeneralContext.Consumer>
            {context => context && (
            <div style={{ width: '100%', height: '100%', flexDirection: 'row', textAlign: 'center' }}>
                <h1 style={{ fontSize: '20px', textAlign: 'center' }}>Template Module</h1>   
            </div>
            )}
        </GeneralContext.Consumer>
    );
};

export default TemplateModule;
