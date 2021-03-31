import React from 'react';

type ModuleProps = {
  name: string;
  thumbnailSource: string;
  thumbnailLabel: string;
  id: number;
};

const Module = (props: ModuleProps) => (
  <li
    className="ModulePicker__module"
    data-testid={`test-drag-${props.name}-${props.id}`}
    key={props.id}
  >
    <span className="ModulePicker__module-label">{props.name}</span>
    <img
      className="ModulePicker__module-thumbnail"
      src={props.thumbnailSource}
      alt={props.thumbnailLabel}
    />
  </li>
);

export default Module;
