import React from 'react';
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
    return (
        <div className={`Switch__container ${props.vertical ? 'vertical' : ''}`}>
            <p style={props.value ? selectedTextStyle : unselectedTextStyle}>
                {props.onLabel}
            </p>
            <label className={`switch ${props.vertical ? 'vertical' : ''}`}>
                <input type="checkbox" checked={props.value} onChange={() => props.handler(props.value)} />
                <span className="slider round"></span>
            </label>
            <p style={!props.value ? selectedTextStyle : unselectedTextStyle}>
                {props.offLabel}
            </p>
        </div>
    );
};

export default Switch;
