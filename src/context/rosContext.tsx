import React from 'react';
import * as ROSLIB from 'roslib';

export const RosContext = React.createContext(new ROSLIB.Ros({
    url: 'ws://localhost:9090'
}))
