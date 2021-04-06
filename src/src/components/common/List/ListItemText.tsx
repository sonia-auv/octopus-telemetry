import { FunctionComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ListItemText as MUIListItemText } from '@material-ui/core';

type ListItemTextProps = {
  primary?: React.ReactNode
  handler?: (event: React.MouseEvent<HTMLDivElement>) => void;
};


const GenericListItemText = withStyles({

})(MUIListItemText);

const ListItemText: FunctionComponent<ListItemTextProps> = (props) => (
  <GenericListItemText
    primary={props.primary}
    onClick={props.handler}
  >
    {props.children}
  </GenericListItemText>
);

ListItemText.defaultProps = {

};

export default ListItemText;
