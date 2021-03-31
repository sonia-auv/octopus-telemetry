import React, { FunctionComponent, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Slider as MUISlider } from '@material-ui/core';
import { GeneralContext } from "../../../context/generalContext";

type ThrusterControlSliderProps = {
  value?: number | number[]
  orientation?: "horizontal" | "vertical"
  min?: number;
  max?: number;
  disabled?: boolean
  valueLabelDisplay?: "auto" | "on" | "off"
  marks?: any
  ThumbComponent?: React.ElementType<React.HTMLAttributes<HTMLSpanElement>>
  defaultValue?: number
  handlerChange: (event: React.ChangeEvent<{}>, value: number | number[]) => void;
};

const Select: FunctionComponent<ThrusterControlSliderProps> = (props) => {

  const context = useContext(GeneralContext)
  const GenericThrusterControlSlider = withStyles({

    root: {
      "&.MuiSlider-vertical": {
        width: '80px',
        padding: '0px 10px',
      },
      marginLeft: '-132px',
    },

    thumb: {
      color: '#3796BF',
      width: '60px',
      height: '45px',
      borderRadius: '4px',
      "&.Mui-disabled": {
        width: '60px',
        height: '45px',
        borderRadius: '4px',
      },
    },

    vertical: {
      "& .MuiSlider-thumb": {
        marginLeft: '0px',
        marginBottom: '-20px',
        "&.Mui-disabled": {
          marginBottom: '-20px',
          marginLeft: '0px',
        }
      }
    },
    mark: {
      color: 'black',
      backgroundColor: 'black',
      opacity: 1.0,
      width: '60px',
    },
    marked: {
      "&.MuiSlider-vertical": {
        marginBottom: '30px',
        marginTop: '30px',
      },
    },
    markActive: {
      color: 'black',
      backgroundColor: 'black',
      opacity: 1.0,
      width: '60px',
    },
    rail: {
      color: 'black',
      opacity: 1.0,
      marginLeft: '30px'
    },
    track: {
      color: 'black',
      opacity: 1.0,
      marginLeft: '30px'
    },
    markLabel: {
      color: context.isDarkMode ? "white" : 'black',
      marginLeft: '68px'
    },
  })(MUISlider);

  return (
      <GenericThrusterControlSlider
        data-testid="test-ThrusterControlSlider"
        value={props.value}
        orientation={props.orientation}
        min={props.min}
        max={props.max}
        disabled={props.disabled}
        valueLabelDisplay={props.valueLabelDisplay}
        marks={props.marks}
        ThumbComponent={props.ThumbComponent}
        defaultValue={props.defaultValue}
        onChange={props.handlerChange}
      >
      </GenericThrusterControlSlider>
  )
};

Select.defaultProps = {
  disabled: false,
  valueLabelDisplay: "on"
};

export default Select;
