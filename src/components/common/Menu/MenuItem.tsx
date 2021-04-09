import React, { FunctionComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { MenuItem as MUIMenuItem } from '@material-ui/core';

type MenuItemProps = {
  id?: string | undefined
  value?: number | string | readonly string [] | undefined
  handler: (event: React.MouseEvent<HTMLLIElement>) => void;
};

const GenericMenuItem = withStyles({

})(MUIMenuItem);

const MenuItem: FunctionComponent<MenuItemProps> = (props) => (
  <GenericMenuItem
    onClick={props.handler}
    value={props.value}
    id={props.id}
  >
  {props.children}
  </GenericMenuItem>
);

MenuItem.defaultProps = {

};

export default MenuItem;
