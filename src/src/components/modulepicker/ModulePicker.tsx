import './modulepicker.css';

// TODO I think this should be fetched from a config file somewhere...
const MODULES = [
  {
    name: 'ImageViewer',
    thumbnailLabel: 'image-viewer-thumbnail',
    thumbnailSource: 'http://placehold.it/300/300',
  },
  {
    name: 'Thrusters',
    thumbnailLabel: 'thrusters-thumbnail',
    thumbnailSource: 'http://placehold.it/300/300',
  },
];

const ModulePicker = (props: any) => (
  <div className="ModulePicker">
    <h1 className="ModulePicker__title">Module Picker</h1>
    <ul className="ModulePicker__list">
      {MODULES.map((module, index) => (
        <li
          draggable={true}
          className="ModulePicker__module"
          data-testid={`test-drag-${module.name}-${index}`}
          key={index}
          onDrop={(e) => {
            console.log('I am dropped x_x', e);
            return e;
          }}
        >
          <span className="ModulePicker__module-label">{module.name}</span>
          <img
            className="ModulePicker__module-thumbnail"
            src={module.thumbnailSource}
            alt={module.thumbnailLabel}
          />
        </li>
      ))}
    </ul>
  </div>
);

export default ModulePicker;
