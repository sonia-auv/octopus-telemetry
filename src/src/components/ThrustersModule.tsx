import React, { useState, useCallback } from 'react';
import Controls from './Controls';
import Thrusters from './Thrusters';
import { ThrusterLevel } from './Thruster';
import { useROSTopicSubscriber } from '../hooks/useROSTopicSubscriber';

const DEFAULT_NUMBER_OF_THRUSTERS = 8;

const getDefaultThrusters = (): ThrusterLevel[] =>
  getThrusters(DEFAULT_NUMBER_OF_THRUSTERS);

const getThrusters = (numberOfThrusters: number): ThrusterLevel[] =>
  new Array(numberOfThrusters).fill(null).map((thruster, index) => ({
    identification: index,
    effort: 0,
    thumbEnabled: true,
    step: 25,
    minMark: -100,
    maxMark: 100,
  }));

const ThrustersModule = () => {
  const [thrusters, setThrusters] = useState<ThrusterLevel[]>(
    getDefaultThrusters()
  );

  const thrusterEffortCallback = useCallback((x: any) => {
    let data = x.data;
    let parsed = JSON.parse(data);
    setThrusters(parsed);
  }, []);

  useROSTopicSubscriber<any>(
    thrusterEffortCallback,
    '/testSubscribe',
    'std_msgs/String'
  );

  return (
    <div
      key="a"
      data-grid={{
        x: 2,
        y: 0,
        w: 8,
        h: 5,
        minW: 8,
        maxW: 12,
        minH: 3,
        maxH: 6,
      }}
      style={{
        display: 'flex',
      }}
    >
      <Controls />
      <Thrusters thrusters={thrusters} />
    </div>
  );
};

export default ThrustersModule;
