import { FunctionComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Slider as MUISlider } from '@material-ui/core';

type BatterieSliderProps = {
  value?: number | number[]
  orientation?: "horizontal" | "vertical"
  min?: number;
  max?: number;
  disabled?: boolean
};

const GenericBatterieSlider = withStyles({
  root: {
    height: '0px',
    width: '100px',
    backgroundImage: 'linear-gradient(to right, red,yellow,green)'
  },
  thumb: {
    "&.Mui-disabled": {
      transform: 'rotate(90deg)',
      width: '40px',
      height: '10px',
      borderRadius: '0px',
    }
  },
  track: {
    background: 'transparent'
  },
  rail: {
    background: 'transparent'
  }
})(MUISlider);

const Select: FunctionComponent<BatterieSliderProps> = (props) => (
  <GenericBatterieSlider
    data-testid="test-Batterieslider"
    value={props.value}
    orientation={props.orientation}
    min={props.min}
    max={props.max}
    disabled={props.disabled}
  >
  </GenericBatterieSlider>
);

Select.defaultProps = {
  disabled: false
};

export default Select;
