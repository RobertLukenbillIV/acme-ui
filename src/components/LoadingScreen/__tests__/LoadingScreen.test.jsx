import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import LoadingScreen from '../LoadingScreen';

// Mock timers for tests
jest.useFakeTimers();

describe('LoadingScreen', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
  });
  it('renders spinner variant by default', () => {
    render(<LoadingScreen />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders custom message', () => {
    render(<LoadingScreen message="Please wait..." />);
    
    expect(screen.getByText('Please wait...')).toBeInTheDocument();
  });

  it('renders submessage when provided', () => {
    render(<LoadingScreen submessage="This may take a moment" />);
    
    expect(screen.getByText('This may take a moment')).toBeInTheDocument();
  });

  it('renders dots variant', () => {
    render(<LoadingScreen variant="dots" />);
    
    const dotsContainer = document.querySelector('.acme-loading-dots');
    expect(dotsContainer).toBeInTheDocument();
  });

  it('renders pulse variant', () => {
    render(<LoadingScreen variant="pulse" />);
    
    const pulseContainer = document.querySelector('.acme-loading-pulse');
    expect(pulseContainer).toBeInTheDocument();
  });

  it('renders progress variant with progress value', () => {
    render(<LoadingScreen variant="progress" progress={50} showProgress={true} />);
    
    expect(screen.getByText('50% complete')).toBeInTheDocument();
  });

  it('renders skeleton variant', () => {
    render(<LoadingScreen variant="skeleton" />);
    
    const skeletonContainer = document.querySelector('.acme-loading-skeleton-default');
    expect(skeletonContainer).toBeInTheDocument();
  });

  it('renders fullscreen mode', () => {
    render(<LoadingScreen mode="fullscreen" />);
    
    const loadingScreen = screen.getByRole('status');
    expect(loadingScreen).toHaveClass('acme-loading-screen-fullscreen');
  });

  it('renders overlay mode with backdrop', () => {
    render(<LoadingScreen mode="overlay" />);
    
    const loadingScreen = screen.getByRole('status');
    expect(loadingScreen).toHaveClass('acme-loading-screen-overlay');
    
    const backdrop = document.querySelector('.acme-loading-screen-backdrop');
    expect(backdrop).toBeInTheDocument();
  });

  it('applies size variants correctly', () => {
    const { rerender } = render(<LoadingScreen size="small" />);
    
    let loadingScreen = screen.getByRole('status');
    expect(loadingScreen).toHaveClass('acme-loading-screen-small');
    
    rerender(<LoadingScreen size="large" />);
    loadingScreen = screen.getByRole('status');
    expect(loadingScreen).toHaveClass('acme-loading-screen-large');
  });

  it('renders custom skeleton content', () => {
    const customSkeleton = (
      <div data-testid="custom-skeleton">
        <div>Custom skeleton line 1</div>
        <div>Custom skeleton line 2</div>
      </div>
    );
    
    render(<LoadingScreen variant="skeleton">{customSkeleton}</LoadingScreen>);
    
    expect(screen.getByTestId('custom-skeleton')).toBeInTheDocument();
    expect(screen.getByText('Custom skeleton line 1')).toBeInTheDocument();
  });

  it('shows timeout state after timeout period', async () => {
    const onTimeout = jest.fn();
    render(<LoadingScreen timeout={100} onTimeout={onTimeout} />);
    
    // Fast-forward time to trigger timeout
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    expect(onTimeout).toHaveBeenCalled();
  });

  it('includes screen reader text', () => {
    render(<LoadingScreen message="Loading data" />);
    
    expect(screen.getByText('Loading data Please wait.')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<LoadingScreen className="custom-class" />);
    
    const loadingScreen = screen.getByRole('status');
    expect(loadingScreen).toHaveClass('custom-class');
  });
});

describe('LoadingScreen.Suspense', () => {
  it('renders children when not suspended', () => {
    render(
      <LoadingScreen.Suspense>
        <div>Loaded content</div>
      </LoadingScreen.Suspense>
    );
    
    expect(screen.getByText('Loaded content')).toBeInTheDocument();
  });

  it('uses custom fallback when provided', () => {
    const CustomFallback = () => <div>Custom loading...</div>;
    
    render(
      <LoadingScreen.Suspense fallback={<CustomFallback />}>
        <div>Content</div>
      </LoadingScreen.Suspense>
    );
    
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});

describe('LoadingScreen.Async', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
  });

  it('shows loading state while async operation is pending', async () => {
    const asyncOperation = () => new Promise(resolve => setTimeout(() => resolve('data'), 100));
    
    render(
      <LoadingScreen.Async asyncOperation={asyncOperation}>
        {(data) => <div>Data: {data}</div>}
      </LoadingScreen.Async>
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('calls onSuccess when async operation completes', async () => {
    const onSuccess = jest.fn();
    const asyncOperation = () => Promise.resolve('success');
    
    render(
      <LoadingScreen.Async asyncOperation={asyncOperation} onSuccess={onSuccess}>
        {(data) => <div>Data: {data}</div>}
      </LoadingScreen.Async>
    );
    
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith('success');
    });
  });
});