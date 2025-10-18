import React from 'react';
import './RadioGroup.css';

const RadioGroup = ({
  name,
  value,
  onChange,
  options = [],
  disabled = false,
  required = false,
  label = '',
  description = '',
  direction = 'vertical', // 'vertical' | 'horizontal'
  size = 'medium',
  error = '',
  className = '',
  ...props
}) => {
  const groupId = name || `radio-group-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (optionValue) => {
    if (disabled) return;
    if (onChange) {
      onChange({
        target: {
          name: groupId,
          value: optionValue
        }
      });
    }
  };

  return (
    <div className={`acme-radio-group ${direction} ${size} ${disabled ? 'disabled' : ''} ${error ? 'error' : ''} ${className}`} {...props}>
      {label && (
        <div className="radio-group-header">
          <label className="radio-group-label">
            {label}
            {required && <span className="required-star">*</span>}
          </label>
          {description && (
            <p className="radio-group-description">{description}</p>
          )}
        </div>
      )}

      <div className="radio-options">
        {options.map((option, index) => {
          const optionValue = typeof option === 'string' ? option : option.value;
          const optionLabel = typeof option === 'string' ? option : option.label;
          const optionDisabled = disabled || (typeof option === 'object' && option.disabled);
          const optionDescription = typeof option === 'object' ? option.description : null;
          const radioId = `${groupId}-option-${index}`;
          const isChecked = value === optionValue;

          return (
            <div 
              key={optionValue} 
              className={`radio-option ${optionDisabled ? 'disabled' : ''} ${isChecked ? 'checked' : ''}`}
            >
              <input
                type="radio"
                id={radioId}
                name={groupId}
                value={optionValue}
                checked={isChecked}
                onChange={() => handleChange(optionValue)}
                disabled={optionDisabled}
                required={required}
                className="radio-input"
              />
              <label htmlFor={radioId} className="radio-label">
                <span className="radio-indicator">
                  <span className="radio-dot"></span>
                </span>
                <span className="radio-content">
                  <span className="radio-text">{optionLabel}</span>
                  {optionDescription && (
                    <span className="radio-description">{optionDescription}</span>
                  )}
                </span>
              </label>
            </div>
          );
        })}
      </div>

      {error && (
        <div className="radio-group-error">
          {error}
        </div>
      )}
    </div>
  );
};

export default RadioGroup;