import React from 'react';
import './Switch.css';

const Switch = ({
  checked = false,
  onChange,
  disabled = false,
  size = 'medium',
  color = 'primary',
  label = '',
  description = '',
  className = '',
  id,
  ...props
}) => {
  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`acme-switch-wrapper ${size} ${disabled ? 'disabled' : ''} ${className}`}>
      <div className="switch-container">
        <input
          type="checkbox"
          id={switchId}
          className="switch-input"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
        <label 
          htmlFor={switchId}
          className={`switch-label ${color} ${checked ? 'checked' : ''}`}
          aria-label={label || 'Toggle switch'}
        >
          <span className="switch-track">
            <span className="switch-thumb"></span>
          </span>
        </label>
      </div>

      {(label || description) && (
        <div className="switch-text">
          {label && (
            <label htmlFor={switchId} className="switch-title">
              {label}
            </label>
          )}
          {description && (
            <p className="switch-description">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Switch;