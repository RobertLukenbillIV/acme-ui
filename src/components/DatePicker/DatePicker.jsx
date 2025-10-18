import React, { useState, useRef, useEffect } from 'react';
import './DatePicker.css';

// Utility functions for date handling
const formatDate = (date, format = 'YYYY-MM-DD') => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day);
};

const parseDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

const isDateInRange = (date, startDate, endDate) => {
  if (!date || !startDate || !endDate) return false;
  return date >= startDate && date <= endDate;
};

const getMonthDays = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  const days = [];
  
  // Previous month's trailing days
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthLastDay - i),
      isCurrentMonth: false,
      isPrevMonth: true
    });
  }
  
  // Current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      date: new Date(year, month, day),
      isCurrentMonth: true,
      isPrevMonth: false
    });
  }
  
  // Next month's leading days
  const remainingDays = 42 - days.length; // 6 rows × 7 days
  for (let day = 1; day <= remainingDays; day++) {
    days.push({
      date: new Date(year, month + 1, day),
      isCurrentMonth: false,
      isPrevMonth: false
    });
  }
  
  return days;
};

const DatePicker = ({
  label,
  value,
  onChange,
  placeholder = 'Select date...',
  format = 'YYYY-MM-DD',
  minDate,
  maxDate,
  disabled = false,
  required = false,
  error = null,
  size = 'medium',
  variant = 'default',
  showTodayButton = true,
  showClearButton = true,
  weekStartsOn = 0, // 0 = Sunday, 1 = Monday
  disabledDates = [], // Array of dates to disable
  highlightedDates = [], // Array of dates to highlight
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value ? parseDate(value) : new Date());
  const [inputValue, setInputValue] = useState(value || '');
  
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  
  const selectedDate = parseDate(value);
  const today = new Date();
  
  // Month and year for calendar view
  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const adjustedDayNames = [...dayNames.slice(weekStartsOn), ...dayNames.slice(0, weekStartsOn)];
  
  // Handle input change
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    const parsed = parseDate(newValue);
    if (parsed) {
      onChange?.(formatDate(parsed, format));
      setViewDate(parsed);
    } else if (newValue === '') {
      onChange?.('');
    }
  };
  
  // Handle date selection
  const handleDateSelect = (date) => {
    const formattedDate = formatDate(date, format);
    setInputValue(formattedDate);
    onChange?.(formattedDate);
    setIsOpen(false);
    inputRef.current?.focus();
  };
  
  // Navigate month
  const navigateMonth = (direction) => {
    setViewDate(new Date(viewYear, viewMonth + direction, 1));
  };
  
  // Navigate year
  const navigateYear = (direction) => {
    setViewDate(new Date(viewYear + direction, viewMonth, 1));
  };
  
  // Check if date is disabled
  const isDateDisabled = (date) => {
    if (minDate && date < parseDate(minDate)) return true;
    if (maxDate && date > parseDate(maxDate)) return true;
    return disabledDates.some(disabledDate => 
      isSameDay(date, parseDate(disabledDate))
    );
  };
  
  // Check if date is highlighted
  const isDateHighlighted = (date) => {
    return highlightedDates.some(highlightedDate => 
      isSameDay(date, parseDate(highlightedDate))
    );
  };
  
  // Handle today button
  const handleTodayClick = () => {
    if (!isDateDisabled(today)) {
      handleDateSelect(today);
    }
  };
  
  // Handle clear button
  const handleClearClick = () => {
    setInputValue('');
    onChange?.('');
    setIsOpen(false);
    inputRef.current?.focus();
  };
  
  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.focus();
    } else if (e.key === 'Enter' && !isOpen) {
      setIsOpen(true);
    }
  };
  
  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const monthDays = getMonthDays(viewYear, viewMonth);
  
  return (
    <div ref={containerRef} className={`acme-datepicker ${className}`}>
      {label && (
        <label className="acme-form-label">
          {label}
          {required && <span className="required-star">*</span>}
        </label>
      )}
      
      <div className={`acme-datepicker-input-container ${size} ${variant} ${isOpen ? 'open' : ''} ${error ? 'error' : ''} ${disabled ? 'disabled' : ''}`}>
        <input
          ref={inputRef}
          type="text"
          className="acme-datepicker-input"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onClick={() => !disabled && setIsOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
        />
        
        <button
          type="button"
          className="acme-datepicker-trigger"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-label="Open calendar"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </button>
      </div>
      
      {isOpen && !disabled && (
        <div className="acme-datepicker-popup">
          <div className="acme-datepicker-header">
            <button
              type="button"
              className="acme-datepicker-nav"
              onClick={() => navigateYear(-1)}
              aria-label="Previous year"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="11,17 6,12 11,7"></polyline>
                <polyline points="18,17 13,12 18,7"></polyline>
              </svg>
            </button>
            
            <button
              type="button"
              className="acme-datepicker-nav"
              onClick={() => navigateMonth(-1)}
              aria-label="Previous month"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>
            
            <div className="acme-datepicker-title">
              {monthNames[viewMonth]} {viewYear}
            </div>
            
            <button
              type="button"
              className="acme-datepicker-nav"
              onClick={() => navigateMonth(1)}
              aria-label="Next month"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>
            
            <button
              type="button"
              className="acme-datepicker-nav"
              onClick={() => navigateYear(1)}
              aria-label="Next year"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="13,17 18,12 13,7"></polyline>
                <polyline points="6,17 11,12 6,7"></polyline>
              </svg>
            </button>
          </div>
          
          <div className="acme-datepicker-calendar">
            <div className="acme-datepicker-weekdays">
              {adjustedDayNames.map(day => (
                <div key={day} className="acme-datepicker-weekday">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="acme-datepicker-days">
              {monthDays.map((dayObj, index) => {
                const { date, isCurrentMonth } = dayObj;
                const isSelected = selectedDate && isSameDay(date, selectedDate);
                const isToday = isSameDay(date, today);
                const isDisabled = isDateDisabled(date);
                const isHighlighted = isDateHighlighted(date);
                
                return (
                  <button
                    key={index}
                    type="button"
                    className={`acme-datepicker-day ${isCurrentMonth ? 'current-month' : 'other-month'} ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''} ${isDisabled ? 'disabled' : ''} ${isHighlighted ? 'highlighted' : ''}`}
                    onClick={() => !isDisabled && handleDateSelect(date)}
                    disabled={isDisabled}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="acme-datepicker-footer">
            {showTodayButton && (
              <button
                type="button"
                className="acme-datepicker-footer-btn"
                onClick={handleTodayClick}
                disabled={isDateDisabled(today)}
              >
                Today
              </button>
            )}
            
            {showClearButton && (
              <button
                type="button"
                className="acme-datepicker-footer-btn"
                onClick={handleClearClick}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}
      
      {error && <span className="acme-form-error">{error}</span>}
    </div>
  );
};

export default DatePicker;