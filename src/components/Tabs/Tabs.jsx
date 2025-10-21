import React, { useState } from 'react';
import './Tabs.css';

const Tabs = ({ 
  tabs = [], 
  defaultTab = 0,
  variant = 'default', // 'default', 'pills', 'underline', 'vertical'
  size = 'medium', // 'small', 'medium', 'large'
  className = '',
  onTabChange,
  ...props 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (index) => {
    if (tabs[index]?.disabled) return;
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index, tabs[index]);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTabClick(index);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const direction = e.key === 'ArrowLeft' ? -1 : 1;
      const nextIndex = (index + direction + tabs.length) % tabs.length;
      // Skip disabled tabs
      let targetIndex = nextIndex;
      while (tabs[targetIndex]?.disabled && targetIndex !== index) {
        targetIndex = (targetIndex + direction + tabs.length) % tabs.length;
      }
      if (!tabs[targetIndex]?.disabled) {
        handleTabClick(targetIndex);
      }
    }
  };

  if (!tabs || tabs.length === 0) {
    return (
      <div className={`acme-tabs empty ${className}`} {...props}>
        <div className="tabs-list">
          <div className="no-tabs-message">No tabs provided</div>
        </div>
      </div>
    );
  }

  const activeTabData = tabs[activeTab] || tabs[0];

  return (
    <div className={`acme-tabs ${variant} ${size} ${className}`} {...props}>
      <div className="tabs-list" role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${index === activeTab ? 'active' : ''} ${tab.disabled ? 'disabled' : ''}`}
            onClick={() => handleTabClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            disabled={tab.disabled}
            role="tab"
            aria-selected={index === activeTab}
            aria-controls={`tabpanel-${index}`}
            id={`tab-${index}`}
            tabIndex={index === activeTab ? 0 : -1}
            title={tab.tooltip}
          >
            {tab.icon && <span className="tab-icon">{tab.icon}</span>}
            <span className="tab-label">{tab.label}</span>
            {tab.badge && <span className="tab-badge">{tab.badge}</span>}
            {tab.closable && (
              <button 
                className="tab-close"
                onClick={(e) => {
                  e.stopPropagation();
                  tab.onClose?.(index);
                }}
                aria-label={`Close ${tab.label} tab`}
              >
                ×
              </button>
            )}
          </button>
        ))}
      </div>
      
      {activeTabData && (
        <div 
          className="tab-content"
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          id={`tabpanel-${activeTab}`}
        >
          {activeTabData.content}
        </div>
      )}
    </div>
  );
};

export default Tabs;