import { FunctionComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Toolbar as MUIToolbar } from '@material-ui/core';

type ToolbarProps = {

};

const GenericToolbar = withStyles({

})(MUIToolbar);

const Toolbar: FunctionComponent<ToolbarProps> = (props) => (
  <GenericToolbar
  >
  {props.children}
  </GenericToolbar>
);

Toolbar.defaultProps = {

};

export default Toolbar;
