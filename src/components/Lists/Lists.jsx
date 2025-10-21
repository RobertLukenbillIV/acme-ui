import React from 'react';
import './Lists.css';

/**
 * Lists component - Consistent list styling with variants
 * 
 * Features:
 * - Unordered and ordered lists
 * - Custom markers and icons
 * - Nested list support
 * - Compact and spacious variants
 * - Semantic HTML structure
 */

// Unordered List Component
export const UnorderedList = ({
  children,
  variant = 'default',
  spacing = 'normal',
  marker = 'bullet',
  className = '',
  ...props
}) => {
  const listClasses = [
    'acme-list',
    'acme-list-unordered',
    `acme-list-variant-${variant}`,
    `acme-list-spacing-${spacing}`,
    `acme-list-marker-${marker}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <ul className={listClasses} {...props}>
      {children}
    </ul>
  );
};

// Ordered List Component
export const OrderedList = ({
  children,
  variant = 'default',
  spacing = 'normal',
  type = 'decimal',
  start,
  className = '',
  ...props
}) => {
  const listClasses = [
    'acme-list',
    'acme-list-ordered',
    `acme-list-variant-${variant}`,
    `acme-list-spacing-${spacing}`,
    `acme-list-type-${type}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <ol className={listClasses} start={start} {...props}>
      {children}
    </ol>
  );
};

// List Item Component
export const ListItem = ({
  children,
  icon,
  className = '',
  ...props
}) => {
  const itemClasses = [
    'acme-list-item',
    icon && 'acme-list-item-with-icon',
    className
  ].filter(Boolean).join(' ');

  return (
    <li className={itemClasses} {...props}>
      {icon && <span className="acme-list-icon">{icon}</span>}
      <span className="acme-list-content">{children}</span>
    </li>
  );
};

// Description List Component
export const DescriptionList = ({
  children,
  variant = 'default',
  layout = 'vertical',
  className = '',
  ...props
}) => {
  const listClasses = [
    'acme-description-list',
    `acme-description-list-variant-${variant}`,
    `acme-description-list-layout-${layout}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <dl className={listClasses} {...props}>
      {children}
    </dl>
  );
};

// Description Term Component
export const DescriptionTerm = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <dt className={`acme-description-term ${className}`} {...props}>
      {children}
    </dt>
  );
};

// Description Detail Component
export const DescriptionDetail = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <dd className={`acme-description-detail ${className}`} {...props}>
      {children}
    </dd>
  );
};

// Main Lists component (convenience wrapper)
const Lists = {
  Unordered: UnorderedList,
  Ordered: OrderedList,
  Item: ListItem,
  Description: DescriptionList,
  Term: DescriptionTerm,
  Detail: DescriptionDetail
};

export default Lists;