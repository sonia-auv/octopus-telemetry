import React, { FunctionComponent } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Button as MUIButton } from '@material-ui/core';

type ButtonProps = {
  label?: string | React.ReactNode;
  handler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
  disabled?: boolean;
  className?: string
  isIcon?: boolean
};

const DEFAULT_BUTTON_STYLE = {
  backgroundColor: 'white',
  border: '1px solid blue',
};

const GenericButton = withStyles({
  contained: {
    backgroundColor: 'lightgrey',
    border: '2px solid black',
  },
})(MUIButton);

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    "& .MuiButton-iconSizeMedium > *:first-child": {
        fontSize: "20px"
    },
    "& .MuiButton-startIcon": {
        marginLeft: "-2px",
        marginRight: "0px"
    }
},
}));

const Button: FunctionComponent<ButtonProps> = (props) => {

  const classes = useStyles();

  if (props.isIcon) {

    return (
      <MUIButton
        variant="contained"
        className={classes.button}
        style={{
          ...DEFAULT_BUTTON_STYLE,
          ...props.style,
        }}
        data-testid="test-button"
        onClick={props.handler}
        disabled={props.disabled}
      >
        {props.label}
      </MUIButton>
    )

  } 
  else 
  {

    return (
      <GenericButton
        variant="contained"
        className={props.className}
        style={{
          ...DEFAULT_BUTTON_STYLE,
          ...props.style,
        }}
        data-testid="test-button"
        onClick={props.handler}
        disabled={props.disabled}
      >
        {props.label}
      </GenericButton>
    )
    
  }
};

Button.defaultProps = {
  label: 'Submit',
  style: {},
  disabled: false,
  isIcon: false
};

export default Button;
