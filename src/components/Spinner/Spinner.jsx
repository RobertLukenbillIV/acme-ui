import React from 'react';
import './Spinner.css';

const Spinner = ({
  size = 'medium',
  color = 'primary',
  variant = 'circular', // 'circular', 'dots', 'pulse', 'bars'
  className = '',
  label = 'Loading...',
  ...props
}) => {
  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="spinner-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        );
      
      case 'pulse':
        return <div className="spinner-pulse"></div>;
      
      case 'bars':
        return (
          <div className="spinner-bars">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        );
      
      case 'circular':
      default:
        return (
          <div className="spinner-circular">
            <svg viewBox="0 0 50 50">
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="31.416"
                strokeDashoffset="31.416"
              />
            </svg>
          </div>
        );
    }
  };

  return (
    <div 
      className={`acme-spinner ${size} ${color} ${variant} ${className}`}
      role="status"
      aria-label={label}
      {...props}
    >
      {renderSpinner()}
      <span className="sr-only">{label}</span>
    </div>
  );
};

// Loading wrapper component
export const LoadingWrapper = ({
  children,
  loading = false,
  spinner = null,
  overlay = true,
  className = '',
  ...props
}) => {
  return (
    <div className={`loading-wrapper ${loading ? 'loading' : ''} ${className}`} {...props}>
      {children}
      {loading && (
        <div className={`loading-overlay ${overlay ? 'with-overlay' : ''}`}>
          {spinner || <Spinner />}
        </div>
      )}
    </div>
  );
};

export default Spinner;