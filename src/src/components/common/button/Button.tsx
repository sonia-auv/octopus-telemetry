import { FunctionComponent } from 'react';

type ButtonProps = {
  label?: string;
  handler: () => void;
  style?: React.CSSProperties;
};

const DEFAULT_BUTTON_STYLE = {
  backgroundColor: 'white',
  border: '1px solid blue',
};

const Button: FunctionComponent<ButtonProps> = (props) => (
  <button
    style={{
      ...DEFAULT_BUTTON_STYLE,
      ...props.style,
    }}
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
