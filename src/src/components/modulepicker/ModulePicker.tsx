import {useState} from 'react'
import './modulepicker.css';
import Module from './Module';

// TODO I think this should be fetched from a config file somewhere...
const MODULES = [
  {
    name: 'ImageViewer',
    thumbnailLabel: 'image-viewer-thumbnail',
    thumbnailSource: 'http://placehold.it/300/300',
    inUse: true
  },
  {
    name: 'Thrusters',
    thumbnailLabel: 'thrusters-thumbnail',
    thumbnailSource: 'http://placehold.it/300/300',
    inUse: false
  },
];

const ModulePicker = (props: any) => {
  const [selected, setSelected] = useState([])

  return (<div className="ModulePicker">
    <h1 className="ModulePicker__title">Module Picker</h1>
    <ul className="ModulePicker__list">
      {MODULES.map((module, index) => (
        <Module
          name={module.name}
          id={index}
          thumbnailSource={module.thumbnailSource}
          thumbnailLabel={module.thumbnailLabel}
          inUse={module.inUse}
        />
      ))}
    </ul>
  </div>)
};

export default ModulePicker;
