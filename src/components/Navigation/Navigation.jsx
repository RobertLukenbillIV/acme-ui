import React, { useState, useEffect, useRef } from 'react';
import './Navigation.css';

const Navigation = ({ 
  companyName = "Acme Corp", 
  links = [], 
  position = 'left', // 'left', 'right', 'top'
  variant = 'sidebar' // 'sidebar', 'dropdown'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const navRef = useRef(null);

  const toggleNavigation = () => {
    setIsExpanded(!isExpanded);
    setOpenSubmenus({}); // Close all submenus when toggling main nav
  };

  // Close navigation when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && isExpanded) {
        setIsExpanded(false);
        setOpenSubmenus({});
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const toggleSubmenu = (linkKey, e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenSubmenus(prev => ({
      ...prev,
      [linkKey]: !prev[linkKey]
    }));
  };

  const renderNavLinks = (navLinks, level = 0) => {
    return (
      <ul className={`nav-links level-${level}`}>
        {navLinks.map((link, index) => {
          const linkKey = `${level}-${index}`;
          const hasChildren = link.children && link.children.length > 0;
          
          return (
            <li key={linkKey} className={`nav-link-item ${hasChildren ? 'has-children' : ''} ${openSubmenus[linkKey] ? 'open' : ''}`}>
              <div className="nav-link-wrapper">
                <a 
                  href={link.href || '#'} 
                  className="nav-link"
                  onClick={link.onClick}
                >
                  {link.label}
                </a>
                {hasChildren && (
                  <button 
                    className="submenu-toggle"
                    onClick={(e) => toggleSubmenu(linkKey, e)}
                    aria-label={`Toggle ${link.label} submenu`}
                  >
                    <span className={`arrow ${openSubmenus[linkKey] ? 'open' : ''}`}>
                      {position === 'top' ? '▼' : '▶'}
                    </span>
                  </button>
                )}
              </div>
              {hasChildren && openSubmenus[linkKey] && (
                <div className="submenu">
                  {renderNavLinks(link.children, level + 1)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  const navClasses = `acme-navigation ${position} ${variant} ${isExpanded ? 'expanded' : 'collapsed'}`;

  return (
    <nav className={navClasses} ref={navRef}>
      {/* Make the entire collapsed navbar clickable */}
      {!isExpanded && (
        <div 
          className="nav-collapsed-clickable" 
          onClick={toggleNavigation}
          aria-label="Expand navigation"
        >
          <div className="nav-header">
            <button 
              className="nav-toggle" 
              aria-label="Toggle navigation"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>
      )}
      
      {/* Expanded state with individual toggle button */}
      {isExpanded && (
        <>
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
            {variant === 'sidebar' && (
              <span className="company-name">{companyName}</span>
            )}
          </div>
          
          <div className="nav-content">
            {variant === 'dropdown' && position === 'top' && (
              <div className="company-header">
                <span className="company-name">{companyName}</span>
              </div>
            )}
            {renderNavLinks(links)}
          </div>
        </>
      )}
    </nav>
  );
};

export default Navigation;
