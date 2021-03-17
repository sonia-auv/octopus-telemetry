import { FunctionComponent, useState } from 'react';
import './switch.css';

type SwitchProps = {
  onLabel?: string;
  offLabel?: string;
  value: boolean;
  vertical?: boolean;
  handler: (value: boolean) => void;
};

const getLabelClassname = (checked: boolean) =>
  checked ? 'Switch__label-checked' : 'Switch__label-unchecked';

const Switch: FunctionComponent<SwitchProps> = (props) => {
  const [on, toggle] = useState(props.value);

  return (
    <div className={`Switch__container ${props.vertical ? 'vertical' : ''}`}>
      <p className={getLabelClassname(props.value)}>{props.onLabel}</p>
      <label className={`switch ${props.vertical ? 'vertical' : ''}`}>
        <input
          type="checkbox"
          checked={on}
          onChange={() => {
            toggle(!on);
            props.handler(on);
          }}
          data-testid="test-switch"
        />
        <span className="Switch__slider round"></span>
      </label>
      <p className={getLabelClassname(!props.value)}>{props.offLabel}</p>
    </div>
  );
};

Switch.defaultProps = {
  onLabel: 'On',
  offLabel: 'Off',
  vertical: false,
};

export default Switch;
