import React from 'react';
import './Avatar.css';

const Avatar = ({
  src = null,
  alt = '',
  name = '',
  size = 'medium',
  variant = 'circle',
  status = null, // 'online', 'offline', 'away', 'busy'
  className = '',
  fallbackIcon = null,
  onClick,
  ...props
}) => {
  // Generate initials from name
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Fallback content
  const renderFallback = () => {
    if (fallbackIcon) return fallbackIcon;
    return <span className="avatar-initials">{getInitials(name || alt)}</span>;
  };

  return (
    <div 
      className={`acme-avatar ${size} ${variant} ${status ? `status-${status}` : ''} ${onClick ? 'clickable' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      <div className="avatar-content">
        {src ? (
          <img 
            src={src} 
            alt={alt || `${name}'s avatar`}
            className="avatar-image"
            onError={(e) => {
              // Hide image on error and show fallback
              e.target.style.display = 'none';
              const fallback = e.target.parentNode.querySelector('.avatar-fallback');
              if (fallback) fallback.style.display = 'flex';
            }}
          />
        ) : null}
        
        <div className={`avatar-fallback ${src ? 'hidden' : ''}`}>
          {renderFallback()}
        </div>
      </div>

      {/* Status indicator */}
      {status && (
        <div className="avatar-status" aria-label={`Status: ${status}`}>
          <div className="status-dot"></div>
        </div>
      )}
    </div>
  );
};

export default Avatar;