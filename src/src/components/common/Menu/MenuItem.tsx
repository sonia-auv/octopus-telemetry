import React, { FunctionComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { MenuItem as MUIMenuItem } from '@material-ui/core';

type MenuItemProps = {
  handler: (event: React.MouseEvent<HTMLLIElement>) => void;
};

const DEFAULT_MENUITEM_STYLE = {

};

const GenericMenuItem = withStyles({

})(MUIMenuItem);

const MenuItem: FunctionComponent<MenuItemProps> = (props) => (
  <GenericMenuItem
    onClick={props.handler}
  >
  {props.children}
  </GenericMenuItem>
);

MenuItem.defaultProps = {

};

export default MenuItem;
