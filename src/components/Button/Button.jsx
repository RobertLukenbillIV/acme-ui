import React from 'react';
import './Button.css';

const Button = ({
  children,
  variant = 'default',
  size = 'medium',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  return (
    <button
      type={type}
      className={`acme-button ${variant} ${size} ${disabled ? 'disabled' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;