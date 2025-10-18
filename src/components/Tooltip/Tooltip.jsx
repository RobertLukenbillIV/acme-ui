import React, { useState, useRef, useEffect } from 'react';
import './Tooltip.css';

const Tooltip = ({
  children,
  content,
  position = 'top',
  trigger = 'hover', // 'hover', 'click', 'focus'
  delay = 0,
  disabled = false,
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [actualPosition, setActualPosition] = useState(position);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);

  const showTooltip = () => {
    if (disabled || !content) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    } else {
      setIsVisible(true);
    }
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const handleClick = () => {
    if (trigger === 'click') {
      if (isVisible) {
        hideTooltip();
      } else {
        showTooltip();
      }
    }
  };

  // Calculate position to avoid viewport overflow
  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      };

      let newPosition = position;

      // Check if tooltip goes outside viewport and adjust
      switch (position) {
        case 'top':
          if (triggerRect.top - tooltipRect.height < 0) {
            newPosition = 'bottom';
          }
          break;
        case 'bottom':
          if (triggerRect.bottom + tooltipRect.height > viewport.height) {
            newPosition = 'top';
          }
          break;
        case 'left':
          if (triggerRect.left - tooltipRect.width < 0) {
            newPosition = 'right';
          }
          break;
        case 'right':
          if (triggerRect.right + tooltipRect.width > viewport.width) {
            newPosition = 'left';
          }
          break;
      }

      setActualPosition(newPosition);
    }
  }, [isVisible, position]);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        trigger === 'click' &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target)
      ) {
        hideTooltip();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isVisible, trigger]);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!content) {
    return children;
  }

  return (
    <div className={`acme-tooltip-wrapper ${className}`} {...props}>
      <div
        ref={triggerRef}
        className="tooltip-trigger"
        onMouseEnter={trigger === 'hover' ? showTooltip : undefined}
        onMouseLeave={trigger === 'hover' ? hideTooltip : undefined}
        onFocus={trigger === 'focus' ? showTooltip : undefined}
        onBlur={trigger === 'focus' ? hideTooltip : undefined}
        onClick={handleClick}
        aria-describedby={isVisible ? 'tooltip-content' : undefined}
      >
        {children}
      </div>
      
      {isVisible && (
        <div
          ref={tooltipRef}
          id="tooltip-content"
          className={`acme-tooltip ${actualPosition}`}
          role="tooltip"
        >
          <div className="tooltip-content">
            {content}
          </div>
          <div className="tooltip-arrow"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;