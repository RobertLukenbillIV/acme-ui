import React from 'react';
import './Link.css';

/**
 * Link component - Accessible and consistent links
 * 
 * Features:
 * - Consistent styling with design tokens
 * - Multiple variants (default, subtle, button-like)
 * - External link handling with security
 * - Accessibility features (visited, focus states)
 * - Icon support for external links
 */
const Link = ({
  href,
  children,
  variant = 'default',
  size = 'base',
  color = 'primary',
  external = false,
  showExternalIcon = true,
  underline = true,
  className = '',
  ...props
}) => {
  // Automatically detect external links
  const isExternal = external || (href && (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')));
  
  // External link props for security
  const externalProps = isExternal ? {
    target: '_blank',
    rel: 'noopener noreferrer'
  } : {};
  
  // Build CSS classes
  const linkClasses = [
    'acme-link',
    `acme-link-variant-${variant}`,
    `acme-link-size-${size}`,
    `acme-link-color-${color}`,
    !underline && 'acme-link-no-underline',
    className
  ].filter(Boolean).join(' ');

  return (
    <a 
      href={href}
      className={linkClasses}
      {...externalProps}
      {...props}
    >
      {children}
      {isExternal && showExternalIcon && (
        <span className="acme-link-external-icon" aria-label="(opens in new tab)">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
          </svg>
        </span>
      )}
    </a>
  );
};

export default Link;