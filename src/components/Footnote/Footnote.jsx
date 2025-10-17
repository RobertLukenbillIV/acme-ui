import React from 'react';
import './Footnote.css';

const Footnote = ({ 
  content = null, 
  socialLinks = [], 
  pageLinks = [],
  variant = 'footer', // 'footer' or 'card'
  className = '' 
}) => {
  return (
    <footer className={`acme-footnote ${variant} ${className}`}>
      {content && (
        <div className="footnote-content">
          {content}
        </div>
      )}
      
      <div className="footnote-links-container">
        {/* Social media links - bottom right */}
        {socialLinks.length > 0 && (
          <div className="social-links">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                className="social-link"
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon && <span className="social-icon">{link.icon}</span>}
                {link.label}
              </a>
            ))}
          </div>
        )}
        
        {/* Page links - reverse pyramid layout */}
        {pageLinks.length > 0 && (
          <div className="page-links">
            {pageLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                className="page-link"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footnote;