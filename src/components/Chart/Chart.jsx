import React, { useMemo } from 'react';
import './Chart.css';

const Chart = ({
  type = 'bar', // 'bar', 'line', 'pie', 'doughnut'
  data = [],
  width = '100%',
  height = 300,
  size = null, // For pie/doughnut charts
  title = null,
  colors = [
    '#3498db', '#e74c3c', '#f39c12', '#27ae60', '#9b59b6',
    '#1abc9c', '#e67e22', '#34495e', '#f1c40f', '#e91e63'
  ],
  showLabels = true,
  showValues = true,
  showLegend = true,
  animate = true,
  className = '',
  ...props
}) => {
  // Filter out non-DOM props to prevent React warnings
  const { 
    showValue, // Remove showValue if it exists
    color, // Remove custom color prop
    ...domProps 
  } = props;
  // Process data for chart rendering
  const processedData = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return [];
    
    const maxValue = Math.max(...data.map(item => item.value || 0));
    
    return data.map((item, index) => ({
      ...item,
      color: item.color || colors[index % colors.length],
      percentage: maxValue > 0 ? (item.value / maxValue) * 100 : 0,
      normalizedValue: maxValue > 0 ? item.value / maxValue : 0
    }));
  }, [data, colors]);

  // Calculate pie chart angles for pie/doughnut charts
  const pieData = useMemo(() => {
    if (type !== 'pie' && type !== 'doughnut') return [];
    
    const total = processedData.reduce((sum, item) => sum + (item.value || 0), 0);
    let currentAngle = 0;
    
    return processedData.map(item => {
      const angle = total > 0 ? (item.value / total) * 360 : 0;
      const startAngle = currentAngle;
      currentAngle += angle;
      
      return {
        ...item,
        angle,
        startAngle,
        endAngle: currentAngle,
        percentage: total > 0 ? ((item.value / total) * 100) : 0
      };
    });
  }, [processedData, type]);

  const renderBarChart = () => (
    <div className="acme-chart-bars">
      {processedData.map((item, index) => (
        <div key={index} className="bar-container">
          <div 
            className={`bar ${animate ? 'animated' : ''}`}
            style={{
              height: `${item.percentage}%`,
              backgroundColor: item.color,
              animationDelay: animate ? `${index * 0.1}s` : '0s'
            }}
            title={`${item.label}: ${item.value}`}
          />
          {showLabels && (
            <div className="bar-label">{item.label}</div>
          )}
          {showValues && (
            <div className="bar-value">{item.value}</div>
          )}
        </div>
      ))}
    </div>
  );

  const renderLineChart = () => {
    if (processedData.length < 2) return <div className="chart-error">Line chart requires at least 2 data points</div>;
    
    const points = processedData.map((item, index) => {
      const x = (index / (processedData.length - 1)) * 100;
      const y = 100 - item.percentage;
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="acme-chart-line">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke={colors[0]}
            strokeWidth="2"
            points={points}
            className={animate ? 'animated-line' : ''}
          />
          {processedData.map((item, index) => {
            const x = (index / (processedData.length - 1)) * 100;
            const y = 100 - item.percentage;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="3"
                fill={item.color}
                className={animate ? 'animated-dot' : ''}
                style={{ animationDelay: animate ? `${index * 0.1}s` : '0s' }}
              >
                <title>{`${item.label}: ${item.value}`}</title>
              </circle>
            );
          })}
        </svg>
        {showLabels && (
          <div className="line-labels">
            {processedData.map((item, index) => (
              <div 
                key={index} 
                className="line-label" 
                style={{ 
                  left: processedData.length === 1 ? '50%' : `${Math.min(95, (index / (processedData.length - 1)) * 95)}%`
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderPieChart = () => {
    const centerX = 50;
    const centerY = 50;
    const radius = type === 'doughnut' ? 35 : 40;
    const innerRadius = type === 'doughnut' ? 20 : 0;

    return (
      <div className="acme-chart-pie">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          {pieData.map((item, index) => {
            if (item.angle === 0) return null;
            
            const startAngleRad = (item.startAngle - 90) * (Math.PI / 180);
            const endAngleRad = (item.endAngle - 90) * (Math.PI / 180);
            
            const x1 = centerX + radius * Math.cos(startAngleRad);
            const y1 = centerY + radius * Math.sin(startAngleRad);
            const x2 = centerX + radius * Math.cos(endAngleRad);
            const y2 = centerY + radius * Math.sin(endAngleRad);
            
            const largeArcFlag = item.angle > 180 ? 1 : 0;
            
            let pathData;
            if (type === 'doughnut') {
              const x3 = centerX + innerRadius * Math.cos(startAngleRad);
              const y3 = centerY + innerRadius * Math.sin(startAngleRad);
              const x4 = centerX + innerRadius * Math.cos(endAngleRad);
              const y4 = centerY + innerRadius * Math.sin(endAngleRad);
              
              pathData = [
                `M ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                `L ${x4} ${y4}`,
                `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x3} ${y3}`,
                'Z'
              ].join(' ');
            } else {
              pathData = [
                `M ${centerX} ${centerY}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ');
            }

            return (
              <path
                key={index}
                d={pathData}
                fill={item.color}
                className={animate ? 'animated-slice' : ''}
                style={{ 
                  animationDelay: animate ? `${index * 0.2}s` : '0s',
                  transformOrigin: `${centerX}% ${centerY}%`
                }}
              >
                <title>{`${item.label}: ${item.value} (${item.percentage.toFixed(1)}%)`}</title>
              </path>
            );
          })}
        </svg>
      </div>
    );
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return renderLineChart();
      case 'pie':
      case 'doughnut':
        return renderPieChart();
      case 'bar':
      default:
        return renderBarChart();
    }
  };

  const renderLegend = () => {
    if (!showLegend) return null;
    
    const legendData = type === 'pie' || type === 'doughnut' ? pieData : processedData;
    
    return (
      <div className="acme-chart-legend">
        {legendData.map((item, index) => (
          <div key={index} className="legend-item">
            <div 
              className="legend-color"
              style={{ backgroundColor: item.color }}
            />
            <span className="legend-label">{item.label}</span>
            {showValues && (
              <span className="legend-value">
                {item.value}
                {(type === 'pie' || type === 'doughnut') && (
                  <span className="legend-percentage"> ({item.percentage.toFixed(1)}%)</span>
                )}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Calculate chart dimensions
  const chartStyle = {
    width,
    maxWidth: '100%',
    boxSizing: 'border-box'
  };
  
  // For pie/doughnut charts, use size if provided, otherwise use height
  if (type === 'pie' || type === 'doughnut') {
    const chartSize = size || Math.min(parseInt(height), 400);
    chartStyle.height = `${chartSize}px`;
    chartStyle.width = '100%';
  } else {
    chartStyle.height = height;
  }

  if (!data || data.length === 0) {
    return (
      <div 
        className={`acme-chart empty ${className}`} 
        style={chartStyle} 
        {...domProps}
      >
        <div className="chart-empty-state">
          <div className="empty-icon">📊</div>
          <p>No data to display</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`acme-chart ${type} ${className}`} 
      style={chartStyle} 
      {...domProps}
    >
      {title && <h3 className="chart-title">{title}</h3>}
      <div className="chart-container">
        <div className="chart-content">
          {renderChart()}
        </div>
        {renderLegend()}
      </div>
    </div>
  );
};

export default Chart;