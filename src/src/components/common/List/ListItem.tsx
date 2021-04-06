import { FunctionComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ListItem as MUIListItem } from '@material-ui/core';

type ListItemProps = {
  style?: React.CSSProperties;
  selected?: boolean
  autoFocus?: boolean
};

const DEFAULT_LISTITEM_STYLE = {

};

const GenericListItem = withStyles({
  root: {
    "&.Mui-selected": {
      backgroundColor: "cornflowerblue"
    },
    "&.MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover": {
      backgroundColor: "cornflowerblue"
    },
  },
})(MUIListItem);

const ListItem: FunctionComponent<ListItemProps> = (props) => (
  <GenericListItem
    button={true}
    selected={props.selected}
    autoFocus={props.autoFocus}
    style={{
      ...DEFAULT_LISTITEM_STYLE,
      ...props.style,
    }}
  >
    {props.children}
  </GenericListItem>
);

ListItem.defaultProps = {
  selected: false
};

export default ListItem;
