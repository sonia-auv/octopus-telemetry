import { useState, useEffect, useContext } from "react";
import ROSLIB from "roslib";
import { RosContext } from "../context/rosContext";

export const useROSTopicPublisher = <F>(
  name: string,
  messageType: string
) => {
  const ros = useContext(RosContext);
  const [topic, setTopic] = useState<ROSLIB.Topic | null>(null);

  useEffect(() => {
    setTopic(
      new ROSLIB.Topic({
        ros,
        name,
        messageType,
        throttle_rate: 1000,
      })
    );
  }, [ros]);

  return (x: F) => {
    if (topic) {
      topic.publish(x);
    }
  };
};