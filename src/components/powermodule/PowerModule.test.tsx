import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import PowerModule from './PowerModule';
import VoltageSection, {VoltageSectionProps } from './VoltageSection';
import CurrentSection, {CurrentSectionProps } from './CurrentSection';

function isNumberValueValid(numberValue: number) {
  expect(numberValue).not.toBeUndefined();
  expect(numberValue).not.toBeNull();
  expect(numberValue).not.toBeFalsy();
  expect(numberValue).toBeGreaterThanOrEqual(Number.MIN_VALUE);
  expect(numberValue).toBeLessThanOrEqual(Number.MAX_VALUE);
}
const testVoltageProps: VoltageSectionProps = {
  voltage16VM1Value: 16.1,
  voltage16VM2Value: 16,
  voltage16VM3Value: 16,
  voltage16VM4Value: 16,
  voltage16VM5Value: 16,
  voltage16VM6Value: 16,
  voltage16VM7Value: 16,
  voltage16VM8Value: 16,
  voltage16VACC1Value: 16,
  voltage16VACC2Value: 16,
}
const testCurrentProps: CurrentSectionProps = {
  current16VM1Value: 16.1,
  current16VM2Value: 16,
  current16VM3Value: 16,
  current16VM4Value: 16,
  current16VM5Value: 16,
  current16VM6Value: 16,
  current16VM7Value: 16,
  current16VM8Value: 16,
  current16VACC1Value: 16,
  current16VACC2Value: 16,
}

describe('The Power module 🔋', () => {
  describe('The Power "section" (the panel for every "Power" tab)', () => {
    it('renders "no data" as a value if the metric has no value', async () => {
      const props = {
        ...testVoltageProps,
        ...{
          voltage16VM1Value: null
        }
      }
      render(<VoltageSection {...props} />)
      const noDataTexts = await screen.findAllByDisplayValue(/No data/i)
      expect(noDataTexts.length).toBe(1)
    })
    it('renders a Current 16V-M1 label', () => {
      render(<CurrentSection {...testCurrentProps} />);
      const current16VM1Texts = screen.getAllByText(/Current 16V M1/i);
      const current16VM1Text = current16VM1Texts[0]
      expect(current16VM1Text).toBeInTheDocument();
    });
    it('renders a current 16V-M1 value', () => {
      render(<CurrentSection {...testCurrentProps} />);
      const current16VM1Inputs = screen.getAllByTestId('current-16v-M1-value')
      const current16VM1Input = current16VM1Inputs[0] as HTMLInputElement
      const current16VM1Value = parseFloat(current16VM1Input.value)
      expect(current16VM1Input).toHaveAttribute('disabled')
      isNumberValueValid(current16VM1Value);
    });
    it('renders a Current 16V-2 label', () => {
      render(<PowerSection {...testProps} />);
      const current16v2Texts = screen.getAllByText(/Current 16V-2/i);
      const current16v2Text = current16v2Texts[0]
      expect(current16v2Text).toBeInTheDocument();
    });
    it('renders a Current 16V-2 value', () => {
      render(<PowerSection {...testProps} />);
      const current16V2Inputs = screen.getAllByTestId('current-16v-2-value')
      const current16V2Input = current16V2Inputs[0] as HTMLInputElement
      const current16V2Value = parseFloat(current16V2Input.value)
      expect(current16V2Input).toHaveAttribute('disabled')
      isNumberValueValid(current16V2Value);
    });
    it('renders a Current 12V label', () => {
      render(<PowerSection {...testProps} />);
      const current12VTexts = screen.getAllByText(/Current 12V/i);
      const current12VText = current12VTexts[0]
      expect(current12VText).toBeInTheDocument();
    });
    it('renders a Current 12V value', () => {
      render(<PowerSection {...testProps} />);
      const current12VInputs = screen.getAllByTestId('current-12v-value')
      const current12VInput = current12VInputs[0] as HTMLInputElement
      const current12VValue = parseFloat(current12VInput.value);
      
      isNumberValueValid(current12VValue);
      expect(current12VInput.disabled).toBe(true);
    });
    it('renders a Voltage 16V-1 label', () => {
      render(<PowerSection {...testProps} />);
      const voltage16v1Texts = screen.getAllByText(/Voltage 16V-1/i);
      const voltage16v1Text = voltage16v1Texts[0]
      expect(voltage16v1Text).toBeInTheDocument();
    });
    it('renders a Voltage 16V-1 value', () => {
      render(<PowerSection {...testProps} />);
      
      const voltage16V1Inputs = screen.getAllByTestId('voltage-16v-1-value');
      const voltage16V1Input = voltage16V1Inputs[0] as HTMLInputElement
      const voltage16V1Value = parseFloat(voltage16V1Input.value);
      
      isNumberValueValid(voltage16V1Value);
      expect(voltage16V1Input.disabled).toBe(true);
    });
    it('renders a Voltage 16V-2 label', () => {
      render(<PowerSection {...testProps} />);
      const voltage16V2Texts = screen.getAllByText(/Voltage 16V-2/i);
      const voltage16V2Text = voltage16V2Texts[0]
      expect(voltage16V2Text).toBeInTheDocument();
    });
    it('renders a Voltage 16V-2 value', () => {
      render(<PowerSection {...testProps} />);
      
      const voltage16V2Inputs = screen.getAllByTestId('voltage-16v-2-value')
      const voltage16V2Input = voltage16V2Inputs[0] as HTMLInputElement
      const voltage16V2Value = parseFloat(voltage16V2Input.value);
      
      isNumberValueValid(voltage16V2Value);
      expect(voltage16V2Input.disabled).toBe(true);
    });
    it('renders a Voltage 12V label', () => {
      render(<PowerSection {...testProps} />);
      const voltage12VTexts = screen.getAllByText(/Voltage 12V/i);
      const voltage12VText = voltage12VTexts[0]
      expect(voltage12VText).toBeInTheDocument();
    });
    it('renders a Voltage 12V value', () => {
      render(<PowerSection {...testProps} />);
      
      const voltage12VInputs = screen.getAllByTestId('voltage-12v-value');
      const voltage12VInput = voltage12VInputs[0] as HTMLInputElement
      const voltage12VValue = parseFloat(voltage12VInput.value);

      isNumberValueValid(voltage12VValue);
      expect(voltage12VInput.disabled).toBe(true);
    });
    it('renders a Temperature label', () => {
      render(<PowerSection {...testProps} />);
      const temperatureLabelTexts = screen.getAllByText(/Temperature/i);
      const temperatureLabelText = temperatureLabelTexts[0]
      expect(temperatureLabelText).toBeInTheDocument();
    });
    it('renders a temperature value', () => {
      render(<PowerSection {...testProps} />);
      const temperatureInputs = screen.getAllByTestId('temperature-value')
      const temperatureInput = temperatureInputs[0] as HTMLInputElement;
      const temperatureValue = parseFloat(temperatureInput.value);
      expect(temperatureInput).toHaveAttribute('disabled');
      isNumberValueValid(temperatureValue);
    });
    it('renders a Battery label', () => {
      render(<PowerSection {...testProps} />);
      const batteryTexts = screen.getAllByText(/Battery/i);
      const batteryText = batteryTexts[0]
      expect(batteryText).toBeInTheDocument();
    });
    it('renders a Battery value', () => {
      render(<PowerSection {...testProps} />);

      const batteryInputs = screen.getAllByTestId('battery-value');
      const batteryInput = batteryInputs[0] as HTMLInputElement

      const batteryInputValue = parseFloat(batteryInput.value);

      isNumberValueValid(batteryInputValue);
      expect(batteryInput.disabled).toBe(true);
    });
    it('renders an Output 16V-1 label', () => {
      render(<PowerSection {...testProps} />);
      const output16v1Texts = screen.getAllByText(/Output 16V-1/i);
      const output16v1Text = output16v1Texts[0] as HTMLInputElement
      expect(output16v1Text).toBeInTheDocument();
    });
    it('renders an Output 16V-2 label', () => {
      render(<PowerSection {...testProps} />);
      const output16v1Texts = screen.getAllByText(/Output 16V-2/i);
      const output16V1Text = output16v1Texts[0]
      expect(output16V1Text).toBeInTheDocument();
    });
    it('renders an Output 12V label', () => {
      render(<PowerSection {...testProps} />);
      const output12VTexts = screen.getAllByText(/Output 12V/i);
      const output12VText = output12VTexts[0] as HTMLInputElement
      expect(output12VText).toBeInTheDocument();
    });
    it('toggles the switches', async () => {
      render(<PowerSection {...testProps} />);
      // const output16V1Switches = screen.getAllByRole('checkbox', { hidden: true, name: 'switch-output-16v-1' })
      // https://github.com/mui-org/material-ui/pull/17870/files/289af6b8a4ce92aad0a15f5127f9f7d33bcf1117#diff-8c4edde3154251e491f3398f49ddd8f2df668835066343a078fe35cbaec58750
      // checkbox vs. switch role is a known issue ? https://github.com/mui-org/material-ui/issues/17697
      const switches = screen.getAllByRole('checkbox') // 'switch-output-16v-1')
      const testSwitch = switches[0] 
      fireEvent.click(testSwitch);

      expect(testSwitch).toBeChecked();

      fireEvent.click(testSwitch)

      expect(testSwitch).not.toBeChecked()
    });
  });
});
