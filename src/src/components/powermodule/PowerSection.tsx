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

type PowerSectionProps = {};

const PowerSection = (props: PowerSectionProps) => {
  let [temperature, setTemperature] = useState(15.84);
  let [current16V1Value, setCurrent16V1Value] = useState(16.73);
  let [current16V2Value, setCurrent16V2Value] = useState(17.73);
  let [current12VValue, setCurrent12VValue] = useState(18.73);
  let [voltage16V1Value, setVoltage16V1Value] = useState(19.73);
  let [voltage16V2Value, setVoltage16V2Value] = useState(22.63);
  let [voltage12VValue, setVoltage12VValue] = useState(42.24);
  let [batteryValue, setBatteryValue] = useState(99.74);

  let [output16V1Checked, setOutput16V1Checked] = useState(false);
  let [output16V2Checked, setOutput16V2Checked] = useState(false);
  let [output12VChecked, setOutput12VChecked] = useState(false);

  const outputSwitches = [
    {
      value: output16V1Checked,
      setValue: setOutput16V1Checked,
      label: 'Output 16V-1',
      id: 'output-16v-1',
    },
    {
      value: output16V2Checked,
      setValue: setOutput16V2Checked,
      label: 'Output 16V-2',
      id: 'output-16v-2',
    },
    {
      value: output12VChecked,
      setValue: setOutput12VChecked,
      label: 'Output 12V',
      id: 'output-12v',
    },
  ];

  const powerMetrics = [
    {
      id: 'temperature',
      label: 'Temperature',
      value: temperature,
      onUpdate: setTemperature,
    },
    {
      id: 'current-16v-1',
      label: 'Current 16V-1',
      value: current16V1Value,
      onUpdate: setCurrent16V1Value,
    },
    {
      id: 'current-16v-2',
      label: 'Current 16V-2',
      value: current16V2Value,
      onUpdate: setCurrent16V2Value,
    },
    {
      id: 'current-12v',
      label: 'Current 12V',
      value: current12VValue,
      onUpdate: setCurrent12VValue,
    },
    {
      id: 'voltage-16v-1',
      label: 'Voltage 16V-1',
      value: voltage16V1Value,
      onUpdate: setVoltage16V1Value,
    },
    {
      id: 'voltage-16v-2',
      label: 'Voltage 16V-2',
      value: voltage16V2Value,
      onUpdate: setVoltage16V2Value,
    },
    {
      id: 'voltage-12v',
      label: 'Voltage 12V',
      value: voltage12VValue,
      onUpdate: setVoltage12VValue,
    },
    {
      id: 'battery',
      label: 'Battery',
      value: batteryValue,
      onUpdate: setBatteryValue,
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
                onChange={(e) => label.onUpdate(parseFloat(e.target.value))}
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
