import React from 'react';
import Button from './common/button/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
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
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>File</MenuItem>
                <MenuItem onClick={handleClose}>Plugins</MenuItem>
                <MenuItem onClick={handleClose}>Running</MenuItem>
                <MenuItem onClick={handleClearLayout}>Clear layout</MenuItem>
                <MenuItem onClick={() => {
                    context.setIsDarkMode(!context.isDarkMode);
                    saveTheme(!context.isDarkMode)
                }}>
                    {context.isDarkMode ? 'Activate light mode': 'Activate dark mode'}
                </MenuItem>
                <MenuItem onClick={handleClose}>Help</MenuItem>

            </Menu>
        </div>
            )}
        </GeneralContext.Consumer>
    );
}

export default MenuModule


