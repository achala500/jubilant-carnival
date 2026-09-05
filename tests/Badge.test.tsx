import { render, screen } from '@testing-library/react';
import { Badge } from '../src/components/ui/Badge';

describe('Badge', () => {
  it('renders default variant by default', () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText('Default Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-gray-100 text-gray-900');
  });

  it('renders bio variant correctly', () => {
    render(<Badge variant="bio">Bio Badge</Badge>);
    const badge = screen.getByText('Bio Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-bio/15 text-bio');
  });

  it('renders maths variant correctly', () => {
    render(<Badge variant="maths">Maths Badge</Badge>);
    const badge = screen.getByText('Maths Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-maths/15 text-maths');
  });

  it('renders physics variant correctly', () => {
    render(<Badge variant="physics">Physics Badge</Badge>);
    const badge = screen.getByText('Physics Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-physics/15 text-physics');
  });

  it('renders chemistry variant correctly', () => {
    render(<Badge variant="chemistry">Chemistry Badge</Badge>);
    const badge = screen.getByText('Chemistry Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-chemistry/15 text-chemistry');
  });

  it('renders outline variant correctly', () => {
    render(<Badge variant="outline">Outline Badge</Badge>);
    const badge = screen.getByText('Outline Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('border-gray-200 text-gray-900');
  });

  it('merges custom className with default classes', () => {
    render(<Badge className="custom-class">Custom Class Badge</Badge>);
    const badge = screen.getByText('Custom Class Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('custom-class');
    expect(badge).toHaveClass('inline-flex items-center rounded-full');
  });

  it('forwards other HTML attributes', () => {
    render(<Badge id="test-id" data-testid="test-badge">Attribute Badge</Badge>);
    const badge = screen.getByTestId('test-badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute('id', 'test-id');
    expect(badge).toHaveTextContent('Attribute Badge');
  });
});
