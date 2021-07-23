import React from 'react';
import * as ROSLIB from 'roslib';

export const RosContext = React.createContext(new ROSLIB.Ros({
    url: 'ws://192.168.0.31:9090'
}))