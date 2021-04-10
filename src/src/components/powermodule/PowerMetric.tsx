type PowerMetricProps = {
  label: string;
  inputId: string;
  value: number | null;

  testId?: string;
};

const PowerMetric = (props: PowerMetricProps) => (
  <div className="PowerSection__section">
    <label className="PowerSection__label">
      <span>{props.label}</span>
      {props.value ? (
        <input
          className="PowerSection__input-value"
          type="number"
          step="0.01"
          disabled={true}
          name={props.inputId}
          value={props.value}
          data-testid={`${props.testId}`}
        />
      ) : (
        <div>No data</div>
      )}
    </label>
  </div>
);

export default PowerMetric;
