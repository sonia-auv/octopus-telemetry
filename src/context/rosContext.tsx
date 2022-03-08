import React from 'react';
import * as ROSLIB from 'roslib';

export const RosContext = React.createContext(new ROSLIB.Ros({
    url: 'ws://' + process.env.REACT_APP_BRIDGE_IP + ':9090'
}))
