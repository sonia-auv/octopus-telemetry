import { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List as MUIList } from '@material-ui/core';

type ListProps = {
  maxHeight?: number
};

const List: FunctionComponent<ListProps> = (props) => {

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      position: 'relative',
      overflow: 'auto',
      maxHeight: props.maxHeight,
    },
  }));

  const classes = useStyles(props);

  return (
    <MUIList
      className={classes.root}
    >
      {props.children}
    </MUIList>
  )
};

List.defaultProps = {

};

export default List;
