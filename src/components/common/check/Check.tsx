import { FunctionComponent, useState } from 'react';
import { Checkbox as MUICheckbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';

type CheckProps = {
  label?: string;
  value: boolean;
  handler: (checked: boolean) => void;
};

const Check: FunctionComponent<CheckProps> = (props) => {
  const [checked, setChecked] = useState(props.value);
  const handleChange = () => {
    setChecked(!checked);
    props.handler(checked);
  };
  return (
    <FormControlLabel
      onChange={handleChange}
      checked={checked}
      control={<MUICheckbox value={props.value} />}
      label={props.label}
      labelPlacement="end"
    />
  );
};

export default Check;
