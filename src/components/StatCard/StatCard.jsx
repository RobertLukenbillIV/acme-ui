import React from 'react';
import './StatCard.css';

const StatCard = ({
  title,
  value,
  subtitle = null,
  trend = null, // { value: number, direction: 'up' | 'down' | 'neutral', label: string }
  icon = null,
  color = 'primary', // 'primary', 'success', 'warning', 'danger', 'info', 'neutral'
  size = 'medium', // 'small', 'medium', 'large'
  variant = 'default', // 'default', 'outlined', 'filled', 'minimal'
  loading = false,
  prefix = '',
  suffix = '',
  format = null, // function to format the value
  onClick = null,
  className = '',
  ...props
}) => {
  const formatValue = (val) => {
    if (format && typeof format === 'function') {
      return format(val);
    }
    
    if (typeof val === 'number') {
      // Format large numbers
      if (val >= 1000000) {
        return (val / 1000000).toFixed(1) + 'M';
      }
      if (val >= 1000) {
        return (val / 1000).toFixed(1) + 'K';
      }
      return val.toLocaleString();
    }
    
    return val;
  };

  const getTrendIcon = (direction) => {
    switch (direction) {
      case 'up':
        return '↗️';
      case 'down':
        return '↘️';
      case 'neutral':
      default:
        return '→';
    }
  };

  const getTrendClass = (direction) => {
    switch (direction) {
      case 'up':
        return 'trend-up';
      case 'down':
        return 'trend-down';
      case 'neutral':
      default:
        return 'trend-neutral';
    }
  };

  const componentClasses = [
    'acme-stat-card',
    size,
    color,
    variant,
    loading && 'loading',
    onClick && 'clickable',
    className
  ].filter(Boolean).join(' ');

  const renderContent = () => {
    if (loading) {
      return (
        <div className="stat-card-loading">
          <div className="loading-title"></div>
          <div className="loading-value"></div>
          {subtitle && <div className="loading-subtitle"></div>}
        </div>
      );
    }

    return (
      <>
        <div className="stat-card-header">
          {icon && (
            <div className="stat-card-icon">
              {typeof icon === 'string' ? <span>{icon}</span> : icon}
            </div>
          )}
          <div className="stat-card-title-container">
            {title && <div className="stat-card-title">{title}</div>}
            {trend && (
              <div className={`stat-card-trend ${getTrendClass(trend.direction)}`}>
                <span className="trend-icon">{getTrendIcon(trend.direction)}</span>
                <span className="trend-value">{trend.value}%</span>
                {trend.label && <span className="trend-label">{trend.label}</span>}
              </div>
            )}
          </div>
        </div>

        <div className="stat-card-value-container">
          <div className="stat-card-value">
            {prefix && <span className="value-prefix">{prefix}</span>}
            <span className="value-main">{formatValue(value)}</span>
            {suffix && <span className="value-suffix">{suffix}</span>}
          </div>
        </div>

        {subtitle && (
          <div className="stat-card-subtitle">{subtitle}</div>
        )}
      </>
    );
  };

  const Element = onClick ? 'button' : 'div';

  return (
    <Element 
      className={componentClasses}
      onClick={onClick}
      type={onClick ? 'button' : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      {renderContent()}
    </Element>
  );
};

// Convenience component for displaying multiple stats in a grid
export const StatGroup = ({ 
  stats = [], 
  columns = 'auto', // 'auto', 1, 2, 3, 4, or custom CSS value
  gap = '1rem',
  className = '',
  ...props 
}) => {
  const gridColumns = columns === 'auto' ? 
    `repeat(auto-fit, minmax(250px, 1fr))` : 
    typeof columns === 'number' ? 
    `repeat(${columns}, 1fr)` : 
    columns;

  return (
    <div 
      className={`acme-stat-group ${className}`}
      style={{ 
        display: 'grid', 
        gridTemplateColumns: gridColumns, 
        gap 
      }}
      {...props}
    >
      {stats.map((stat, index) => (
        <StatCard key={stat.key || index} {...stat} />
      ))}
    </div>
  );
};

export default StatCard;