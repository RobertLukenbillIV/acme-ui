import React from 'react';
import './Code.css';

/**
 * Code component - Display formatted code with syntax highlighting
 * 
 * Features:
 * - Inline and block code variants
 * - Multiple themes (default, dark, minimal)
 * - Language support for syntax highlighting
 * - Copy to clipboard functionality
 * - Line numbers and highlighting
 * - Responsive design
 */

// Inline Code Component
export const InlineCode = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const codeClasses = [
    'acme-code-inline',
    `acme-code-variant-${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <code className={codeClasses} {...props}>
      {children}
    </code>
  );
};

// Code Block Component
export const CodeBlock = ({
  children,
  language,
  theme = 'default',
  showLineNumbers = false,
  highlightLines = [],
  copyable = true,
  title,
  className = '',
  ...props
}) => {
  const [copied, setCopied] = React.useState(false);

  const blockClasses = [
    'acme-code-block',
    `acme-code-theme-${theme}`,
    language && `acme-code-language-${language}`,
    showLineNumbers && 'acme-code-with-line-numbers',
    className
  ].filter(Boolean).join(' ');

  const handleCopy = async () => {
    if (!copyable) return;
    
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatCode = (code) => {
    if (!showLineNumbers && highlightLines.length === 0) {
      return code;
    }

    const lines = code.split('\n');
    return lines.map((line, index) => {
      const lineNumber = index + 1;
      const isHighlighted = highlightLines.includes(lineNumber);
      
      return (
        <div 
          key={lineNumber}
          className={`acme-code-line ${isHighlighted ? 'highlighted' : ''}`}
        >
          {showLineNumbers && (
            <span className="acme-code-line-number">{lineNumber}</span>
          )}
          <span className="acme-code-line-content">{line}</span>
        </div>
      );
    });
  };

  return (
    <div className="acme-code-container">
      {title && (
        <div className="acme-code-header">
          <span className="acme-code-title">{title}</span>
          {language && (
            <span className="acme-code-language-label">{language}</span>
          )}
        </div>
      )}
      <div className={blockClasses}>
        <pre className="acme-code-pre" {...props}>
          <code className="acme-code-content">
            {showLineNumbers || highlightLines.length > 0 ? 
              formatCode(children) : 
              children
            }
          </code>
        </pre>
        {copyable && (
          <button 
            className="acme-code-copy-button"
            onClick={handleCopy}
            aria-label={copied ? 'Copied!' : 'Copy code'}
            title={copied ? 'Copied!' : 'Copy code'}
          >
            {copied ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

// Keyboard Shortcut Component
export const KeyboardShortcut = ({
  keys,
  separator = '+',
  className = '',
  ...props
}) => {
  const keyArray = Array.isArray(keys) ? keys : [keys];
  
  return (
    <span className={`acme-keyboard-shortcut ${className}`} {...props}>
      {keyArray.map((key, index) => (
        <React.Fragment key={key}>
          <kbd className="acme-key">{key}</kbd>
          {index < keyArray.length - 1 && (
            <span className="acme-key-separator">{separator}</span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
};

// Main Code component (convenience wrapper)
const Code = {
  Inline: InlineCode,
  Block: CodeBlock,
  Keyboard: KeyboardShortcut
};

export default Code;