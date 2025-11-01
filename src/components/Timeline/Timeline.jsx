import React from 'react';
import './Timeline.css';

const Timeline = ({ 
  items = [], 
  variant = 'vertical', 
  color = 'primary',
  size = 'medium',
  showTime = true,
  showConnectors = true,
  interactive = false,
  className = '',
  onItemClick,
  ...props 
}) => {
  const getColorClass = () => {
    const colorMap = {
      primary: 'primary',
      success: 'success',
      warning: 'warning',
      danger: 'danger',
      info: 'info',
      gray: 'gray'
    };
    return colorMap[color] || 'primary';
  };

  const formatDate = (date) => {
    if (!date) return '';
    
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return date;
    
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: showTime ? '2-digit' : undefined,
      minute: showTime ? '2-digit' : undefined
    });
  };

  const handleItemClick = (item, index) => {
    if (interactive && onItemClick) {
      onItemClick(item, index);
    }
  };

  const TimelineItem = ({ item, index, isLast }) => (
    <div 
      className={`timeline-item ${item.type || ''} ${interactive ? 'interactive' : ''}`}
      onClick={() => handleItemClick(item, index)}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={(e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleItemClick(item, index);
        }
      }}
    >
      <div className="timeline-marker">
        {item.icon ? (
          <div className="timeline-icon">
            {typeof item.icon === 'string' ? (
              <span>{item.icon}</span>
            ) : (
              item.icon
            )}
          </div>
        ) : (
          <div className="timeline-dot" />
        )}
        {showConnectors && !isLast && <div className="timeline-connector" />}
      </div>
      
      <div className="timeline-content">
        {item.date && (
          <div className="timeline-date">
            {formatDate(item.date)}
          </div>
        )}
        
        {item.title && (
          <div className="timeline-title">
            {item.title}
          </div>
        )}
        
        {item.description && (
          <div className="timeline-description">
            {item.description}
          </div>
        )}
        
        {item.tags && item.tags.length > 0 && (
          <div className="timeline-tags">
            {item.tags.map((tag, tagIndex) => (
              <span key={tagIndex} className="timeline-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {item.content && (
          <div className="timeline-extra-content">
            {item.content}
          </div>
        )}
      </div>
    </div>
  );

  if (!items || items.length === 0) {
    return (
      <div className={`acme-timeline empty ${className}`} {...props}>
        <div className="timeline-empty-state">
          <p>No timeline items to display</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`acme-timeline ${variant} ${getColorClass()} ${size} ${className}`}
      {...props}
    >
      <div className="timeline-container">
        {items.map((item, index) => (
          <TimelineItem 
            key={item.id || index} 
            item={item} 
            index={index}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

// Alternative horizontal timeline component
const HorizontalTimeline = ({ 
  items = [], 
  color = 'primary',
  size = 'medium',
  showLabels = true,
  className = '',
  onItemClick,
  ...props 
}) => {
  const getColorClass = () => {
    const colorMap = {
      primary: 'primary',
      success: 'success',
      warning: 'warning',
      danger: 'danger',
      info: 'info',
      gray: 'gray'
    };
    return colorMap[color] || 'primary';
  };

  const handleItemClick = (item, index) => {
    if (onItemClick) {
      onItemClick(item, index);
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className={`acme-horizontal-timeline empty ${className}`} {...props}>
        <div className="timeline-empty-state">
          <p>No timeline items to display</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`acme-horizontal-timeline ${getColorClass()} ${size} ${className}`}
      {...props}
    >
      <div className="horizontal-timeline-track">
        {items.map((item, index) => (
          <div 
            key={item.id || index}
            className={`horizontal-timeline-item ${item.type || ''} ${item.completed ? 'completed' : ''} ${onItemClick ? 'interactive' : ''}`}
            style={{ 
              left: `${(index / (items.length - 1)) * 100}%`,
              transform: 'translateX(-50%)'
            }}
            onClick={() => handleItemClick(item, index)}
            role={onItemClick ? 'button' : undefined}
            tabIndex={onItemClick ? 0 : undefined}
            onKeyDown={(e) => {
              if (onItemClick && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                handleItemClick(item, index);
              }
            }}
          >
            <div className="horizontal-timeline-marker">
              {item.icon ? (
                <div className="horizontal-timeline-icon">
                  {typeof item.icon === 'string' ? (
                    <span>{item.icon}</span>
                  ) : (
                    item.icon
                  )}
                </div>
              ) : (
                <div className="horizontal-timeline-dot" />
              )}
            </div>
            
            {showLabels && (
              <div className="horizontal-timeline-label">
                {item.title && (
                  <div className="horizontal-timeline-title">
                    {item.title}
                  </div>
                )}
                {item.date && (
                  <div className="horizontal-timeline-date">
                    {new Date(item.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        
        <div className="horizontal-timeline-progress">
          <div 
            className="horizontal-timeline-progress-fill"
            style={{
              width: `${(items.filter(item => item.completed).length / items.length) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Process timeline for step-by-step workflows
const ProcessTimeline = ({ 
  steps = [], 
  currentStep = 0,
  color = 'primary',
  size = 'medium',
  orientation = 'vertical',
  showNumbers = true,
  className = '',
  onStepClick,
  ...props 
}) => {
  const getColorClass = () => {
    const colorMap = {
      primary: 'primary',
      success: 'success',
      warning: 'warning',
      danger: 'danger',
      info: 'info',
      gray: 'gray'
    };
    return colorMap[color] || 'primary';
  };

  const getStepStatus = (index) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'current';
    return 'pending';
  };

  const handleStepClick = (step, index) => {
    if (onStepClick) {
      onStepClick(step, index);
    }
  };

  if (!steps || steps.length === 0) {
    return (
      <div className={`acme-process-timeline empty ${className}`} {...props}>
        <div className="timeline-empty-state">
          <p>No process steps to display</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`acme-process-timeline ${orientation} ${getColorClass()} ${size} ${className}`}
      {...props}
    >
      <div className="process-timeline-container">
        {steps.map((step, index) => (
          <div 
            key={step.id || index}
            className={`process-step ${getStepStatus(index)} ${onStepClick ? 'interactive' : ''}`}
            onClick={() => handleStepClick(step, index)}
            role={onStepClick ? 'button' : undefined}
            tabIndex={onStepClick ? 0 : undefined}
            onKeyDown={(e) => {
              if (onStepClick && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                handleStepClick(step, index);
              }
            }}
          >
            <div className="process-step-marker">
              {step.icon ? (
                <div className="process-step-icon">
                  {typeof step.icon === 'string' ? (
                    <span>{step.icon}</span>
                  ) : (
                    step.icon
                  )}
                </div>
              ) : showNumbers ? (
                <div className="process-step-number">
                  {index + 1}
                </div>
              ) : (
                <div className="process-step-dot" />
              )}
              {index < steps.length - 1 && <div className="process-step-connector" />}
            </div>
            
            <div className="process-step-content">
              {step.title && (
                <div className="process-step-title">
                  {step.title}
                </div>
              )}
              
              {step.description && (
                <div className="process-step-description">
                  {step.description}
                </div>
              )}
              
              {step.duration && (
                <div className="process-step-duration">
                  {step.duration}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Timeline.Horizontal = HorizontalTimeline;
Timeline.Process = ProcessTimeline;

export default Timeline;