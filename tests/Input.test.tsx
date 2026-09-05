import { render, screen } from '@testing-library/react';
import React from 'react';
import { Input } from '../src/components/ui/Input';

describe('Input Component', () => {
  it('renders correctly', () => {
    render(<Input data-testid="test-input" />);
    const inputElement = screen.getByTestId('test-input');
    expect(inputElement).toBeInTheDocument();
  });

  it('forwards HTML input props correctly', () => {
    render(
      <Input
        data-testid="test-input"
        type="password"
        placeholder="Enter password"
        disabled
        value="secret"
        readOnly
      />
    );

    const inputElement = screen.getByTestId('test-input') as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.type).toBe('password');
    expect(inputElement.placeholder).toBe('Enter password');
    expect(inputElement.disabled).toBe(true);
    expect(inputElement.value).toBe('secret');
    expect(inputElement.readOnly).toBe(true);
  });

  it('merges custom className with default classes', () => {
    render(<Input data-testid="test-input" className="my-custom-class" />);
    const inputElement = screen.getByTestId('test-input');
    expect(inputElement).toHaveClass('my-custom-class');
    // Also check for one of the expected default classes to ensure merging works
    expect(inputElement).toHaveClass('flex');
    expect(inputElement).toHaveClass('w-full');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input data-testid="test-input" ref={ref} />);

    const inputElement = screen.getByTestId('test-input');
    expect(ref.current).toBe(inputElement);
    expect(ref.current?.tagName).toBe('INPUT');
  });
});
