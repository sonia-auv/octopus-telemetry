import React from 'react';
import Draggable from 'react-draggable';

const Module = (props) => {
  return (
    <Draggable grid={[25, 25]} handle=".handle">
      <div
        style={{
          background: '#f0f0f0',
          border: '2px dashed #303030',
          height: '300px',
          width: '500px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
          fontFamily: "'Roboto Mono', monospace",
          resize: 'both',
          overflow: 'auto',
        }}
      >
        <h3>{props.name}</h3>
        <span
          style={{
            border: '2px dashed #808080',
            padding: 8,
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: 8,
          }}
          className="handle"
        >
          move
        </span>
        <span
          style={{
            border: '2px dashed #808080',
            padding: 8,
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}
        >
          resize
        </span>
      </div>
    </Draggable>
  );
};

export default Module;
