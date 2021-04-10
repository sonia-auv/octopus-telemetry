import { useState } from 'react';
import Switch from '../../../components/common/switch/Switch'
import './powersection.css';

const getPowerSectionSwitch = (
  id: string,
  label: string,
  value: boolean,
  // TODO mark as callback function that takes bool and returns bool
  setValue: any
) => (
  <div key={id}>
    <label>
      {label}
      <Switch
        testid={id}
        value={value}
        handler={(v: Boolean) => setValue(!v)}
        onLabel="Enabled"
        offLabel="Disabled"
      />
    </label>
  </div>
);

type PowerSectionProps = {
  temperature: number,
  current16V1Value: number,
  current16V2Value: number,
  current12VValue: number,
  voltage16V1Value: number,
  voltage16V2Value: number,
  voltage12VValue: number,
  batteryValue: number,

  output16V1Checked: boolean,
  output16V2Checked: boolean,
  output12VChecked: boolean,
  
  setOutput16V1Checked: (currentValue: boolean) => boolean,
  setOutput16V2Checked: (currentValue: boolean) => boolean,
  setOutput12VChecked: (currentValue: boolean) => boolean
};

const PowerSection = (props: PowerSectionProps) => {
  const outputSwitches = [
    {
      value: props.output16V1Checked,
      setValue: props.setOutput16V1Checked,
      label: 'Output 16V-1',
      id: 'output-16v-1',
    },
    {
      value: props.output16V2Checked,
      setValue: props.setOutput16V2Checked,
      label: 'Output 16V-2',
      id: 'output-16v-2',
    },
    {
      value: props.output12VChecked,
      setValue: props.setOutput12VChecked,
      label: 'Output 12V',
      id: 'output-12v',
    },
  ];

  const powerMetrics = [
    {
      id: 'temperature',
      label: 'Temperature',
      value: props.temperature,
    },
    {
      id: 'current-16v-1',
      label: 'Current 16V-1',
      value: props.current16V1Value,
    },
    {
      id: 'current-16v-2',
      label: 'Current 16V-2',
      value: props.current16V2Value,
    },
    {
      id: 'current-12v',
      label: 'Current 12V',
      value: props.current12VValue,
    },
    {
      id: 'voltage-16v-1',
      label: 'Voltage 16V-1',
      value: props.voltage16V1Value,
    },
    {
      id: 'voltage-16v-2',
      label: 'Voltage 16V-2',
      value: props.voltage16V2Value,
    },
    {
      id: 'voltage-12v',
      label: 'Voltage 12V',
      value: props.voltage12VValue,
    },
    {
      id: 'battery',
      label: 'Battery',
      value: props.batteryValue,
    },
  ];

  return (
    <div className="PowerSection">
      <form>
        {powerMetrics.map((label, index) => (
          <div key={index} className="PowerSection__section">
            <label className="PowerSection__label">
              <span>{label.label}</span>
              <input
                className="PowerSection__input-value"
                type="number"
                step="0.01"
                disabled={true}
                name={label.id}
                value={label.value}
                data-testid={`${label.id}-value`}
              />
            </label>
          </div>
        ))}
      </form>
      <form>
        {outputSwitches.map((s, l) =>
          getPowerSectionSwitch(`switch-${s.id}`, s.label, s.value, s.setValue)
        )}
      </form>
    </div>
  );
};

export default PowerSection;
