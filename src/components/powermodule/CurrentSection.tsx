import PowerMetric from './PowerMetric';
import './powersection.css';

type CurrentSectionProps = {
  current16VM1Value: number | null;
  current16VM2Value: number | null;
  current16VM3Value: number | null;
  current16VM4Value: number | null;
  current16VM5Value: number | null;
  current16VM6Value: number | null;
  current16VM7Value: number | null;
  current16VM8Value: number | null;
  current16VACC1Value: number | null;
  current16VACC2Value: number | null;
}

const CurrentSection = (props: CurrentSectionProps) => {
  const powerMetrics = [
    {
      id: 'current-16v-M1',
      label: 'Current 16V M1',
      value: props.current16VM1Value,
    },
    {
      id: 'current-16v-M2',
      label: 'Current 16V M2',
      value: props.current16VM2Value,
    },
    {
      id: 'current-16v-M3',
      label: 'Current 16V M3',
      value: props.current16VM3Value,
    },
    {
      id: 'current-16v-M4',
      label: 'Current 16V M4',
      value: props.current16VM4Value,
    },
    {
      id: 'current-16v-M5',
      label: 'Current 16V M5',
      value: props.current16VM5Value,
    },
    {
      id: 'current-16v-M6',
      label: 'Current 16V M6',
      value: props.current16VM6Value,
    },
    {
      id: 'current-16v-M7',
      label: 'Current 16V M7',
      value: props.current16VM7Value,
    },
    {
      id: 'current-16v-M8',
      label: 'Current 16V M8',
      value: props.current16VM8Value,
    },
    {
      id: 'current-16v-ACC1',
      label: 'Current 16V ACC1',
      value: props.current16VACC1Value,
    },
    {
      id: 'current-16v-ACC2',
      label: 'Current 16V ACC2',
      value: props.current16VACC2Value,
    },
  ];


  
  return (
    <div className="CurrentSection">
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

export default CurrentSection;
export type { CurrentSectionProps }
