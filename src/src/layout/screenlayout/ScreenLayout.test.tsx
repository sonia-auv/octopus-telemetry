import React from 'react';
import { render, screen } from '@testing-library/react';
import ScreenLayout from './ScreenLayout';

test('renders tabs', () => {
  render(<ScreenLayout />);
  const linkElement = screen.getByText(/Default view/i);
  expect(linkElement).toBeInTheDocument();
});
