import React from 'react';
import Checkbox from '../common/checkbox/Checkbox'

type ModuleProps = {
  name: string;
  thumbnailSource: string;
  thumbnailLabel: string;
  id: number;
  inUse: boolean;
};

const Module = (props: ModuleProps) => (
  <li
    className="ModulePicker__module"
    data-testid={`test-drag-${props.name}-${props.id}`}
    key={props.id}
  >
    <Checkbox label={props.name} value={props.inUse} handler={() => {
      console.log('handle it!')
    }} />
    {/* <span className="ModulePicker__module-label">{props.name}</span> */}
    <img
      className="ModulePicker__module-thumbnail"
      src={props.thumbnailSource}
      alt={props.thumbnailLabel}
    />

  </li>
);

export default Module;
