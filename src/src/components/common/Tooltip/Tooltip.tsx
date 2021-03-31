import { FunctionComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip as MUITooltip } from '@material-ui/core';

type ToolTipProps = {
  title?: any
};

const GenericToolTip = withStyles({

})(MUITooltip);

const ToolTip: FunctionComponent<ToolTipProps> = (props) => (

  <GenericToolTip
    title={props.title}
    placement='top-start'
    >
    <div>
      {props.children}
    </div>
  </GenericToolTip>
);

ToolTip.defaultProps = {

};

export default ToolTip;