import React from 'react';
import './ErrorBoundary.css';

/**
 * ErrorBoundary component - React error boundary for graceful error handling
 * 
 * Features:
 * - Catches JavaScript errors in child components
 * - Displays user-friendly error messages
 * - Retry functionality to recover from errors
 * - Multiple display variants (full-page, inline, minimal)
 * - Error reporting and logging capabilities
 * - Development vs production error details
 * - Fallback component customization
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Update state with error details
    this.setState({
      error,
      errorInfo
    });

    // Log error to external service
    this.logError(error, errorInfo);
  }

  logError = (error, errorInfo) => {
    const { onError, enableLogging = true } = this.props;

    if (enableLogging && typeof console !== 'undefined') {
      console.error('ErrorBoundary caught an error:', error);
      console.error('Error Info:', errorInfo);
    }

    // Call custom error handler if provided
    if (onError) {
      onError(error, errorInfo, this.state.retryCount);
    }

    // Report to external service (if configured)
    if (typeof window !== 'undefined' && window.errorReporting) {
      window.errorReporting.reportError(error, {
        componentStack: errorInfo.componentStack,
        retryCount: this.state.retryCount,
        timestamp: new Date().toISOString()
      });
    }
  };

  retry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }));
  };

  reload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render() {
    const {
      children,
      fallback: CustomFallback,
      variant = 'full-page', // 'full-page' | 'inline' | 'minimal'
      showRetry = true,
      showReload = true,
      showDetails = process.env.NODE_ENV === 'development',
      maxRetries = 3,
      title = 'Something went wrong',
      message = 'We encountered an unexpected error. Please try again.',
      className = '',
      ...props
    } = this.props;

    const { hasError, error, errorInfo, retryCount } = this.state;

    if (hasError) {
      // Use custom fallback if provided
      if (CustomFallback) {
        return (
          <CustomFallback
            error={error}
            errorInfo={errorInfo}
            retry={this.retry}
            reload={this.reload}
            retryCount={retryCount}
            maxRetries={maxRetries}
          />
        );
      }

      // Default error UI
      const componentClasses = [
        'acme-error-boundary',
        `acme-error-boundary-${variant}`,
        className
      ].filter(Boolean).join(' ');

      const canRetry = retryCount < maxRetries;

      return (
        <div className={componentClasses} role="alert" {...props}>
          <div className="acme-error-boundary-content">
            {/* Error Icon */}
            <div className="acme-error-boundary-icon">
              {variant === 'minimal' ? '⚠️' : '🚨'}
            </div>

            {/* Error Title */}
            <h2 className="acme-error-boundary-title">
              {title}
            </h2>

            {/* Error Message */}
            <p className="acme-error-boundary-message">
              {message}
            </p>

            {/* Retry Count */}
            {retryCount > 0 && (
              <p className="acme-error-boundary-retry-count">
                Retry attempt: {retryCount}/{maxRetries}
              </p>
            )}

            {/* Action Buttons */}
            <div className="acme-error-boundary-actions">
              {showRetry && canRetry && (
                <button
                  className="acme-error-boundary-button acme-error-boundary-button-primary"
                  onClick={this.retry}
                >
                  Try Again
                </button>
              )}
              
              {showReload && (
                <button
                  className="acme-error-boundary-button acme-error-boundary-button-secondary"
                  onClick={this.reload}
                >
                  Reload Page
                </button>
              )}
            </div>

            {/* Error Details (Development) */}
            {showDetails && error && (
              <details className="acme-error-boundary-details">
                <summary className="acme-error-boundary-details-summary">
                  Technical Details
                </summary>
                <div className="acme-error-boundary-details-content">
                  <div className="acme-error-boundary-error-section">
                    <h4>Error Message:</h4>
                    <pre className="acme-error-boundary-error-text">
                      {error.toString()}
                    </pre>
                  </div>
                  
                  {error.stack && (
                    <div className="acme-error-boundary-error-section">
                      <h4>Stack Trace:</h4>
                      <pre className="acme-error-boundary-error-text">
                        {error.stack}
                      </pre>
                    </div>
                  )}
                  
                  {errorInfo && errorInfo.componentStack && (
                    <div className="acme-error-boundary-error-section">
                      <h4>Component Stack:</h4>
                      <pre className="acme-error-boundary-error-text">
                        {errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            {/* Help Text */}
            {variant === 'full-page' && (
              <div className="acme-error-boundary-help">
                <p>If this problem persists, please:</p>
                <ul>
                  <li>Check your internet connection</li>
                  <li>Clear your browser cache</li>
                  <li>Try using a different browser</li>
                  <li>Contact support if the issue continues</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      );
    }

    // No error, render children normally
    return children;
  }
}

// Functional wrapper component for hooks support
const ErrorBoundaryWrapper = (props) => {
  return <ErrorBoundary {...props} />;
};

// Higher-order component for wrapping components with error boundary
ErrorBoundary.withErrorBoundary = (WrappedComponent, errorBoundaryProps = {}) => {
  const ComponentWithErrorBoundary = (props) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  ComponentWithErrorBoundary.displayName = `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;
  
  return ComponentWithErrorBoundary;
};

// Hook for triggering errors (useful for testing)
ErrorBoundary.useThrowError = () => {
  return (error) => {
    throw error instanceof Error ? error : new Error(error);
  };
};

export default ErrorBoundary;