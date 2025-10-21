import React from 'react';
import './Breadcrumb.css';

const BreadcrumbItem = ({ 
  label, 
  href, 
  onClick, 
  icon, 
  isLast, 
  separator = '/', 
  disabled = false 
}) => {
  const content = (
    <>
      {icon && <span className="breadcrumb-icon">{icon}</span>}
      <span className="breadcrumb-label">{label}</span>
    </>
  );

  const itemClass = `breadcrumb-item ${isLast ? 'current' : ''} ${disabled ? 'disabled' : ''}`;

  return (
    <li className={itemClass}>
      {isLast || disabled ? (
        <span className="breadcrumb-text" aria-current={isLast ? 'page' : undefined}>
          {content}
        </span>
      ) : href ? (
        <a 
          href={href} 
          className="breadcrumb-link"
          onClick={onClick}
        >
          {content}
        </a>
      ) : (
        <button 
          className="breadcrumb-button"
          onClick={onClick}
          type="button"
        >
          {content}
        </button>
      )}
      {!isLast && <span className="breadcrumb-separator" aria-hidden="true">{separator}</span>}
    </li>
  );
};

const Breadcrumb = ({ 
  items = [], 
  separator = '/',
  variant = 'default', // 'default', 'slashes', 'arrows', 'dots'
  size = 'medium', // 'small', 'medium', 'large'
  maxItems = null,
  showHome = true,
  homeIcon = '🏠',
  homeLabel = 'Home',
  homeHref = '/',
  onHomeClick,
  className = '',
  ...props 
}) => {
  const getSeparator = () => {
    switch (variant) {
      case 'arrows': return '→';
      case 'slashes': return '/';
      case 'dots': return '•';
      default: return separator;
    }
  };

  const processedItems = [...items];

  // Add home item if requested
  if (showHome && items.length > 0) {
    processedItems.unshift({
      label: homeLabel,
      href: homeHref,
      onClick: onHomeClick,
      icon: homeIcon
    });
  }

  // Handle maxItems truncation
  let displayItems = processedItems;
  if (maxItems && processedItems.length > maxItems) {
    const keepStart = Math.floor((maxItems - 1) / 2);
    const keepEnd = maxItems - keepStart - 1;
    displayItems = [
      ...processedItems.slice(0, keepStart),
      { label: '...', disabled: true, isEllipsis: true },
      ...processedItems.slice(-keepEnd)
    ];
  }

  if (displayItems.length === 0) {
    return null;
  }

  return (
    <nav 
      className={`acme-breadcrumb ${variant} ${size} ${className}`} 
      aria-label="Breadcrumb navigation"
      {...props}
    >
      <ol className="breadcrumb-list">
        {displayItems.map((item, index) => (
          <BreadcrumbItem
            key={item.isEllipsis ? `ellipsis-${index}` : index}
            label={item.label}
            href={item.href}
            onClick={item.onClick}
            icon={item.icon}
            isLast={index === displayItems.length - 1}
            separator={getSeparator()}
            disabled={item.disabled}
          />
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;