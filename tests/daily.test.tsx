import { render, screen, fireEvent } from '@testing-library/react';
import { DailyLogger } from '../src/components/daily/DailyLogger';

describe('DailyLogger Component', () => {
  it('adds a new session correctly', () => {
    render(<DailyLogger />);
    const addBtn = screen.getByText(/Add Session/i);
    fireEvent.click(addBtn);

    // Initial was 1, adding makes it 2
    const hoursInputs = screen.getAllByRole('spinbutton', { name: '' });
    // Assuming each session has 2 number inputs: hours and focus
    expect(hoursInputs.length).toBeGreaterThan(2);
  });

  it('calculates total hours automatically', () => {
    render(<DailyLogger />);

    // Default is 2 hrs
    expect(screen.getByText(/2.0 hrs/i)).toBeInTheDocument();

    const addBtn = screen.getByText(/Add Session/i);
    fireEvent.click(addBtn);

    // New default adds 1 hr => 3 hrs
    expect(screen.getByText(/3.0 hrs/i)).toBeInTheDocument();
  });

  it('preserves manual override total hours', () => {
    render(<DailyLogger />);

    const overrideCheckbox = screen.getByRole('checkbox');
    fireEvent.click(overrideCheckbox);

    // Initial manual override is set to 0 in state
    const manualInput = screen.getAllByRole('spinbutton')[2];
    fireEvent.change(manualInput, { target: { value: '5' } });

    expect(screen.getByText(/5.0 hrs/i)).toBeInTheDocument();
  });
});
