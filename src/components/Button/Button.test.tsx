import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button component', () => {
  it('renders with given label', () => {
    render(<Button label='Click Me' />);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('handles click event', () => {
    const handleClick = vi.fn();
    render(<Button label='OK' onClick={handleClick} />);
    fireEvent.click(screen.getByText('OK'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
