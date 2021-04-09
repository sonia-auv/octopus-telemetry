import React, { FunctionComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Menu as MUIMenu } from '@material-ui/core';

type MenuProps = {
  id?: string
  anchorEl?: Element | ((element: Element) => Element) | null | undefined
  keepMounted?: boolean
  open?: any
  handler: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
};

const GenericMenu = withStyles({

})(MUIMenu);

const Menu: FunctionComponent<MenuProps> = (props) => (
  <GenericMenu
    data-testid="test-menu"
    id={props.id}
    anchorEl={props.anchorEl}
    keepMounted={props.keepMounted}
    open={props.open}
    onClose={props.handler}
  >
  {props.children}
  </GenericMenu>
);

Menu.defaultProps = {
  keepMounted: false,
  open: false
};

export default Menu;
