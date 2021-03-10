import Switch from '../../components/Switch';

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

const getPowerSectionSwitch = (label: String, value: Boolean) => (
  <div>
    <label>
      {label}
      <Switch
        value={value}
        handler={(v: Boolean) => {
          console.log(`Got value ${value}`);
        }}
        onLabel="Enabled"
        offLabel="Disabled"
      />
    </label>
  </div>
);

const SWITCHES = [
  { value: false, label: 'Output 16V-1' },
  { value: false, label: 'Output 16V-2' },
  { value: false, label: 'Output 12V' },
];

const PowerSection = (props: any) => {
  return (
    <div className="PowerSection">
      <form>
        {LABELS.map((label, index) => (
          <div key={index}>
            {label.label}
            <label>
              <input type="text" name={label.id} />
            </label>
          </div>
        ))}
      </form>
      <form>
        {SWITCHES.map((s, l) => getPowerSectionSwitch(s.label, s.value))}
      </form>
    </div>
  );
};

export default PowerSection;
