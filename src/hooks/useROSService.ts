import { useState, useEffect, useContext } from "react";
import ROSLIB, { Topic } from "roslib";
import { RosContext } from "../context/rosContext";

export const useROSService = <F>(
    callback: (m: F) => void,
    name: string,
    serviceType: string
) => {
    const ros = useContext(RosContext);
    const [service, setService] = useState<ROSLIB.Service| null>(null);

    useEffect(() => {
        setService(
            new ROSLIB.Service({
                ros,
                name,
                serviceType,
            })
        );
    }, [ros]);

    return (x: ROSLIB.ServiceRequest) => {
        if (service) {
            service.callService(x, (y) => callback(y as F));
        }
    }
};

export function ServiceRequestFactory(x: any):ROSLIB.ServiceRequest { return new ROSLIB.ServiceRequest(x) };
export function TopicFactory(x: any):ROSLIB.Topic { return new ROSLIB.Topic(x) };
export type { Topic };