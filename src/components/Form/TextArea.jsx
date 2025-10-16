import React from 'react';
import './Form.css';

const TextArea = ({ 
  label, 
  value, 
  onChange, 
  placeholder,
  rows = 4,
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
      <textarea
        className={`acme-form-textarea ${error ? 'error' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
      />
      {error && <span className="acme-form-error">{error}</span>}
    </div>
  );
};

export default TextArea;
