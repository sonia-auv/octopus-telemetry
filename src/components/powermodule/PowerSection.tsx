import { useState } from 'react';
import Switch from '../common/switch/Switch';
import PowerMetric from './PowerMetric';
import './powersection.css';

const getPowerSectionSwitch = (
  id: string,
  label: string,
  value: boolean | null,
  // TODO mark as callback function that takes bool and returns bool
  setValue: any
) => (
  <div key={id} className="Powersection__switch">
    <label>
      {label}
      {value !== null ? (
        <Switch
          testid={id}
          value={value}
          handler={(v: Boolean) => setValue(!v)}
          onLabel="Enabled"
          offLabel="Disabled"
        />
      ) : (
        <pre>No data</pre>
      )}
    </label>
  </div>
);

type PowerSectionProps = {
  voltage16V1Value: number | null;
  voltage16V2Value: number | null;
  voltage12VValue: number | null;
  current16V1Value: number | null;
  current16V2Value: number | null;
  current12VValue: number | null;
  temperature: number | null;
  batteryValue: number | null;

  output16V1Checked: boolean | null;
  output16V2Checked: boolean | null;
  output12VChecked: boolean | null;

  setOutput16V1Checked: (currentValue: boolean) => boolean;
  setOutput16V2Checked: (currentValue: boolean) => boolean;
  setOutput12VChecked: (currentValue: boolean) => boolean;
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
      id: 'temperature',
      label: 'Temperature',
      value: props.temperature,
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
          <PowerMetric
            key={index}
            label={label.label}
            inputId={label.id}
            value={label.value}
            testId={`${label.id}-value`}
          />
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
export type { PowerSectionProps }
