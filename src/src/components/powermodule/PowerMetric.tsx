import TextField from '../../../components/common/textfield/Textfield';

type PowerMetricProps = {
  label: string;
  inputId: string;
  value: number | null;

  testId?: string;
};

const PowerMetric = (props: PowerMetricProps) => (
  <div className="PowerSection__section">
    <TextField
      value={props.value ? props.value : 'No data'}
      handlerChange={(e: any) => null}
      handlerKeyDown={(e: any) => null}
      disabled={true}
      name={props.inputId}
      label={props.label}
      data-testid={props.testId}
    />
  </div>
);

export default PowerMetric;
