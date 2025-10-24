import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from './Button';

describe('Button component', () => {
  it('renders with given label', () => {
    render(<Button label='Click Me' />);
    const $button = screen.getByText('Click Me');
    expect($button).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const onClick = vi.fn();

    render(<Button label='Click Me' onClick={onClick} />);

    const $button = screen.getByText('Click Me');
    fireEvent.click($button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
