import { FunctionComponent, useState } from 'react';
import { default as MUISwitch } from '@material-ui/core/Switch';
import './switch.css';

type SwitchProps = {
  onLabel?: string;
  offLabel?: string;
  value: boolean;
  vertical?: boolean;
  handler: (value: boolean) => void;
  round?: boolean;
};

const getLabelClassname = (checked: boolean) =>
  checked ? 'Switch__label-checked' : 'Switch__label-unchecked';

const Switch: FunctionComponent<SwitchProps> = (props) => {
  const [on, setOn] = useState(props.value);

  const handleChange = () => {
    setOn(!on);
    props.handler(on);
  };

  return (
    <div className={`Switch__container ${props.vertical ? 'vertical' : ''}`}>
      <p className={getLabelClassname(on)}>{props.onLabel}</p>
      <label className={`switch ${props.vertical ? 'vertical' : ''}`}>
        <MUISwitch
          data-testid="test-switch"
          value="Active"
          checked={on}
          onChange={handleChange}
        />
      </label>
      <p className={getLabelClassname(!on)}>{props.offLabel}</p>
    </div>
  );
};

Switch.defaultProps = {
  onLabel: 'On',
  offLabel: 'Off',
  vertical: false,
  round: true,
};

export default Switch;
