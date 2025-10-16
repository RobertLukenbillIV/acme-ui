import React, { useState } from 'react';
import './Navigation.css';

const Navigation = ({ companyName = "Acme Corp", links = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleNavigation = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav className={`acme-navigation ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="nav-header">
        <button 
          className="nav-toggle" 
          onClick={toggleNavigation}
          aria-label="Toggle navigation"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        {isExpanded && <span className="company-name">{companyName}</span>}
      </div>
      {isExpanded && (
        <ul className="nav-links">
          {links.map((link, index) => (
            <li key={index} className="nav-link-item">
              <a href={link.href} className="nav-link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
