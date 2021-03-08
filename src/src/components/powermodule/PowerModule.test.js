import React from 'react';
import { render, screen } from '@testing-library/react';
import PowerModule from './PowerModule';
import PowerSection from './PowerSection';

describe('The Power module', () => {
  test('renders the "All Data" tab', () => {
    render(<PowerModule />);
    const allDataTabText = screen.getByText(/All Data/i);
    expect(allDataTabText).toBeInTheDocument();
  });
  describe('The Power "section"', () => {
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
  });
});
