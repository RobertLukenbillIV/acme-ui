import React, { useState } from 'react';
import './TabbedCard.css';

const TabbedCard = ({ 
  title, 
  tabs = [], 
  defaultTab = 0,
  variant = 'default',
  className = '',
  onTabChange,
  ...props 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index, tabs[index]);
    }
  };

  if (!tabs || tabs.length === 0) {
    return (
      <div className={`acme-tabbed-card empty ${className}`} {...props}>
        <div className="tabbed-card-header">
          {title && <h3 className="tabbed-card-title">{title}</h3>}
        </div>
        <div className="tabbed-card-body">
          <p className="no-tabs-message">No tabs provided</p>
        </div>
      </div>
    );
  }

  const activeTabData = tabs[activeTab] || tabs[0];

  return (
    <div className={`acme-tabbed-card ${variant} ${className}`} {...props}>
      {title && (
        <div className="tabbed-card-header">
          <h3 className="tabbed-card-title">{title}</h3>
        </div>
      )}
      
      <div className="tabbed-card-tabs">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${index === activeTab ? 'active' : ''} ${tab.disabled ? 'disabled' : ''}`}
            onClick={() => !tab.disabled && handleTabClick(index)}
            disabled={tab.disabled}
            title={tab.tooltip}
          >
            {tab.icon && <span className="tab-icon">{tab.icon}</span>}
            <span className="tab-label">{tab.label}</span>
            {tab.badge && <span className="tab-badge">{tab.badge}</span>}
          </button>
        ))}
      </div>

      <div className="tabbed-card-content">
        {activeTabData && (
          <>
            {activeTabData.title && (
              <h4 className="tab-content-title">{activeTabData.title}</h4>
            )}
            
            <div className="tab-content-body">
              {typeof activeTabData.content === 'string' ? (
                <p>{activeTabData.content}</p>
              ) : (
                activeTabData.content
              )}
            </div>

            {activeTabData.footer && (
              <div className="tab-content-footer">
                {activeTabData.footer}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TabbedCard;