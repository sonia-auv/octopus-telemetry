import { FunctionComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormControlLabel as MUIFormControlLabel } from '@material-ui/core';

type FormControlLabelProps = {
  control?: any
  label?: React.ReactNode
};

const GenericFormControlLabel = withStyles({

})(MUIFormControlLabel);

const FormControlLabel: FunctionComponent<FormControlLabelProps> = (props) => (

  <GenericFormControlLabel
    control={props.control}
    label={props.label}
  >
    {props.children}
  </GenericFormControlLabel>
);

FormControlLabel.defaultProps = {

};

export default FormControlLabel;
