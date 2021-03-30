import React from 'react';
import Button from './common/button/Button';
import Menu from './common/Menu/Menu';
import MenuItem from './common/Menu/MenuItem';
import { MMenuIcon as MenuIcon } from './common/Menu/MenuIcon';
import {GeneralContext} from "../context/generalContext";

const MenuModule = (props: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    const handleClearLayout = () => {
        localStorage.clear()
        window.location.reload()
    }
    const saveTheme = (bool: boolean) => {
        localStorage.setItem("isDarkMode", bool.toString())
    }
    return (
        <GeneralContext.Consumer>
            {context => context &&(
        <div>
            <Button label={<MenuIcon />} handler={handleClick} />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                handler={handleClose}
            >
                <MenuItem handler={handleClose}>File</MenuItem>
                <MenuItem handler={handleClose}>Plugins</MenuItem>
                <MenuItem handler={handleClose}>Running</MenuItem>
                <MenuItem handler={handleClearLayout}>Clear layout</MenuItem>
                <MenuItem handler={() => {
                    context.setIsDarkMode(!context.isDarkMode);
                    saveTheme(!context.isDarkMode)
                }}>
                    {context.isDarkMode ? 'Activate light mode': 'Activate dark mode'}
                </MenuItem>
                <MenuItem handler={handleClose}>Help</MenuItem>

            </Menu>
        </div>
            )}
        </GeneralContext.Consumer>
    );
}

export default MenuModule


