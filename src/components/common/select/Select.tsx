import React, { FunctionComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Select as MUISelect } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';

type SelectProps = {
  value?: unknown
  labelId?: string
  handlerChange: ((event: React.ChangeEvent<{ name?: string | undefined, value: unknown }>, child: React.ReactNode) => void) | undefined;
  id?: string
  label?: string | React.ReactNode;
  style?: React.CSSProperties;
  fullWidth?: boolean
  listValue?: any
};

const DEFAULT_SELECT_STYLE = {

};

const GenericSelect = withStyles({

})(MUISelect);

const Select: FunctionComponent<SelectProps> = (props) => (
  <GenericSelect
    style={{
      ...DEFAULT_SELECT_STYLE,
      ...props.style,
    }}
    data-testid="test-select"
    onChange={props.handlerChange}
    label={props.label}
    labelId={props.labelId}
    value={props.value}
    fullWidth={props.fullWidth}
    ref={props.listValue}
  >
    <MenuItem value={"None"}>None</MenuItem>
    {
      props.listValue?.map((value: any) => {
        return <MenuItem value={value["value"]}>{value["value"]}</MenuItem>
      })}
  </GenericSelect>
);

Select.defaultProps = {
  label: 'Select',
  style: {},
  fullWidth: false
};

export default Select;
