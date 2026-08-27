import { render, screen, fireEvent } from '@testing-library/react';
import { StudyCalendar } from '../src/components/calendar/Calendar';
import { format } from 'date-fns';

describe('StudyCalendar', () => {
  it('renders current month view by default', () => {
    render(<StudyCalendar />);
    const expectedTitle = format(new Date(), 'MMMM yyyy');
    expect(screen.getByText(expectedTitle)).toBeInTheDocument();
  });

  it('switches views when clicking tabs', () => {
    render(<StudyCalendar />);
    const weekBtn = screen.getByText('week', { exact: false });
    fireEvent.click(weekBtn);
    expect(screen.getByText(format(new Date(), 'EEE'))).toBeInTheDocument();
  });
});
