import React, { FunctionComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Slider as MUISlider } from '@material-ui/core';

type ThrusterEffortIndicatorSliderProps = {
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

const GenericThrusterEffortIndicatorSlider = withStyles({

    root: {
        "&.MuiSlider-vertical": {
            width: '80px',
            padding: '0px 22px',
            marginTop: '30px',
        },
    },

    thumb: {
        "&.Mui-disabled": {
            color: 'gba(37, 35, 35, 0.64)',
            width: '72px',
            height: '3px',
            borderRadius: '0px',
            "& .triangleLeft": {
                height: 0,
                width: 0,
                borderTop: '12px solid transparent',
                borderBottom: '12px solid transparent',
                borderLeft: '16px solid currentColor',
                marginRight: '38px',
                marginTop: '0px'
            },
            "& .triangleRight": {
                height: 0,
                width: 0,
                borderTop: '12px solid transparent',
                borderBottom: '12px solid transparent',
                borderRight: '16px solid currentColor',
                marginLeft: '20px',
                marginTop: '0px'
            },
        },
    },

    vertical: {
        "& .MuiSlider-thumb": {
            "&.Mui-disabled": {
                marginBottom: '0px',
                marginLeft: '-6px'
            }
        }
    },
    mark: {
        color: 'black',
        backgroundColor: 'black',
        opacity: 1.0,
        width: '60px',
        height: '3px'
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
        //color: context.isDarkMode ? "white" : 'black',
        color: "white",
        marginLeft: '80px',
        fontWeight: 'bold'
    },
})(MUISlider);

const Select: FunctionComponent<ThrusterEffortIndicatorSliderProps> = (props) => (
    <GenericThrusterEffortIndicatorSlider
        data-testid="test-ThrusterEffortIndicatorSlider"
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
    </GenericThrusterEffortIndicatorSlider>
);

Select.defaultProps = {
    disabled: false,
    valueLabelDisplay: "on"
};

export default Select;
