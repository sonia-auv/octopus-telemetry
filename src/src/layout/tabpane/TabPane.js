import React from 'react';
import Module from '../../Module';

const TabPane = (props) => {
  return (
    <div className="TabPane">
      <h4>{props.title}</h4>
      <Module name="Thrusters" />
      <Module name="Map" />
    </div>
  );
};

export default TabPane;
