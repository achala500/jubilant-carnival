import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AIScheduler } from '../src/components/dashboard/AIScheduler';
import { BrowserRouter } from 'react-router-dom';

describe('AIScheduler', () => {
  it('generates schedule correctly (mocked)', async () => {
    render(
      <BrowserRouter>
        <AIScheduler />
      </BrowserRouter>
    );
    const genBtn = screen.getByRole('button', { name: /Generate Weekly Plan/i });
    fireEvent.click(genBtn);

    expect(screen.getByText(/Generating magical plan/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Schedule Generated/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
