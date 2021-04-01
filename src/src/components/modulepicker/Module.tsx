import Checkbox from '../common/checkbox/Checkbox';

type ModuleProps = {
  name: string;
  thumbnailSource: string;
  thumbnailLabel: string;
  id: number;
  inUse: boolean;
  toggleInUse: (v: boolean) => void;
};

const Module = (props: ModuleProps) => (
  <li
    className="ModulePicker__module"
    data-testid={`test-drag-${props.name}-${props.id}`}
    key={props.id}
  >
    <Checkbox
      label={props.name}
      value={props.inUse}
      handler={props.toggleInUse}
    />
    <img
      className="ModulePicker__module-thumbnail"
      src={props.thumbnailSource}
      alt={props.thumbnailLabel}
    />
  </li>
);

export default Module;
