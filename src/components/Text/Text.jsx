import React from 'react';
import './Text.css';

/**
 * Text component - Consistent body text with semantic variants
 * 
 * Features:
 * - Multiple text sizes (xs, sm, base, lg, xl)
 * - Semantic variants (body, caption, label, code)
 * - Color variants for different contexts
 * - Flexible element rendering (p, span, div, etc.)
 * - Typography token integration
 */
const Text = ({
  as = 'p',
  size = 'base',
  variant = 'body',
  color = 'primary',
  weight,
  align,
  children,
  className = '',
  ...props
}) => {
  // Create the appropriate element
  const Element = as;
  
  // Build CSS classes
  const textClasses = [
    'acme-text',
    `acme-text-${size}`,
    `acme-text-variant-${variant}`,
    `acme-text-color-${color}`,
    weight && `acme-font-${weight}`,
    align && `acme-text-${align}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <Element 
      className={textClasses}
      {...props}
    >
      {children}
    </Element>
  );
};

export default Text;