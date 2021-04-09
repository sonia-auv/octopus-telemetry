import { FunctionComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Checkbox as MUICheckbox } from '@material-ui/core';

type CheckboxProps = {
  name?: string
  color?: "primary" | "secondary" | "default" | undefined
  checked?: boolean
  handler?: ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void | undefined);
};

const GenericCheckbox = withStyles({

})(MUICheckbox);

const Checkbox: FunctionComponent<CheckboxProps> = (props) => (
  <GenericCheckbox
    name={props.name}
    color={props.color}
    checked={props.checked}
    onChange={props.handler}
  >
  </GenericCheckbox>
);

Checkbox.defaultProps = {

};

export default Checkbox
