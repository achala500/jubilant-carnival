import { render, screen } from '@testing-library/react';
import { Dashboard } from '../src/components/dashboard/Dashboard';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../src/components/dashboard/CountdownWidget', () => ({
  CountdownWidget: () => <div data-testid="mock-countdown-widget">CountdownWidget</div>
}));

vi.mock('../src/components/dashboard/AIScheduler', () => ({
  AIScheduler: () => <div data-testid="mock-ai-scheduler">AIScheduler</div>
}));

describe('Dashboard', () => {
  it('renders overview text correctly', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Your study hub and progress')).toBeInTheDocument();
  });

  it('renders child components', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(screen.getByTestId('mock-countdown-widget')).toBeInTheDocument();
    expect(screen.getByTestId('mock-ai-scheduler')).toBeInTheDocument();
  });
});
