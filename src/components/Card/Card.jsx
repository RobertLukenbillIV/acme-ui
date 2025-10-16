import React from 'react';
import './Card.css';

const Card = ({ 
  title, 
  children, 
  footer,
  className = '' 
}) => {
  return (
    <div className={`acme-card ${className}`}>
      {title && (
        <div className="acme-card-header">
          <h3 className="acme-card-title">{title}</h3>
        </div>
      )}
      <div className="acme-card-body">
        {children}
      </div>
      {footer && (
        <div className="acme-card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
