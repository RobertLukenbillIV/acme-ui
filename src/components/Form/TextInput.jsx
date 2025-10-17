import React from 'react';
import './Form.css';

const TextInput = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  type = "text",
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
      <input
        type={type}
        className={`acme-form-input ${error ? 'error' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      {error && <span className="acme-form-error">{error}</span>}
    </div>
  );
};

export default TextInput;
