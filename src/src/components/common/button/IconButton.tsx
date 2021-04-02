import React, { FunctionComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { IconButton as MUIIconButton, PropTypes } from '@material-ui/core';

type IconButtonProps = {
  edge?: false | "start" | "end" | undefined
  color?: PropTypes.Color | undefined
  arialabel?: string | undefined
};

const GenericIconButton = withStyles({

})(MUIIconButton);

const IconButton: FunctionComponent<IconButtonProps> = (props) => (
  <GenericIconButton
    edge={props.edge}
    color={props.color}
    aria-label={props.arialabel}
  >
  {props.children}
  </GenericIconButton>
);

IconButton.defaultProps = {

};

export default IconButton;
