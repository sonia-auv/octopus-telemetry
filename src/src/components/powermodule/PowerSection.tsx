import { useState } from 'react';
import Switch from '../../components/Switch';
import './powersection.css';

const LABELS = [
  {
    id: 'temperature',
    label: 'Temperature',
  },
  {
    id: 'current-16v-1',
    label: 'Current 16V-1',
  },
  {
    id: 'current-16v-2',
    label: 'Current 16V-2',
  },
  {
    id: 'current-12v',
    label: 'Current 12V',
  },
  {
    id: 'voltage-16v-1',
    label: 'Voltage 16V-1',
  },
  {
    id: 'voltage-16v-2',
    label: 'Voltage 16V-2',
  },
  {
    id: 'voltage-12v',
    label: 'Voltage 12V',
  },
  {
    id: 'battery',
    label: 'Battery',
  },
];

const getPowerSectionSwitch = (
  id: string,
  label: String,
  value: Boolean,
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
  let [output16V1Checked, setOutput16V1Checked] = useState(false);
  let [output16V2Checked, setOutput16V2Checked] = useState(false);
  let [output12VChecked, setOutput12VChecked] = useState(false);

  const SWITCHES = [
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

  return (
    <div className="PowerSection">
      <form>
        {LABELS.map((label, index) => (
          <div key={index} className="PowerSection__section">
            <label className="PowerSection__label">
              <span>{label.label}</span>
              <input
                className="PowerSection__input-value"
                type="text"
                name={label.id}
              />
            </label>
          </div>
        ))}
      </form>
      <form>
        {SWITCHES.map((s, l) =>
          getPowerSectionSwitch(`switch-${s.id}`, s.label, s.value, s.setValue)
        )}
      </form>
    </div>
  );
};

export default PowerSection;
