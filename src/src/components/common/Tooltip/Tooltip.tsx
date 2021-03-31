import { FunctionComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip as MUITooltip } from '@material-ui/core';

type ToolTipProps = {
   title?: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal
   children?: React.ReactElement<any, any>
};

const GenericToolTip = withStyles({

})(MUITooltip);

const ToolTip: FunctionComponent<ToolTipProps> = (props) => (
  <div></div>
);

ToolTip.defaultProps = {

};

export default ToolTip;