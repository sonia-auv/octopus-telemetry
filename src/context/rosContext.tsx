import React from 'react';
import * as ROSLIB from 'roslib';

export const RosContext = React.createContext(new ROSLIB.Ros({
    url: 'ws://' + process.env["ROS_IP"] + ':9090'
}))
