import { FunctionComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar as MUIAppBar, PropTypes } from '@material-ui/core';

type AppBarProps = {
  position?: "fixed" | "absolute" | "sticky" | "static" | "relative" | undefined
  style?: React.CSSProperties;
  color?: PropTypes.Color | "transparent" | undefined
};

const DEFAULT_APPBAR_STYLE = {

};

const GenericAppBar = withStyles({

})(MUIAppBar);

const AppBar: FunctionComponent<AppBarProps> = (props) => (
  <GenericAppBar
    position={props.position}
    style={{
      ...DEFAULT_APPBAR_STYLE,
      ...props.style,
    }}
    color={props.color}
  >
  {props.children}
  </GenericAppBar>
);

AppBar.defaultProps = {

};

export default AppBar;
