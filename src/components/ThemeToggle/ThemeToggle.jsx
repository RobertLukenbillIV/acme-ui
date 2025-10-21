import React, { useState, useEffect } from 'react';
import './ThemeToggle.css';

/**
 * ThemeToggle component - Light/dark theme switcher with multiple display variants
 * 
 * Features:
 * - Light/dark/system theme modes
 * - Multiple display variants (button, switch, dropdown)
 * - Automatic system theme detection
 * - Smooth animations and transitions
 * - Keyboard navigation and accessibility
 * - Persistent theme storage
 * - Custom theme change callbacks
 */
const ThemeToggle = ({
  variant = 'button', // 'button' | 'switch' | 'dropdown' | 'icon-only'
  size = 'medium', // 'small' | 'medium' | 'large'
  showLabel = true,
  showSystemOption = true,
  defaultTheme = 'system', // 'light' | 'dark' | 'system'
  onChange,
  storageKey = 'acme-theme',
  className = '',
  ...props
}) => {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);
  const [systemTheme, setSystemTheme] = useState('light');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Theme options
  const themeOptions = [
    { value: 'light', label: 'Light', icon: '☀️', description: 'Light theme' },
    { value: 'dark', label: 'Dark', icon: '🌙', description: 'Dark theme' },
    ...(showSystemOption ? [{ value: 'system', label: 'System', icon: '💻', description: 'Follow system theme' }] : [])
  ];

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateSystemTheme = () => {
      setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    };

    // Initial detection
    updateSystemTheme();

    // Listen for changes
    mediaQuery.addEventListener('change', updateSystemTheme);
    
    return () => mediaQuery.removeEventListener('change', updateSystemTheme);
  }, []);

  // Load saved theme from storage
  useEffect(() => {
    if (typeof window !== 'undefined' && storageKey) {
      const savedTheme = localStorage.getItem(storageKey);
      if (savedTheme && themeOptions.some(option => option.value === savedTheme)) {
        setCurrentTheme(savedTheme);
      }
    }
  }, [storageKey, themeOptions]);

  // Apply theme to document
  useEffect(() => {
    const effectiveTheme = currentTheme === 'system' ? systemTheme : currentTheme;
    
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', effectiveTheme);
    }

    // Save to storage
    if (typeof window !== 'undefined' && storageKey) {
      localStorage.setItem(storageKey, currentTheme);
    }

    // Call onChange callback
    if (onChange) {
      onChange(currentTheme, effectiveTheme);
    }
  }, [currentTheme, systemTheme, onChange, storageKey]);

  // Get the effective theme (resolves 'system' to actual theme)
  const getEffectiveTheme = () => {
    return currentTheme === 'system' ? systemTheme : currentTheme;
  };

  // Get current theme option
  const getCurrentOption = () => {
    return themeOptions.find(option => option.value === currentTheme) || themeOptions[0];
  };

  // Handle theme change
  const handleThemeChange = (newTheme) => {
    setCurrentTheme(newTheme);
    setIsDropdownOpen(false);
  };

  // Handle button click (for button variant)
  const handleButtonClick = () => {
    if (!showSystemOption) {
      // Simple toggle between light and dark
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      handleThemeChange(newTheme);
    } else {
      // Cycle through all options
      const currentIndex = themeOptions.findIndex(option => option.value === currentTheme);
      const nextIndex = (currentIndex + 1) % themeOptions.length;
      handleThemeChange(themeOptions[nextIndex].value);
    }
  };

  // Handle switch toggle
  const handleSwitchToggle = () => {
    const effectiveTheme = getEffectiveTheme();
    const newTheme = effectiveTheme === 'light' ? 'dark' : 'light';
    handleThemeChange(newTheme);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    if (variant === 'dropdown') {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setIsDropdownOpen(!isDropdownOpen);
      }
    } else {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (variant === 'switch') {
          handleSwitchToggle();
        } else {
          handleButtonClick();
        }
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (variant === 'dropdown' && isDropdownOpen) {
        const dropdown = event.target.closest('.acme-theme-toggle-dropdown');
        if (!dropdown) {
          setIsDropdownOpen(false);
        }
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen, variant]);

  // Generate class names
  const componentClasses = [
    'acme-theme-toggle',
    `acme-theme-toggle-${variant}`,
    `acme-theme-toggle-${size}`,
    className
  ].filter(Boolean).join(' ');

  // Render button variant
  if (variant === 'button' || variant === 'icon-only') {
    const currentOption = getCurrentOption();
    const effectiveTheme = getEffectiveTheme();
    
    return (
      <button
        className={componentClasses}
        onClick={handleButtonClick}
        onKeyDown={handleKeyDown}
        title={`Current theme: ${currentOption.label}${currentTheme === 'system' ? ` (${effectiveTheme})` : ''}`}
        aria-label={`Switch theme. Current: ${currentOption.label}`}
        {...props}
      >
        <span className="acme-theme-toggle-icon" role="img" aria-hidden="true">
          {currentOption.icon}
        </span>
        {variant === 'button' && showLabel && (
          <span className="acme-theme-toggle-label">
            {currentOption.label}
            {currentTheme === 'system' && (
              <span className="acme-theme-toggle-system-indicator">
                ({effectiveTheme})
              </span>
            )}
          </span>
        )}
      </button>
    );
  }

  // Render switch variant
  if (variant === 'switch') {
    const effectiveTheme = getEffectiveTheme();
    const isChecked = effectiveTheme === 'dark';
    
    return (
      <label className={componentClasses}>
        {showLabel && (
          <span className="acme-theme-toggle-switch-label">
            Dark Mode
          </span>
        )}
        <div className="acme-theme-toggle-switch-container">
          <input
            type="checkbox"
            className="acme-theme-toggle-switch-input"
            checked={isChecked}
            onChange={handleSwitchToggle}
            onKeyDown={handleKeyDown}
            aria-label="Toggle dark mode"
            {...props}
          />
          <div className="acme-theme-toggle-switch-track">
            <div className="acme-theme-toggle-switch-thumb">
              <span className="acme-theme-toggle-switch-icon" role="img" aria-hidden="true">
                {isChecked ? '🌙' : '☀️'}
              </span>
            </div>
          </div>
        </div>
      </label>
    );
  }

  // Render dropdown variant
  if (variant === 'dropdown') {
    const currentOption = getCurrentOption();
    const effectiveTheme = getEffectiveTheme();
    
    return (
      <div className={`${componentClasses} ${isDropdownOpen ? 'open' : ''}`}>
        <button
          className="acme-theme-toggle-dropdown-trigger"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          onKeyDown={handleKeyDown}
          aria-expanded={isDropdownOpen}
          aria-haspopup="listbox"
          aria-label="Theme selector"
        >
          <span className="acme-theme-toggle-dropdown-icon" role="img" aria-hidden="true">
            {currentOption.icon}
          </span>
          {showLabel && (
            <span className="acme-theme-toggle-dropdown-label">
              {currentOption.label}
              {currentTheme === 'system' && (
                <span className="acme-theme-toggle-system-indicator">
                  ({effectiveTheme})
                </span>
              )}
            </span>
          )}
          <svg
            className="acme-theme-toggle-dropdown-arrow"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="currentColor"
          >
            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="acme-theme-toggle-dropdown-menu" role="listbox">
          {themeOptions.map((option) => (
            <button
              key={option.value}
              className={`acme-theme-toggle-dropdown-option ${currentTheme === option.value ? 'selected' : ''}`}
              onClick={() => handleThemeChange(option.value)}
              role="option"
              aria-selected={currentTheme === option.value}
            >
              <span className="acme-theme-toggle-dropdown-option-icon" role="img" aria-hidden="true">
                {option.icon}
              </span>
              <div className="acme-theme-toggle-dropdown-option-content">
                <span className="acme-theme-toggle-dropdown-option-label">
                  {option.label}
                </span>
                <span className="acme-theme-toggle-dropdown-option-description">
                  {option.description}
                </span>
              </div>
              {currentTheme === option.value && (
                <span className="acme-theme-toggle-dropdown-option-check" role="img" aria-hidden="true">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default ThemeToggle;