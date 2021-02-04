import React from 'react';
import { render, screen } from '@testing-library/react';
import TabPane from './TabPane';

test('renders tabs', () => {
  render(<TabPane title="tab 1" />);
  const linkElement = screen.getByText(/tab 1/i);
  expect(linkElement).toBeInTheDocument();
});
