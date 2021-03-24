import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button';

describe('The Button component 🔘', () => {
  it('has a default label', () => {
    render(<Button handler={() => {}} />);

    const defaultLabel = screen.getByText(/Submit/i);

    expect(defaultLabel).toBeInTheDocument();
  });

  it('can be passed a label', () => {
    render(<Button label="Act!" handler={() => {}} />);

    const customLabel = screen.getByText(/Act!/i);

    expect(customLabel).toBeInTheDocument();
  });

  it('dispatches actions on click', () => {
    const onClick = jest.fn();

    render(<Button handler={onClick} />);

    const button = screen.getByTestId('test-button') as HTMLButtonElement;

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('has a default "Button" CSS class', () => {
    render(<Button style={{ backgroundColor: 'green' }} handler={() => {}} />);

    const button = screen.getByTestId('test-button') as HTMLButtonElement;
    expect(button).toHaveClass('Button');
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
  it.skip('CHECK some expected computed CSS of the component here (for example, we expect the border to be this way, etc.', () => {});
});
