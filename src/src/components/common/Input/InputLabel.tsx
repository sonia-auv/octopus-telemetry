import React, { FunctionComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { InputLabel as MUIInputLabel } from '@material-ui/core';

type InputLabelProps = {
  id?: string
};

const DEFAULT_INPUTLAB_STYLE = {

};

const GenericInputLabel = withStyles({

})(MUIInputLabel);

const InputLabel: FunctionComponent<InputLabelProps> = (props) => (
  <GenericInputLabel
    data-testid="test-inputLabel"
    id={props.id}
  >
  {props.children}
  </GenericInputLabel>
);

InputLabel.defaultProps = {

};

export default InputLabel;
