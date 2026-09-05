import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';

describe('Card Components', () => {
  describe('Card', () => {
    it('renders correctly', () => {
      const { container } = render(<Card>Test Content</Card>);
      expect(container.firstChild).toHaveTextContent('Test Content');
      expect(container.firstChild).toHaveClass('rounded-2xl', 'border', 'border-gray-200', 'bg-white', 'shadow-sm', 'text-gray-900');
    });

    it('applies custom className', () => {
      const { container } = render(<Card className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('forwards ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Card ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('CardHeader', () => {
    it('renders correctly', () => {
      const { container } = render(<CardHeader>Header</CardHeader>);
      expect(container.firstChild).toHaveTextContent('Header');
      expect(container.firstChild).toHaveClass('flex', 'flex-col', 'space-y-2', 'p-6');
    });

    it('applies custom className', () => {
      const { container } = render(<CardHeader className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('forwards ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CardHeader ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('CardTitle', () => {
    it('renders correctly', () => {
      const { container } = render(<CardTitle>Title</CardTitle>);
      expect(container.firstChild).toHaveTextContent('Title');
      expect(container.firstChild?.nodeName).toBe('H3');
      expect(container.firstChild).toHaveClass('text-2xl', 'font-semibold');
    });

    it('applies custom className', () => {
      const { container } = render(<CardTitle className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('forwards ref', () => {
      const ref = React.createRef<HTMLHeadingElement>();
      render(<CardTitle ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    });
  });

  describe('CardDescription', () => {
    it('renders correctly', () => {
      const { container } = render(<CardDescription>Description</CardDescription>);
      expect(container.firstChild).toHaveTextContent('Description');
      expect(container.firstChild?.nodeName).toBe('P');
      expect(container.firstChild).toHaveClass('text-base', 'text-gray-500');
    });

    it('applies custom className', () => {
      const { container } = render(<CardDescription className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('forwards ref', () => {
      const ref = React.createRef<HTMLParagraphElement>();
      render(<CardDescription ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });
  });

  describe('CardContent', () => {
    it('renders correctly', () => {
      const { container } = render(<CardContent>Content</CardContent>);
      expect(container.firstChild).toHaveTextContent('Content');
      expect(container.firstChild).toHaveClass('p-6', 'pt-0');
    });

    it('applies custom className', () => {
      const { container } = render(<CardContent className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('forwards ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CardContent ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('CardFooter', () => {
    it('renders correctly', () => {
      const { container } = render(<CardFooter>Footer</CardFooter>);
      expect(container.firstChild).toHaveTextContent('Footer');
      expect(container.firstChild).toHaveClass('flex', 'items-center', 'p-6', 'pt-0');
    });

    it('applies custom className', () => {
      const { container } = render(<CardFooter className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('forwards ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CardFooter ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
