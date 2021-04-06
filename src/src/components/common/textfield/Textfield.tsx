import React, { FunctionComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField as MUITextField } from '@material-ui/core';

type TextFieldProps = {
  value?: unknown
  handlerChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handlerKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  id?: string
  label?: string | React.ReactNode;
  style?: React.CSSProperties;
  name?: string
  type?: string
  color?: "primary" | "secondary" | undefined
  autoFocus?: boolean
  fullWidth?: boolean
  disabled?: boolean
};

const DEFAULT_TEXTFIELD_STYLE = {

};

const GenericTextField = withStyles({
  root: {
      color: 'white',
      backgroundColor: 'white',
  }
})(MUITextField);

const TextField: FunctionComponent<TextFieldProps> = (props) => (
  <GenericTextField
    variant="outlined"
    style={{
      ...DEFAULT_TEXTFIELD_STYLE,
      ...props.style,
    }}
    data-testid="test-textfield"
    onChange={props.handlerChange}
    onKeyDown={props.handlerKeyDown}
    label={props.label}
    value={props.value}
    name={props.name}
    type={props.type}
    color={props.color} 
    autoFocus={props.autoFocus} 
    fullWidth={props.fullWidth}
    disabled={props.disabled}
  >
  </GenericTextField>
);

TextField.defaultProps = {
  label: 'Select',
  style: {},
  name: undefined,
  type: undefined,
  color: undefined,
  autoFocus: false,
  fullWidth: false,
  disabled: false
};

export default TextField;
