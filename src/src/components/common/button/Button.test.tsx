import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button';

describe('The Button component 🔘', () => {
  it('has a default label', () => {
    render(<Button handler={() => {}} />);

    const defaultLabel = screen.getByText(/Submit/i);

    expect(defaultLabel).toBeInTheDocument();
  });

  it('can be passed a string as a label', () => {
    render(<Button label="Act!" handler={() => {}} />);

    const customLabel = screen.getByText(/Act!/i);

    expect(customLabel).toBeInTheDocument();
  });

  it('can be passed a React element as a label', () => {
    const element = <span>Hello!</span>;
    render(<Button label={element} handler={() => {}} />);
    const customElementLabel = screen.getByText(/Hello!/i);

    expect(customElementLabel).toBeInTheDocument();
  });

  it('dispatches actions on click 📞', () => {
    const onClick = jest.fn();

    render(<Button handler={onClick} />);

    const button = screen.getByTestId('test-button') as HTMLButtonElement;

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('can be passed overriding styles (taking precedence over default style)', () => {
    render(
      <Button
        style={{
          backgroundColor: 'red',
        }}
        handler={() => {}}
      />
    );

    const button = screen.getByTestId('test-button') as HTMLButtonElement;

    expect(button.style.backgroundColor).toBe('red');
  });

  it('still applies its base styles even though we pass a style prop', () => {
    render(<Button style={{ backgroundColor: 'green' }} handler={() => {}} />);

    const button = screen.getByTestId('test-button') as HTMLButtonElement;

    expect(button.style.border).toBe('1px solid blue');
  });

  it('can be disabled in the props', () => {
    render(<Button disabled handler={() => {}} />);

    const button = screen.getByTestId('test-button') as HTMLButtonElement;

    expect(button.disabled).toBe(true);
  });

  it('can be enabled in the props', () => {
    render(<Button disabled={false} handler={() => {}} />);
    const button = screen.getByTestId('test-button') as HTMLButtonElement;

    expect(button.disabled).toBe(false);
  });
});
