import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import PowerModule from './PowerModule';
import PowerSection from './PowerSection';

describe('The Power module', () => {
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
    it('renders a Current 16V-1 label', () => {
      render(<PowerSection />);
      const current16v1Text = screen.getByText(/Current 16V-1/i);
      expect(current16v1Text).toBeInTheDocument();
    });
    it('renders a Current 16V-2 label', () => {
      render(<PowerSection />);
      const current16v2Text = screen.getByText(/Current 16V-2/i);
      expect(current16v2Text).toBeInTheDocument();
    });
    it('renders a Current 12V label', () => {
      render(<PowerSection />);
      const current12V = screen.getByText(/Current 12V/i);
      expect(current12V).toBeInTheDocument();
    });
    it('renders a Voltage 16V-1 label', () => {
      render(<PowerSection />);
      const voltage16v1Text = screen.getByText(/Voltage 16V-1/i);
      expect(voltage16v1Text).toBeInTheDocument();
    });
    it('renders a Voltage 16V-2 label', () => {
      render(<PowerSection />);
      const voltage16v2Text = screen.getByText(/Voltage 16V-2/i);
      expect(voltage16v2Text).toBeInTheDocument();
    });
    it('renders a Voltage 12V label', () => {
      render(<PowerSection />);
      const voltage12Text = screen.getByText(/Voltage 12V/i);
      expect(voltage12Text).toBeInTheDocument();
    });
    it('renders a Battery label', () => {
      render(<PowerSection />);
      const batteryText = screen.getByText(/Battery/i);
      expect(batteryText).toBeInTheDocument();
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
