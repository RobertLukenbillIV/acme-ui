import React from 'react';
import './Form.css';

const Checkbox = ({ 
  label, 
  checked, 
  onChange,
  required = false 
}) => {
  return (
    <div className="acme-form-group acme-checkbox-group">
      <label className="acme-checkbox-label">
        <input
          type="checkbox"
          className="acme-form-checkbox"
          checked={checked}
          onChange={onChange}
          required={required}
        />
        <span className="checkbox-text">
          {label}
          {required && <span className="required-star">*</span>}
        </span>
      </label>
    </div>
  );
};

export default Checkbox;
