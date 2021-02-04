import React, { useState } from 'react';
import './switch.css';

const selectedTextStyle = {
  fontWeight: 'bold',
  opacity: 0.95,
};

const unselectedTextStyle = {
  fontWeight: 'normal',
  opacity: 0.8,
};

const Switch = (props) => {
  let [isOn, toggle] = useState(false);

  return (
    <div className={`Switch__container ${props.vertical ? 'vertical' : ''}`}>
      <p style={isOn ? selectedTextStyle : unselectedTextStyle}>
        {props.onLabel}
      </p>
      <label className={`switch ${props.vertical ? 'vertical' : ''}`}>
        <input type="checkbox" checked={isOn} onChange={() => toggle(!isOn)} />
        <span className="slider round"></span>
      </label>
      <p style={!isOn ? selectedTextStyle : unselectedTextStyle}>
        {props.offLabel}
      </p>
    </div>
  );
};

export default Switch;
