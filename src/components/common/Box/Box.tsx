import { FunctionComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Box as MUIBox } from '@material-ui/core';

type BoxProps = {
  p?: any
};

const GenericBox = withStyles({

})(MUIBox);

const Box: FunctionComponent<BoxProps> = (props) => (
  <GenericBox
    p={props.p}
  >
    {props.children}
  </GenericBox>
);

Box.defaultProps = {

};

export default Box;
