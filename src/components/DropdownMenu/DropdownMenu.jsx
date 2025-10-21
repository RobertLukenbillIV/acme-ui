import React, { useState, useRef, useEffect } from 'react';
import './DropdownMenu.css';

const DropdownMenuItem = ({ 
  label, 
  href, 
  onClick, 
  icon, 
  disabled = false, 
  danger = false,
  shortcut,
  children,
  separator = false 
}) => {
  if (separator) {
    return <div className="dropdown-separator" role="separator" />;
  }

  const itemClass = `dropdown-item ${disabled ? 'disabled' : ''} ${danger ? 'danger' : ''}`;
  
  const content = (
    <>
      {icon && <span className="dropdown-icon">{icon}</span>}
      <span className="dropdown-label">{label}</span>
      {shortcut && <span className="dropdown-shortcut">{shortcut}</span>}
      {children && <span className="dropdown-chevron">›</span>}
    </>
  );

  if (disabled) {
    return (
      <div className={itemClass} role="menuitem" aria-disabled="true">
        {content}
      </div>
    );
  }

  if (href) {
    return (
      <a href={href} className={itemClass} role="menuitem" onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button className={itemClass} role="menuitem" onClick={onClick} type="button">
      {content}
    </button>
  );
};

const DropdownMenu = ({ 
  trigger,
  items = [],
  placement = 'bottom-start', // 'bottom-start', 'bottom-end', 'top-start', 'top-end', 'left', 'right'
  offset = [0, 4],
  closeOnSelect = true,
  disabled = false,
  className = '',
  onOpenChange,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    if (disabled) return;
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    setFocusedIndex(-1);
    onOpenChange?.(newIsOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setFocusedIndex(-1);
    onOpenChange?.(false);
    triggerRef.current?.focus();
  };

  const handleItemClick = (item, index) => {
    if (item.onClick) {
      item.onClick();
    }
    if (closeOnSelect && !item.children) {
      closeMenu();
    }
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    const focusableItems = items.filter(item => !item.separator && !item.disabled);

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        closeMenu();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev < focusableItems.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : focusableItems.length - 1
        );
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < focusableItems.length) {
          handleItemClick(focusableItems[focusedIndex], focusedIndex);
        }
        break;
      case 'Tab':
        closeMenu();
        break;
    }
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        triggerRef.current &&
        menuRef.current &&
        !triggerRef.current.contains(event.target) &&
        !menuRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const placementClass = `placement-${placement}`;

  return (
    <div className={`acme-dropdown ${className}`} {...props}>
      <div
        ref={triggerRef}
        className="dropdown-trigger"
        onClick={toggleMenu}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-disabled={disabled}
      >
        {trigger}
      </div>
      
      {isOpen && (
        <div
          ref={menuRef}
          className={`dropdown-menu ${placementClass}`}
          role="menu"
          aria-orientation="vertical"
        >
          {items.map((item, index) => {
            const focusableIndex = items.slice(0, index).filter(i => !i.separator && !i.disabled).length;
            return (
              <DropdownMenuItem
                key={index}
                {...item}
                onClick={() => handleItemClick(item, index)}
                className={focusedIndex === focusableIndex ? 'focused' : ''}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;