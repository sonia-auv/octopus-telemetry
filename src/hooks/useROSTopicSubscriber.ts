import { useEffect, useContext } from "react";
import ROSLIB from "roslib";
import { RosContext } from "../context/rosContext";

export const useROSTopicSubscriber = <F>(
    callback: (m: F) => void,
    name: string,
    messageType: string
) => {
    const ros = useContext(RosContext);

    useEffect(() => {
        const topic = new ROSLIB.Topic({
            ros,
            name,
            messageType,
            throttle_rate: 1000,
        });
        topic.subscribe((x) => callback(x as F));

        return () => {
            if (topic) {
                topic.unsubscribe();
            }
        };
    }, [ros, name, messageType, callback]);
};