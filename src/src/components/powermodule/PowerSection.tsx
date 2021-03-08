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

const PowerSection = (props: any) => (
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
      <div>
        <label>
          Output 16V-1
          <Switch />
        </label>
      </div>
      <div>
        <label>
          Output 16V-2
          <Switch />
        </label>
      </div>
      <div>
        <label>
          Output 12V
          <Switch />
        </label>
      </div>
    </form>
  </div>
);

export default PowerSection;
