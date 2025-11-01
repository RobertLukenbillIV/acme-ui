import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({
  value = 0, // 0-100
  max = 100,
  size = 'medium', // 'small', 'medium', 'large'
  variant = 'default', // 'default', 'striped', 'animated', 'gradient'
  color = 'primary', // 'primary', 'success', 'warning', 'danger', 'info'
  showLabel = true,
  showPercentage = true,
  label = null,
  format = null, // function to format the display value
  thickness = null, // custom thickness
  animated = false,
  striped = false,
  className = '',
  ...props
}) => {
  // Filter out component-specific props from DOM props
  const {
    value: _,
    max: __,
    size: ___,
    variant: ____,
    color: _____,
    showLabel: ______,
    showPercentage: _______,
    label: ________,
    format: _________,
    thickness: __________,
    animated: ___________,
    striped: ____________,
    ...domProps
  } = { value, max, size, variant, color, showLabel, showPercentage, label, format, thickness, animated, striped, ...props };
  // Normalize value to percentage
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const formatValue = (val) => {
    if (format && typeof format === 'function') {
      return format(val, max);
    }
    return showPercentage ? `${Math.round(percentage)}%` : `${val}/${max}`;
  };

  const componentClasses = [
    'acme-progress-bar',
    size,
    color,
    variant,
    striped && 'striped',
    animated && 'animated',
    className
  ].filter(Boolean).join(' ');

  const progressStyle = {
    ...(thickness && { height: thickness })
  };

  const fillStyle = {
    width: `${percentage}%`
  };

  return (
    <div className={componentClasses} {...domProps}>
      {(showLabel || label) && (
        <div className="progress-header">
          <div className="progress-label">
            {label || formatValue(value)}
          </div>
          {showPercentage && !label && (
            <div className="progress-percentage">
              {Math.round(percentage)}%
            </div>
          )}
        </div>
      )}
      
      <div className="progress-track" style={progressStyle}>
        <div 
          className="progress-fill"
          style={fillStyle}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label || `Progress: ${formatValue(value)}`}
        />
      </div>
    </div>
  );
};

// Circular Progress Component
export const CircularProgress = ({
  value = 0,
  max = 100,
  size = 80, // diameter in pixels
  thickness = 8, // stroke width
  color = 'primary',
  showLabel = true,
  showPercentage = true,
  label = null,
  format = null,
  animated = true,
  lineCap = 'round', // 'round', 'butt', 'square'
  backgroundStroke = true,
  className = '',
  ...props
}) => {
  // Filter out component-specific props
  const {
    value: _,
    max: __,
    size: ___,
    thickness: ____,
    color: _____,
    showLabel: ______,
    showPercentage: _______,
    label: ________,
    format: _________,
    animated: __________,
    lineCap: ___________,
    backgroundStroke: ____________,
    ...domProps
  } = { value, max, size, thickness, color, showLabel, showPercentage, label, format, animated, lineCap, backgroundStroke, ...props };
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (size - thickness) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const formatValue = (val) => {
    if (format && typeof format === 'function') {
      return format(val, max);
    }
    return showPercentage ? `${Math.round(percentage)}%` : val;
  };

  const componentClasses = [
    'acme-circular-progress',
    color,
    animated && 'animated',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={componentClasses}
      style={{ width: size, height: size }}
      {...domProps}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="circular-progress-svg"
      >
        {backgroundStroke && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={thickness}
            className="progress-background"
            opacity="0.1"
          />
        )}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={thickness}
          strokeLinecap={lineCap}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="progress-circle"
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%'
          }}
        />
      </svg>
      
      {(showLabel || label) && (
        <div className="circular-progress-label">
          <div className="circular-progress-value">
            {label || formatValue(value)}
          </div>
        </div>
      )}
    </div>
  );
};

// Gauge Component
export const Gauge = ({
  value = 0,
  min = 0,
  max = 100,
  size = 120,
  thickness = 12,
  color = 'primary',
  showLabel = true,
  showScale = true,
  label = null,
  format = null,
  zones = null, // [{ min, max, color }]
  animated = true,
  startAngle = 225, // degrees
  endAngle = 315, // degrees
  className = '',
  ...props
}) => {
  // Filter out component-specific props
  const {
    value: _,
    min: __,
    max: ___,
    size: ____,
    thickness: _____,
    color: ______,
    showLabel: _______,
    showScale: ________,
    label: _________,
    format: __________,
    zones: ___________,
    animated: ____________,
    startAngle: _____________,
    endAngle: ______________,
    ...domProps
  } = { value, min, max, size, thickness, color, showLabel, showScale, label, format, zones, animated, startAngle, endAngle, ...props };
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const radius = (size - thickness) / 2;
  const centerX = size / 2;
  const centerY = size / 2;
  
  // Convert angles to radians and calculate arc
  const startAngleRad = (startAngle * Math.PI) / 180;
  const endAngleRad = (endAngle * Math.PI) / 180;
  const totalAngle = endAngle - startAngle;
  const valueAngle = startAngle + (totalAngle * percentage) / 100;
  const valueAngleRad = (valueAngle * Math.PI) / 180;

  const formatValue = (val) => {
    if (format && typeof format === 'function') {
      return format(val, min, max);
    }
    return typeof val === 'number' ? val.toLocaleString() : val;
  };

  // Calculate arc path
  const startX = centerX + radius * Math.cos(startAngleRad);
  const startY = centerY + radius * Math.sin(startAngleRad);
  const endX = centerX + radius * Math.cos(endAngleRad);
  const endY = centerY + radius * Math.sin(endAngleRad);
  
  const largeArcFlag = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
  
  const backgroundPath = [
    `M ${startX} ${startY}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`
  ].join(' ');

  const valueX = centerX + radius * Math.cos(valueAngleRad);
  const valueY = centerY + radius * Math.sin(valueAngleRad);
  const valueLargeArcFlag = Math.abs(valueAngle - startAngle) > 180 ? 1 : 0;
  
  const valuePath = [
    `M ${startX} ${startY}`,
    `A ${radius} ${radius} 0 ${valueLargeArcFlag} 1 ${valueX} ${valueY}`
  ].join(' ');

  const componentClasses = [
    'acme-gauge',
    color,
    animated && 'animated',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={componentClasses}
      style={{ width: size, height: size }}
      {...domProps}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="gauge-svg"
      >
        {/* Background arc */}
        <path
          d={backgroundPath}
          fill="none"
          stroke="currentColor"
          strokeWidth={thickness}
          strokeLinecap="round"
          className="gauge-background"
          opacity="0.1"
        />
        
        {/* Value arc */}
        <path
          d={valuePath}
          fill="none"
          stroke="currentColor"
          strokeWidth={thickness}
          strokeLinecap="round"
          className="gauge-fill"
        />
        
        {/* Scale marks */}
        {showScale && (
          <g className="gauge-scale">
            {[...Array(5)].map((_, i) => {
              const scaleAngle = startAngle + (totalAngle * i) / 4;
              const scaleAngleRad = (scaleAngle * Math.PI) / 180;
              const innerRadius = radius - thickness / 2 - 5;
              const outerRadius = radius - thickness / 2;
              
              const x1 = centerX + innerRadius * Math.cos(scaleAngleRad);
              const y1 = centerY + innerRadius * Math.sin(scaleAngleRad);
              const x2 = centerX + outerRadius * Math.cos(scaleAngleRad);
              const y2 = centerY + outerRadius * Math.sin(scaleAngleRad);
              
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="currentColor"
                  strokeWidth="2"
                  opacity="0.6"
                />
              );
            })}
          </g>
        )}
      </svg>
      
      {(showLabel || label) && (
        <div className="gauge-label">
          <div className="gauge-value">
            {label || formatValue(value)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;