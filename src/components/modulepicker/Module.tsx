import Check from '../common/check/Check';
import ImageZoom from 'react-medium-image-zoom';

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
    <Check label={props.name} value={props.inUse} handler={props.toggleInUse} />
    <ImageZoom
      image={{
        src: props.thumbnailSource,
        alt: props.thumbnailLabel,
        className: 'ModulePicker__module-thumbnail',
      }}
      zoomImage={{
        src: props.thumbnailSource,
        alt: `${props.thumbnailLabel}-big`,
      }}
    />
  </li>
);

export default Module;
