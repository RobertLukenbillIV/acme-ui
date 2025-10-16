import React from 'react';
import './Form.css';

const Select = ({ 
  label, 
  value, 
  onChange, 
  options = [],
  required = false,
  error = null 
}) => {
  return (
    <div className="acme-form-group">
      {label && (
        <label className="acme-form-label">
          {label}
          {required && <span className="required-star">*</span>}
        </label>
      )}
      <select
        className={`acme-form-select ${error ? 'error' : ''}`}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="acme-form-error">{error}</span>}
    </div>
  );
};

export default Select;
