import { FunctionComponent, useState } from 'react';
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

  return (
    <div className={`Switch__container ${props.vertical ? 'vertical' : ''}`}>
      <p className={getLabelClassname(on)}>{props.onLabel}</p>
      <label className={`switch ${props.vertical ? 'vertical' : ''}`}>
        <input
          type="checkbox"
          checked={on}
          onChange={() => {
            // Allows us to test the component (w/ mock handler)
            setOn(!on);

            // We dispatch the parent with the switch value
            props.handler(on);
          }}
          data-testid="test-switch"
        />
        <span className={`Switch__slider ${props.round ? 'round' : ''}`}></span>
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
