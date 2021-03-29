import React, { FunctionComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button as MUIButton } from '@material-ui/core';

type ButtonProps = {
  label?: string | React.ReactNode;
  handler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
  disabled?: boolean;
  className?: string
};

const DEFAULT_BUTTON_STYLE = {
  backgroundColor: 'white',
  border: '1px solid blue',
};

const GenericButton = withStyles({
  contained: {
    backgroundColor: 'lightgrey',
    border: '2px solid black',
  },
})(MUIButton);

const Button: FunctionComponent<ButtonProps> = (props) => (
  <GenericButton
    variant="contained"
    className={props.className}
    style={{
      ...DEFAULT_BUTTON_STYLE,
      ...props.style,
    }}
    data-testid="test-button"
    onClick={props.handler}
    disabled={props.disabled}
  >
    {props.label}
  </GenericButton>
);

Button.defaultProps = {
  label: 'Submit',
  style: {},
  disabled: false,
};

export default Button;