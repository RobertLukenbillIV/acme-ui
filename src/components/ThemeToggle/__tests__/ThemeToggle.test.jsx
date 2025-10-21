import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeToggle from '../ThemeToggle';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock matchMedia
global.matchMedia = jest.fn(() => ({
  matches: false,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

describe('ThemeToggle', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders button variant by default', () => {
    render(<ThemeToggle />);
    
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('System')).toBeInTheDocument();
  });

  it('renders switch variant', () => {
    render(<ThemeToggle variant="switch" />);
    
    expect(screen.getByLabelText('Toggle dark mode')).toBeInTheDocument();
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
  });

  it('renders dropdown variant', () => {
    render(<ThemeToggle variant="dropdown" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-haspopup', 'listbox');
  });

  it('toggles theme when button clicked', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle onChange={mockOnChange} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('opens dropdown menu when dropdown variant clicked', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle variant="dropdown" />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(screen.getByText('Light theme')).toBeInTheDocument();
    expect(screen.getByText('Dark theme')).toBeInTheDocument();
  });

  it('applies theme to document', () => {
    render(<ThemeToggle defaultTheme="dark" />);
    
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('saves theme to localStorage', () => {
    render(<ThemeToggle defaultTheme="dark" storageKey="test-theme" />);
    
    expect(localStorage.setItem).toHaveBeenCalledWith('test-theme', 'dark');
  });

  it('loads theme from localStorage', () => {
    localStorage.getItem.mockReturnValue('dark');
    render(<ThemeToggle storageKey="test-theme" />);
    
    expect(localStorage.getItem).toHaveBeenCalledWith('test-theme');
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle variant="dropdown" />);
    
    const button = screen.getByRole('button');
    button.focus();
    
    await user.keyboard('{Enter}');
    expect(screen.getByText('Light theme')).toBeInTheDocument();
    
    await user.keyboard('{Escape}');
    expect(screen.queryByText('Light theme')).not.toBeInTheDocument();
  });

  it('hides system option when showSystemOption is false', () => {
    render(<ThemeToggle variant="dropdown" showSystemOption={false} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(screen.queryByText('Follow system theme')).not.toBeInTheDocument();
  });

  it('hides label when showLabel is false', () => {
    render(<ThemeToggle showLabel={false} />);
    
    expect(screen.queryByText('System')).not.toBeInTheDocument();
  });
});