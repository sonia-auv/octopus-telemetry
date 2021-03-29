import ListItem from '@material-ui/core/ListItem';
import { makeStyles, withStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    contained: {
        backgroundColor: 'lightgrey',
        border: '2px solid rgba(0, 0, 0, 1.0)'
    },
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

export const ListItemStyle = withStyles({
    root: {
        "&.Mui-selected": {
            backgroundColor: "cornflowerblue"
        },
        "&.MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover": {
            backgroundColor: "cornflowerblue"
        },
    },
})(ListItem);

const VisionUICommonModule = () => {};
export default VisionUICommonModule;
