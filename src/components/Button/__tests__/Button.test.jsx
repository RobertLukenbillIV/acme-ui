import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

describe('Button Component', () => {
  test('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('primary');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('secondary');

    rerender(<Button variant="danger">Danger</Button>);
    expect(screen.getByRole('button')).toHaveClass('danger');
  });

  test('applies size classes correctly', () => {
    const { rerender } = render(<Button size="small">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('small');

    rerender(<Button size="large">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('large');
  });

  test('handles onClick events', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('respects disabled state', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled');
    
    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('applies custom className', () => {
    render(<Button className="custom-class">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
    expect(screen.getByRole('button')).toHaveClass('acme-button');
  });

  test('forwards additional props', () => {
    render(<Button data-testid="test-button" id="my-button">Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-testid', 'test-button');
    expect(button).toHaveAttribute('id', 'my-button');
  });

  test('sets correct button type', () => {
    const { rerender } = render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');

    rerender(<Button type="reset">Reset</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
  });

  test('has default button type', () => {
    render(<Button>Default</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });
});