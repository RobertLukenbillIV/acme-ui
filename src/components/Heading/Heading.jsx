import React from 'react';
import './Heading.css';

/**
 * Heading component - Semantic headings with consistent typography
 * 
 * Features:
 * - Semantic HTML heading levels (h1-h6)
 * - Consistent typography scale from design tokens
 * - Visual vs semantic level separation
 * - Multiple color variants
 * - Custom styling support
 */
const Heading = ({
  level = 1,
  visualLevel,
  children,
  color = 'primary',
  className = '',
  ...props
}) => {
  // Validate heading level
  const headingLevel = Math.max(1, Math.min(6, level));
  const displayLevel = visualLevel || headingLevel;
  
  // Create the appropriate heading tag
  const HeadingTag = `h${headingLevel}`;
  
  // Build CSS classes
  const headingClasses = [
    'acme-heading',
    `acme-heading-${displayLevel}`,
    `acme-heading-color-${color}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <HeadingTag 
      className={headingClasses}
      {...props}
    >
      {children}
    </HeadingTag>
  );
};

export default Heading;