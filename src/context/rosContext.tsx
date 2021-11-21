import React from 'react';
import * as ROSLIB from 'roslib';

export const RosContext = React.createContext(new ROSLIB.Ros({
    // TODO try this (after competition) url: `ws://${process.env.ROS_IP}:9090`
    url: `ws://192.168.0.31:9090`
}))
