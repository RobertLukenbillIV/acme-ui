import React, { cloneElement, isValidElement } from 'react';
import './InputGroup.css';

const InputGroup = ({
  children,
  label,
  prefix,
  suffix,
  icon,
  iconPosition = 'left',
  size = 'medium',
  variant = 'default',
  required = false,
  error = null,
  helpText = null,
  disabled = false,
  className = ''
}) => {
  // Handle children - clone and pass additional props
  const enhancedChildren = React.Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        disabled: disabled || child.props.disabled,
        error: error || child.props.error,
        required: required || child.props.required,
        // Remove label from child since InputGroup handles it
        label: undefined
      });
    }
    return child;
  });

  return (
    <div className={`acme-input-group ${className}`}>
      {label && (
        <label className="acme-form-label">
          {label}
          {required && <span className="required-star">*</span>}
        </label>
      )}
      
      <div className={`acme-input-group-container ${size} ${variant} ${error ? 'error' : ''} ${disabled ? 'disabled' : ''}`}>
        {/* Left icon */}
        {icon && iconPosition === 'left' && (
          <div className="acme-input-group-icon left">
            {typeof icon === 'string' ? (
              <span className="icon-text">{icon}</span>
            ) : (
              icon
            )}
          </div>
        )}

        {/* Prefix */}
        {prefix && (
          <div className="acme-input-group-addon prefix">
            {prefix}
          </div>
        )}

        {/* Main input content */}
        <div className="acme-input-group-content">
          {enhancedChildren}
        </div>

        {/* Suffix */}
        {suffix && (
          <div className="acme-input-group-addon suffix">
            {suffix}
          </div>
        )}

        {/* Right icon */}
        {icon && iconPosition === 'right' && (
          <div className="acme-input-group-icon right">
            {typeof icon === 'string' ? (
              <span className="icon-text">{icon}</span>
            ) : (
              icon
            )}
          </div>
        )}
      </div>

      {/* Help text */}
      {helpText && !error && (
        <div className="acme-input-group-help">
          {helpText}
        </div>
      )}

      {/* Error message */}
      {error && <span className="acme-form-error">{error}</span>}
    </div>
  );
};

// Predefined addon components for common use cases
const InputGroupAddon = ({ children, className = '' }) => (
  <div className={`acme-input-group-addon ${className}`}>
    {children}
  </div>
);

const InputGroupIcon = ({ children, position = 'left', className = '' }) => (
  <div className={`acme-input-group-icon ${position} ${className}`}>
    {children}
  </div>
);

// Export components
InputGroup.Addon = InputGroupAddon;
InputGroup.Icon = InputGroupIcon;

export default InputGroup;
export { InputGroupAddon, InputGroupIcon };