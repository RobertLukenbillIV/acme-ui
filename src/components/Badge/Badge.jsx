import React from 'react';
import './Badge.css';

const Badge = ({
  children,
  variant = 'default',
  size = 'medium',
  color = null,
  dot = false,
  max = 99,
  showZero = false,
  className = '',
  ...props
}) => {
  // Handle numeric badges with max value
  const renderContent = () => {
    if (dot) return null;
    
    if (typeof children === 'number') {
      if (children === 0 && !showZero) return null;
      return children > max ? `${max}+` : children;
    }
    
    return children;
  };

  const content = renderContent();
  
  // Don't render if no content and not a dot
  if (!content && !dot) return null;

  const badgeClasses = [
    'acme-badge',
    variant,
    size,
    dot ? 'dot' : '',
    color ? `color-${color}` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={badgeClasses} {...props}>
      {content}
    </span>
  );
};

// Wrapper component for badges attached to other elements
export const BadgeWrapper = ({ 
  children, 
  badge, 
  position = 'top-right',
  className = '',
  ...props 
}) => {
  return (
    <div className={`acme-badge-wrapper ${position} ${className}`} {...props}>
      {children}
      {badge && (
        <div className="badge-container">
          {React.isValidElement(badge) ? badge : <Badge>{badge}</Badge>}
        </div>
      )}
    </div>
  );
};

export default Badge;