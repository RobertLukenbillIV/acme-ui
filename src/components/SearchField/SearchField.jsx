import React, { useState, useRef, useEffect } from 'react';
import './SearchField.css';

const SearchField = ({ 
  label,
  value = '',
  onChange,
  onSearch,
  onClear,
  placeholder = 'Search...',
  suggestions = [],
  showSuggestions = false,
  debounceMs = 300,
  clearable = true,
  disabled = false,
  required = false,
  error = null,
  size = 'medium',
  variant = 'default'
}) => {
  const [focused, setFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Handle input change with debouncing
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange?.(e);

    // Clear existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set new timer for search
    if (onSearch && debounceMs > 0) {
      const timer = setTimeout(() => {
        onSearch(newValue);
      }, debounceMs);
      setDebounceTimer(timer);
    } else if (onSearch) {
      onSearch(newValue);
    }

    // Show suggestions if available
    if (suggestions.length > 0 && newValue.length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  // Handle clear button
  const handleClear = () => {
    const event = { target: { value: '' } };
    onChange?.(event);
    onClear?.();
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    const event = { target: { value: suggestion } };
    onChange?.(event);
    onSearch?.(suggestion);
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  // Handle focus and blur
  const handleFocus = () => {
    setFocused(true);
    if (suggestions.length > 0 && value.length > 0) {
      setShowDropdown(true);
    }
  };

  const handleBlur = () => {
    setFocused(false);
    // Delay hiding dropdown to allow for suggestion clicks
    setTimeout(() => setShowDropdown(false), 150);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowDropdown(false);
      inputRef.current?.blur();
    } else if (e.key === 'Enter' && !showDropdown) {
      onSearch?.(value);
    }
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  return (
    <div className="acme-search-field-group">
      {label && (
        <label className="acme-form-label">
          {label}
          {required && <span className="required-star">*</span>}
        </label>
      )}
      <div className={`acme-search-field-container ${size} ${variant} ${focused ? 'focused' : ''} ${error ? 'error' : ''} ${disabled ? 'disabled' : ''}`}>
        <div className="acme-search-field-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>
        
        <input
          ref={inputRef}
          type="text"
          className="acme-search-field-input"
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
        />
        
        {clearable && value && !disabled && (
          <button
            type="button"
            className="acme-search-field-clear"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}

        {showSuggestions && showDropdown && suggestions.length > 0 && (
          <div ref={dropdownRef} className="acme-search-field-dropdown">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                className="acme-search-field-suggestion"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <span className="suggestion-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </span>
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <span className="acme-form-error">{error}</span>}
    </div>
  );
};

export default SearchField;