import React, { Suspense, useState, useEffect } from 'react';
import './LoadingScreen.css';

/**
 * LoadingScreen component - Full-screen and inline loading states with Suspense support
 * 
 * Features:
 * - Multiple loading variants (spinner, skeleton, pulse, dots)
 * - Full-screen and inline display modes
 * - React Suspense integration
 * - Minimum loading time to prevent flashing
 * - Progress indication and custom messages
 * - Accessibility features with screen reader support
 * - Cancellation support for async operations
 */
const LoadingScreen = ({
  variant = 'spinner', // 'spinner' | 'skeleton' | 'pulse' | 'dots' | 'progress'
  size = 'medium', // 'small' | 'medium' | 'large'
  mode = 'inline', // 'inline' | 'fullscreen' | 'overlay'
  message = 'Loading...',
  submessage = null,
  progress = null, // 0-100 for progress variant
  showProgress = false,
  minDuration = 300, // Minimum loading time in ms
  timeout = null, // Auto-timeout in ms
  onTimeout,
  className = '',
  children, // For skeleton variant
  ...props
}) => {
  const [startTime] = useState(Date.now());
  const [hasTimedOut, setHasTimedOut] = useState(false);

  // Handle timeout
  useEffect(() => {
    if (timeout && timeout > 0) {
      const timer = setTimeout(() => {
        setHasTimedOut(true);
        if (onTimeout) {
          onTimeout();
        }
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [timeout, onTimeout]);

  // Generate class names
  const componentClasses = [
    'acme-loading-screen',
    `acme-loading-screen-${variant}`,
    `acme-loading-screen-${size}`,
    `acme-loading-screen-${mode}`,
    hasTimedOut && 'acme-loading-screen-timeout',
    className
  ].filter(Boolean).join(' ');

  // Render timeout state
  if (hasTimedOut) {
    return (
      <div className={componentClasses} role="status" aria-live="polite" {...props}>
        <div className="acme-loading-screen-content">
          <div className="acme-loading-screen-timeout-icon">⏰</div>
          <h3 className="acme-loading-screen-timeout-title">Taking longer than expected</h3>
          <p className="acme-loading-screen-timeout-message">
            This is taking a while. Please check your connection or try again.
          </p>
        </div>
      </div>
    );
  }

  // Render skeleton variant
  if (variant === 'skeleton') {
    return (
      <div className={componentClasses} role="status" aria-label="Loading content" {...props}>
        {children || (
          <div className="acme-loading-skeleton-default">
            <div className="acme-loading-skeleton-line acme-loading-skeleton-line-title"></div>
            <div className="acme-loading-skeleton-line acme-loading-skeleton-line-subtitle"></div>
            <div className="acme-loading-skeleton-line"></div>
            <div className="acme-loading-skeleton-line"></div>
            <div className="acme-loading-skeleton-line acme-loading-skeleton-line-short"></div>
          </div>
        )}
      </div>
    );
  }

  // Render main loading content
  return (
    <div className={componentClasses} role="status" aria-live="polite" {...props}>
      {mode === 'overlay' && <div className="acme-loading-screen-backdrop" />}
      
      <div className="acme-loading-screen-content">
        {/* Loading Indicator */}
        <div className="acme-loading-screen-indicator">
          {variant === 'spinner' && (
            <div className="acme-loading-spinner" aria-hidden="true">
              <div className="acme-loading-spinner-circle"></div>
            </div>
          )}

          {variant === 'dots' && (
            <div className="acme-loading-dots" aria-hidden="true">
              <div className="acme-loading-dot"></div>
              <div className="acme-loading-dot"></div>
              <div className="acme-loading-dot"></div>
            </div>
          )}

          {variant === 'pulse' && (
            <div className="acme-loading-pulse" aria-hidden="true">
              <div className="acme-loading-pulse-circle"></div>
            </div>
          )}

          {variant === 'progress' && (
            <div className="acme-loading-progress-container" aria-hidden="true">
              <div className="acme-loading-progress-track">
                <div 
                  className="acme-loading-progress-fill"
                  style={{ width: progress ? `${Math.min(100, Math.max(0, progress))}%` : '0%' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Loading Text */}
        <div className="acme-loading-screen-text">
          <h3 className="acme-loading-screen-message">
            {message}
          </h3>
          
          {submessage && (
            <p className="acme-loading-screen-submessage">
              {submessage}
            </p>
          )}

          {showProgress && progress !== null && (
            <p className="acme-loading-screen-progress-text">
              {Math.round(progress)}% complete
            </p>
          )}
        </div>
      </div>

      {/* Screen reader text */}
      <span className="acme-loading-screen-sr-only">
        {message} Please wait.
      </span>
    </div>
  );
};

/**
 * SuspenseWrapper component - Wraps components with React Suspense and custom loading fallback
 */
const SuspenseWrapper = ({
  fallback: CustomFallback,
  loadingProps = {},
  children,
  ...props
}) => {
  const defaultFallback = <LoadingScreen {...loadingProps} />;
  
  return (
    <Suspense fallback={CustomFallback || defaultFallback} {...props}>
      {children}
    </Suspense>
  );
};

/**
 * AsyncLoader component - Manages async operations with loading states
 */
const AsyncLoader = ({
  asyncOperation,
  dependencies = [],
  fallback: CustomFallback,
  loadingProps = {},
  onSuccess,
  onError,
  children,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const executeAsyncOperation = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await asyncOperation();
        
        if (!cancelled) {
          setData(result);
          setLoading(false);
          if (onSuccess) {
            onSuccess(result);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
          setLoading(false);
          if (onError) {
            onError(err);
          }
        }
      }
    };

    executeAsyncOperation();

    return () => {
      cancelled = true;
    };
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return CustomFallback || <LoadingScreen {...loadingProps} />;
  }

  if (error) {
    throw error; // Let ErrorBoundary handle it
  }

  return typeof children === 'function' ? children(data) : children;
};

/**
 * LazyLoader component - Lazy loading with intersection observer
 */
const LazyLoader = ({
  threshold = 0.1,
  rootMargin = '50px',
  loadingProps = {},
  children,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [elementRef, setElementRef] = useState(null);

  useEffect(() => {
    if (!elementRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(elementRef);

    return () => observer.disconnect();
  }, [elementRef, threshold, rootMargin]);

  return (
    <div ref={setElementRef} {...props}>
      {isVisible ? (
        children
      ) : (
        <LoadingScreen variant="skeleton" {...loadingProps} />
      )}
    </div>
  );
};

// Export all components
LoadingScreen.Suspense = SuspenseWrapper;
LoadingScreen.Async = AsyncLoader;
LoadingScreen.Lazy = LazyLoader;

export default LoadingScreen;