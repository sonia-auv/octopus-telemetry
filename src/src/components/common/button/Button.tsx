import { FunctionComponent } from 'react';
import style from './Button.module.css';

type ButtonProps = {
  label?: string;
  handler: () => void;
  style?: React.CSSProperties;
};

const Button: FunctionComponent<ButtonProps> = (props) => (
  <button
    style={props.style}
    className={style.Button}
    data-testid="test-button"
    onClick={props.handler}
  >
    {props.label}
  </button>
);

Button.defaultProps = {
  label: 'Submit',
  style: {},
};

export default Button;
