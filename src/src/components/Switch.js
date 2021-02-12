import React, { useState } from 'react';
import './switch.css';
import {useGeneral} from "../context/testContext";

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
  const {isDryRunMode, setDryMode} = useGeneral()
    console.log("--------")
    console.log(isDryRunMode)

  return (
    <div className={`Switch__container ${props.vertical ? 'vertical' : ''}`}>
      <p style={isOn ? selectedTextStyle : unselectedTextStyle}>
        {props.onLabel}
      </p>
      <label className={`switch ${props.vertical ? 'vertical' : ''}`}>
        <input type="checkbox" checked={isDryRunMode} onChange={() => setDryMode(true)} />
        <span className="slider round"></span>
      </label>
      <p style={!isOn ? selectedTextStyle : unselectedTextStyle}>
        {props.offLabel}
      </p>
    </div>
  );
};

export default Switch;
