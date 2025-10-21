import React, { useState, useRef, useEffect } from 'react';
import './UserAvatarMenu.css';

/**
 * UserAvatarMenu component - User profile menu with avatar and actions
 * 
 * Features:
 * - User avatar with name and status display
 * - Dropdown menu with profile actions
 * - Online/offline status indicator
 * - Role badge support
 * - Keyboard navigation and accessibility
 * - Customizable menu items and actions
 */
const UserAvatarMenu = ({
  user,
  menuItems = [],
  onItemClick,
  showStatus = true,
  showRole = true,
  size = 'medium', // 'small' | 'medium' | 'large'
  variant = 'default', // 'default' | 'compact' | 'full'
  placement = 'bottom-right', // 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Default user data
  const defaultUser = {
    name: 'User',
    email: '',
    avatar: null,
    role: null,
    isOnline: false
  };

  const userData = { ...defaultUser, ...user };

  // Default menu items if none provided
  const defaultMenuItems = [
    { id: 'profile', label: 'View Profile', icon: '👤', href: '/profile' },
    { id: 'settings', label: 'Settings', icon: '⚙️', href: '/settings' },
    { type: 'divider' },
    { id: 'help', label: 'Help & Support', icon: '❓', href: '/help' },
    { type: 'divider' },
    { id: 'logout', label: 'Sign Out', icon: '🚪', action: 'logout', variant: 'danger' }
  ];

  const items = menuItems.length > 0 ? menuItems : defaultMenuItems;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      buttonRef.current?.focus();
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    } else if (event.key === 'ArrowDown' && isOpen) {
      event.preventDefault();
      const firstItem = menuRef.current?.querySelector('[role="menuitem"]:not([disabled])');
      firstItem?.focus();
    }
  };

  // Handle menu item keyboard navigation
  const handleMenuKeyDown = (event, item, index) => {
    const menuItems = menuRef.current?.querySelectorAll('[role="menuitem"]:not([disabled])');
    const currentIndex = Array.from(menuItems).indexOf(event.target);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
        menuItems[nextIndex]?.focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
        menuItems[prevIndex]?.focus();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleItemClick(item);
        break;
      case 'Escape':
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
    }
  };

  // Handle menu item clicks
  const handleItemClick = (item) => {
    if (item.type === 'divider' || item.disabled) return;

    // Close menu first
    setIsOpen(false);

    // Call custom handler if provided
    if (onItemClick) {
      onItemClick(item);
    }

    // Handle built-in actions
    if (item.action) {
      switch (item.action) {
        case 'logout':
          // Handle logout - you might want to call a logout function here
          console.log('Logging out...');
          break;
        default:
          console.log(`Action: ${item.action}`);
      }
    }

    // Handle navigation
    if (item.href && !item.action) {
      window.location.href = item.href;
    }
  };

  // Get user initials for fallback avatar
  const getUserInitials = () => {
    if (!userData.name) return 'U';
    return userData.name
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate class names
  const buttonClasses = [
    'acme-user-avatar-menu',
    `acme-user-avatar-menu-${size}`,
    `acme-user-avatar-menu-${variant}`,
    isOpen && 'acme-user-avatar-menu-open',
    className
  ].filter(Boolean).join(' ');

  const menuClasses = [
    'acme-user-avatar-menu-dropdown',
    `acme-user-avatar-menu-dropdown-${placement}`,
    isOpen && 'acme-user-avatar-menu-dropdown-open'
  ].filter(Boolean).join(' ');

  return (
    <div className={buttonClasses} ref={menuRef} {...props}>
      <button
        ref={buttonRef}
        className="acme-user-avatar-menu-button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`User menu for ${userData.name}`}
      >
        {/* Avatar */}
        <div className="acme-user-avatar-menu-avatar">
          {userData.avatar ? (
            <img
              src={userData.avatar}
              alt={userData.name}
              className="acme-user-avatar-menu-image"
            />
          ) : (
            <div className="acme-user-avatar-menu-initials">
              {getUserInitials()}
            </div>
          )}
          {showStatus && (
            <div 
              className={`acme-user-avatar-menu-status ${userData.isOnline ? 'online' : 'offline'}`}
              aria-label={userData.isOnline ? 'Online' : 'Offline'}
            />
          )}
        </div>

        {/* User Info (for non-compact variants) */}
        {variant !== 'compact' && (
          <div className="acme-user-avatar-menu-info">
            <div className="acme-user-avatar-menu-name">
              {userData.name}
              {showRole && userData.role && (
                <span className="acme-user-avatar-menu-role">{userData.role}</span>
              )}
            </div>
            {variant === 'full' && userData.email && (
              <div className="acme-user-avatar-menu-email">{userData.email}</div>
            )}
          </div>
        )}

        {/* Dropdown Arrow */}
        <div className="acme-user-avatar-menu-arrow">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="currentColor"
            className={`acme-user-avatar-menu-arrow-icon ${isOpen ? 'rotated' : ''}`}
          >
            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>

      {/* Dropdown Menu */}
      <div className={menuClasses} role="menu" aria-labelledby="user-menu-button">
        {/* Menu Header (for compact variant when menu is open) */}
        {variant === 'compact' && isOpen && (
          <div className="acme-user-avatar-menu-header">
            <div className="acme-user-avatar-menu-header-avatar">
              {userData.avatar ? (
                <img src={userData.avatar} alt={userData.name} />
              ) : (
                <div className="acme-user-avatar-menu-initials">
                  {getUserInitials()}
                </div>
              )}
            </div>
            <div className="acme-user-avatar-menu-header-info">
              <div className="acme-user-avatar-menu-header-name">
                {userData.name}
                {showStatus && (
                  <span className={`acme-user-avatar-menu-status-dot ${userData.isOnline ? 'online' : 'offline'}`} />
                )}
              </div>
              {userData.email && (
                <div className="acme-user-avatar-menu-header-email">{userData.email}</div>
              )}
              {showRole && userData.role && (
                <div className="acme-user-avatar-menu-header-role">{userData.role}</div>
              )}
            </div>
          </div>
        )}

        {/* Menu Items */}
        <div className="acme-user-avatar-menu-items">
          {items.map((item, index) => {
            if (item.type === 'divider') {
              return (
                <div
                  key={`divider-${index}`}
                  className="acme-user-avatar-menu-divider"
                  role="separator"
                />
              );
            }

            return (
              <button
                key={item.id || index}
                className={`acme-user-avatar-menu-item ${item.variant || ''} ${item.disabled ? 'disabled' : ''}`}
                role="menuitem"
                tabIndex={isOpen ? 0 : -1}
                disabled={item.disabled}
                onClick={() => handleItemClick(item)}
                onKeyDown={(e) => handleMenuKeyDown(e, item, index)}
              >
                {item.icon && (
                  <span className="acme-user-avatar-menu-item-icon">{item.icon}</span>
                )}
                <span className="acme-user-avatar-menu-item-label">{item.label}</span>
                {item.badge && (
                  <span className="acme-user-avatar-menu-item-badge">{item.badge}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserAvatarMenu;