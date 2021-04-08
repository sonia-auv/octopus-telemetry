import { FunctionComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography as MUITypography } from '@material-ui/core';

type TypographyProps = {
};

const GenericTypography = withStyles({

})(MUITypography);

const Typography: FunctionComponent<TypographyProps> = (props) => (
  <GenericTypography
  >
    {props.children}
  </GenericTypography>
);

Typography.defaultProps = {

};

export default Typography;
