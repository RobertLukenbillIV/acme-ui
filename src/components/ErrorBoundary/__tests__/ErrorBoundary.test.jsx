import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';

// Component that throws an error
const ThrowError = ({ shouldThrow = true, error = 'Test error' }) => {
  if (shouldThrow) {
    throw new Error(error);
  }
  return <div>No error</div>;
};

// Component that works normally
const WorkingComponent = () => <div>Working component</div>;

describe('ErrorBoundary', () => {
  // Suppress console.error for these tests
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalError;
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <WorkingComponent />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Working component')).toBeInTheDocument();
  });

  it('renders error UI when child component throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('We encountered an unexpected error. Please try again.')).toBeInTheDocument();
  });

  it('renders custom title and message', () => {
    render(
      <ErrorBoundary 
        title="Custom Error Title"
        message="Custom error message"
      >
        <ThrowError />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Custom Error Title')).toBeInTheDocument();
    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });

  it('shows retry button by default', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('hides retry button when showRetry is false', () => {
    render(
      <ErrorBoundary showRetry={false}>
        <ThrowError />
      </ErrorBoundary>
    );
    
    expect(screen.queryByText('Try Again')).not.toBeInTheDocument();
  });

  it('shows reload button by default', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Reload Page')).toBeInTheDocument();
  });

  it('renders inline variant', () => {
    render(
      <ErrorBoundary variant="inline">
        <ThrowError />
      </ErrorBoundary>
    );
    
    const errorBoundary = screen.getByRole('alert');
    expect(errorBoundary).toHaveClass('acme-error-boundary-inline');
  });

  it('renders minimal variant', () => {
    render(
      <ErrorBoundary variant="minimal">
        <ThrowError />
      </ErrorBoundary>
    );
    
    const errorBoundary = screen.getByRole('alert');
    expect(errorBoundary).toHaveClass('acme-error-boundary-minimal');
  });

  it('uses custom fallback component when provided', () => {
    const CustomFallback = ({ error }) => (
      <div>Custom fallback: {error?.message || 'Unknown error'}</div>
    );
    
    render(
      <ErrorBoundary fallback={CustomFallback}>
        <ThrowError error="Custom error message" />
      </ErrorBoundary>
    );
    
    expect(screen.getByText(/Custom fallback:/)).toBeInTheDocument();
  });

  it('calls onError callback when error occurs', () => {
    const mockOnError = jest.fn();
    
    render(
      <ErrorBoundary onError={mockOnError}>
        <ThrowError />
      </ErrorBoundary>
    );
    
    expect(mockOnError).toHaveBeenCalled();
  });

  it('shows error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';
    
    render(
      <ErrorBoundary showDetails={true}>
        <ThrowError />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Technical Details')).toBeInTheDocument();
    
    process.env.NODE_ENV = originalEnv;
  });

  it('increments retry count when retry is clicked', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    const retryButton = screen.getByText('Try Again');
    retryButton.click();
    
    // After retry, component should try to render again
    rerender(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('No error')).toBeInTheDocument();
  });
});