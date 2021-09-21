import PowerMetric from './PowerMetric';
import './powersection.css';

type VoltageSectionProps = {
  voltage16VM1Value: number | null;
  voltage16VM2Value: number | null;
  voltage16VM3Value: number | null;
  voltage16VM4Value: number | null;
  voltage16VM5Value: number | null;
  voltage16VM6Value: number | null;
  voltage16VM7Value: number | null;
  voltage16VM8Value: number | null;
  voltage16VACC1Value: number | null;
  voltage16VACC2Value: number | null;
};

const VoltageSection = (props: VoltageSectionProps) => {
  const powerMetrics = [
    {
      id: 'voltage-16v-M1',
      label: 'Voltage 16V M1',
      value: props.voltage16VM1Value,
    },
    {
      id: 'voltage-16v-M2',
      label: 'Voltage 16V M2',
      value: props.voltage16VM2Value,
    },
    {
      id: 'voltage-16v-M3',
      label: 'Voltage 16V M3',
      value: props.voltage16VM3Value,
    },
    {
      id: 'voltage-16v-M4',
      label: 'Voltage 16V M4',
      value: props.voltage16VM4Value,
    },
    {
      id: 'voltage-16v-M5',
      label: 'Voltage 16V M5',
      value: props.voltage16VM5Value,
    },
    {
      id: 'voltage-16v-M5',
      label: 'Voltage 16V M5',
      value: props.voltage16VM5Value,
    },
    {
      id: 'voltage-16v-M6',
      label: 'Voltage 16V M6',
      value: props.voltage16VM6Value,
    },
    {
      id: 'voltage-16v-M7',
      label: 'Voltage 16V M7',
      value: props.voltage16VM7Value,
    },
    {
      id: 'voltage-16v-M8',
      label: 'Voltage 16V M8',
      value: props.voltage16VM8Value,
    },
    {
      id: 'voltage-16v-ACC1',
      label: 'Voltage 16V ACC1',
      value: props.voltage16VACC1Value,
    },
    {
      id: 'voltage-16v-ACC2',
      label: 'Voltage 16V ACC2',
      value: props.voltage16VACC2Value,
    },
  ];



  return (
    <div className="VoltageSection">
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
    </div>
  );
};

export default VoltageSection;
export type { VoltageSectionProps }
