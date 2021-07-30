import React from 'react';
import * as ROSLIB from 'roslib';

export const RosContext = React.createContext(new ROSLIB.Ros({
    url: process.env.ROS_BRIDGE_URI ? process.env.ROS_BRIDGE_URI : 'ws://localhost:9090'
}))