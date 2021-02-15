import React from 'react';
import Thruster, { ThrusterLevel } from './Thruster';

type ThrustersProps = {
  thrusters: ThrusterLevel[];
};

const Thrusters = ({ thrusters }: ThrustersProps) => (
  <ul style={{ display: 'flex' }}>
    {thrusters.map((thruster, index) => (
      <li key={index}>
        <Thruster
          effort={thruster.effort}
          identification={thruster.identification}
          minMark={thruster.minMark}
          maxMark={thruster.maxMark}
          step={thruster.step}
          thumbEnabled={thruster.thumbEnabled}
        />
      </li>
    ))}
  </ul>
);

export default Thrusters;
