import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import PowerModule from './PowerModule';
import PowerSection from './PowerSection';

function isNumberValueValid(numberValue: number) {
  expect(numberValue).not.toBeUndefined();
  expect(numberValue).not.toBeNull();
  expect(numberValue).not.toBeFalsy();
  expect(numberValue).toBeGreaterThanOrEqual(Number.MIN_VALUE);
  expect(numberValue).toBeLessThanOrEqual(Number.MAX_VALUE);
}

describe('The Power module 🔋', () => {
  test('renders the "All Data" tab', () => {
    render(<PowerModule />);
    const allDataTabText = screen.getByText(/All Data is here/i);
    expect(allDataTabText).toBeInTheDocument();
  });
  describe('The Power "section" (the panel for every "Power" tab)', () => {
    it('renders a Temperature label', () => {
      render(<PowerSection />);
      const temperatureLabelText = screen.getByText(/Temperature/i);
      expect(temperatureLabelText).toBeInTheDocument();
    });
    it('renders a temperature value', () => {
      render(<PowerSection />);
      const temperatureInput = screen.getByTestId('temperature-value') as HTMLInputElement;
      const temperatureValue = parseFloat(temperatureInput.value);
      expect(temperatureInput.disabled).toBe(true);
      isNumberValueValid(temperatureValue);
    });
    it('renders a Current 16V-1 label', () => {
      render(<PowerSection />);
      const current16v1Text = screen.getByText(/Current 16V-1/i);
      expect(current16v1Text).toBeInTheDocument();
    });
    it('renders a current 16V-1 value', () => {
      render(<PowerSection />);
      const current16V1Input = screen.getByTestId('current-16v-1-value') as HTMLInputElement
      const current16V1Value = parseFloat(current16V1Input.value)
      isNumberValueValid(current16V1Value);
    });
    it('renders a Current 16V-2 label', () => {
      render(<PowerSection />);
      const current16v2Text = screen.getByText(/Current 16V-2/i);
      expect(current16v2Text).toBeInTheDocument();
    });
    it('renders a Current 16V-2 value', () => {
      render(<PowerSection />);
      const current16V2Input = screen.getByTestId('current-16v-2-value') as HTMLInputElement
      const current16V2Value = parseFloat(current16V2Input.value)
      isNumberValueValid(current16V2Value);
    });
    it('renders a Current 12V label', () => {
      render(<PowerSection />);
      const current12V = screen.getByText(/Current 12V/i);
      expect(current12V).toBeInTheDocument();
    });
    it('renders a Current 12V value', () => {
      render(<PowerSection />);

      const current12VInput = screen.getByTestId('current-12v-value') as HTMLInputElement;
      const current12VValue = parseFloat(current12VInput.value);

      isNumberValueValid(current12VValue);
      expect(current12VInput.disabled).toBe(true);
    });
    it('renders a Voltage 16V-1 label', () => {
      render(<PowerSection />);
      const voltage16v1Text = screen.getByText(/Voltage 16V-1/i);
      expect(voltage16v1Text).toBeInTheDocument();
    });
    it('renders a Voltage 16V-1 value', () => {
      render(<PowerSection />);

      const voltage16V1Input = screen.getByTestId('voltage-16v-1-value') as HTMLInputElement;
      const voltage16V1Value = parseFloat(voltage16V1Input.value);

      isNumberValueValid(voltage16V1Value);
      expect(voltage16V1Input.disabled).toBe(true);
    });
    it('renders a Voltage 16V-2 label', () => {
      render(<PowerSection />);
      const voltage16v2Text = screen.getByText(/Voltage 16V-2/i);
      expect(voltage16v2Text).toBeInTheDocument();
    });
    it('renders a Voltage 16V-2 value', () => {
      render(<PowerSection />);

      const voltage16V2Input = screen.getByTestId('voltage-16v-2-value') as HTMLInputElement;
      const voltage16V2Value = parseFloat(voltage16V2Input.value);

      isNumberValueValid(voltage16V2Value);
      expect(voltage16V2Input.disabled).toBe(true);
    });
    it('renders a Voltage 12V label', () => {
      render(<PowerSection />);
      const voltage12Text = screen.getByText(/Voltage 12V/i);
      expect(voltage12Text).toBeInTheDocument();
    });
    it('renders a Voltage 12V value', () => {
      render(<PowerSection />);

      const voltage12VInput = screen.getByTestId('voltage-12v-value') as HTMLInputElement;
      const voltage12VValue = parseFloat(voltage12VInput.value);

      isNumberValueValid(voltage12VValue);
      expect(voltage12VInput.disabled).toBe(true);
    });
    it('renders a Battery label', () => {
      render(<PowerSection />);
      const batteryText = screen.getByText(/Battery/i);
      expect(batteryText).toBeInTheDocument();
    });
    it('renders a Battery value', () => {
      render(<PowerSection />);

      const batteryInput = screen.getByTestId('battery-value') as HTMLInputElement;

      const batteryInputValue = parseFloat(batteryInput.value);

      isNumberValueValid(batteryInputValue);
      expect(batteryInput.disabled).toBe(true);
    });
    it('renders an Output 16V-1 label', () => {
      render(<PowerSection />);
      const output16v1Text = screen.getByText(/Output 16V-1/i);
      expect(output16v1Text).toBeInTheDocument();
    });
    it('renders an Output 16V-2 label', () => {
      render(<PowerSection />);
      const output16v1Text = screen.getByText(/Output 16V-2/i);
      expect(output16v1Text).toBeInTheDocument();
    });
    it('renders an Output 12V label', () => {
      render(<PowerSection />);
      const output12vText = screen.getByText(/Output 12V/i);
      expect(output12vText).toBeInTheDocument();
    });
    it('toggles the switches for the Output 16V-1 Switch', async () => {
      render(<PowerSection />);
      const output16V1Switch = await screen.findByTestId('switch-output-16v-1');
      fireEvent.click(output16V1Switch);

      expect(output16V1Switch).toBeChecked();
    });
    it('toggles the switches for the Output 16V-2 Switch', async () => {
      render(<PowerSection />);
      const output16V2Switch = await screen.findByTestId('switch-output-16v-2');
      fireEvent.click(output16V2Switch);

      expect(output16V2Switch).toBeChecked();
    });
    it('toggles the switches for the Output 12V Switch', async () => {
      render(<PowerSection />);
      const output12VSwitch = await screen.findByTestId('switch-output-12v');
      fireEvent.click(output12VSwitch);

      expect(output12VSwitch).toBeChecked();
    });
  });
});
