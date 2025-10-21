import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeToggle from '../ThemeToggle';

// Mock timers for better test control
jest.useFakeTimers();

// Mock localStorage with proper jest functions
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true
});

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
    jest.clearAllTimers();
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
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
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ThemeToggle onChange={mockOnChange} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(mockOnChange).toHaveBeenCalled();
  }, 5000);

  it('opens dropdown menu when dropdown variant clicked', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ThemeToggle variant="dropdown" />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Light theme')).toBeInTheDocument();
      expect(screen.getByText('Dark theme')).toBeInTheDocument();
    });
  }, 5000);

  it('applies theme to document', async () => {
    render(<ThemeToggle defaultTheme="dark" />);
    
    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });
  });

  it('saves theme to localStorage', async () => {
    render(<ThemeToggle defaultTheme="dark" storageKey="test-theme" />);
    
    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('test-theme', 'dark');
    });
  });

  it('loads theme from localStorage', async () => {
    localStorage.getItem.mockReturnValue('dark');
    render(<ThemeToggle storageKey="test-theme" />);
    
    await waitFor(() => {
      expect(localStorage.getItem).toHaveBeenCalledWith('test-theme');
    });
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ThemeToggle variant="dropdown" />);
    
    const button = screen.getByRole('button');
    button.focus();
    
    await user.keyboard('{Enter}');
    await waitFor(() => {
      expect(screen.getByText('Light theme')).toBeInTheDocument();
    });
    
    // Check that dropdown is open by checking the class
    const container = button.closest('.acme-theme-toggle-dropdown');
    expect(container).toHaveClass('open');
    
    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(container).not.toHaveClass('open');
    }, { timeout: 2000 });
  }, 10000);

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