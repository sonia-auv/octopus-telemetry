import { makeStyles, withStyles } from '@material-ui/core/styles';
import { FormControl as MUIFormControl } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const GenericFormControl = withStyles({

})(MUIFormControl);

const FormControl = (props : any) => {

  const classes = useStyles();
  return (
    <GenericFormControl
      data-testid="test-FormControl"
      variant="filled"
      className={classes.formControl}
    >
      {props.children}
    </GenericFormControl>
  )

};

FormControl.defaultProps = {

};

export default FormControl;
