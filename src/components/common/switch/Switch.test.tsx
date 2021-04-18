import { fireEvent, render, screen } from '@testing-library/react';
import Switch from './Switch';

describe('The Switch component', () => {
  it('has default labels (for On and Off) 💬', () => {
    render(<Switch value={false} handler={(e) => !e} />);

    const onText = screen.getByText(/On/i);
    const offLabel = screen.getByText(/Off/i);
    expect(onText).toBeInTheDocument();
    expect(offLabel).toBeInTheDocument();
  });
  it('can be toggled on and off 💡', () => {
    const onChange = jest.fn();

    render(<Switch value={false} handler={onChange} />);
    const s = screen
      .getByTestId('test-switch')
      .querySelector('input[type="checkbox"]') as HTMLInputElement;

    expect(s.checked).toBe(false);

    fireEvent.click(s);
    expect(onChange).toHaveBeenCalledTimes(1);

    expect(s.checked).toBe(true);

    fireEvent.click(s);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(s.checked).toBe(false);
  });
});
