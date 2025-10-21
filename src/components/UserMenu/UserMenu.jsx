import React from 'react';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import './UserMenu.css';

/**
 * UserMenu component - A specialized dropdown menu for user account actions
 * 
 * Features:
 * - User profile display with avatar and name
 * - Common user actions (Profile, Settings, Sign Out)
 * - Status indicators (online, busy, away)
 * - Role/organization display
 * - Quick actions with icons and shortcuts
 */
const UserMenu = ({
  user = {},
  placement = 'bottom-end',
  showStatus = true,
  showRole = true,
  showQuickActions = true,
  onProfileClick,
  onSettingsClick,
  onSignOutClick,
  onStatusChange,
  customActions = [],
  className = '',
  ...props
}) => {
  const {
    name = 'User',
    email = '',
    avatar = '',
    status = 'online',
    role = '',
    organization = ''
  } = user;

  // Status options
  const statusOptions = [
    { value: 'online', label: 'Online', color: '#10b981' },
    { value: 'busy', label: 'Busy', color: '#f59e0b' },
    { value: 'away', label: 'Away', color: '#6b7280' },
    { value: 'offline', label: 'Offline', color: '#ef4444' }
  ];

  const currentStatus = statusOptions.find(s => s.value === status) || statusOptions[0];

  // User avatar or initials
  const userInitials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  // Build menu items
  const menuItems = [];

  // User info header (non-clickable)
  menuItems.push({
    type: 'custom',
    content: (
      <div className="user-menu-header">
        <div className="user-avatar">
          {avatar ? (
            <img src={avatar} alt={name} className="avatar-image" />
          ) : (
            <div className="avatar-initials">{userInitials}</div>
          )}
          {showStatus && (
            <div 
              className="status-indicator" 
              style={{ backgroundColor: currentStatus.color }}
              title={currentStatus.label}
            />
          )}
        </div>
        <div className="user-info">
          <div className="user-name">{name}</div>
          {email && <div className="user-email">{email}</div>}
          {showRole && (role || organization) && (
            <div className="user-role">
              {role && organization ? `${role} at ${organization}` : role || organization}
            </div>
          )}
        </div>
      </div>
    )
  });

  // Separator after user info
  menuItems.push({ type: 'separator' });

  // Status selector if enabled
  if (showStatus && onStatusChange) {
    menuItems.push({
      label: 'Set status',
      icon: '🟢',
      children: statusOptions.map(statusOption => ({
        label: statusOption.label,
        icon: <div className="status-dot" style={{ backgroundColor: statusOption.color }} />,
        onClick: () => onStatusChange(statusOption.value),
        selected: status === statusOption.value
      }))
    });
    menuItems.push({ type: 'separator' });
  }

  // Quick actions
  if (showQuickActions) {
    menuItems.push(
      {
        label: 'Your profile',
        icon: '👤',
        onClick: onProfileClick,
        shortcut: '⌘P'
      },
      {
        label: 'Settings',
        icon: '⚙️',
        onClick: onSettingsClick,
        shortcut: '⌘,'
      }
    );
  }

  // Custom actions
  if (customActions.length > 0) {
    if (showQuickActions) {
      menuItems.push({ type: 'separator' });
    }
    menuItems.push(...customActions);
  }

  // Sign out (always last)
  menuItems.push(
    { type: 'separator' },
    {
      label: 'Sign out',
      icon: '🚪',
      onClick: onSignOutClick,
      variant: 'danger',
      shortcut: '⇧⌘Q'
    }
  );

  // User trigger button
  const trigger = (
    <button className={`user-menu-trigger ${className}`} {...props}>
      <div className="user-avatar small">
        {avatar ? (
          <img src={avatar} alt={name} className="avatar-image" />
        ) : (
          <div className="avatar-initials">{userInitials}</div>
        )}
        {showStatus && (
          <div 
            className="status-indicator" 
            style={{ backgroundColor: currentStatus.color }}
          />
        )}
      </div>
      <span className="user-name-trigger">{name}</span>
      <svg className="chevron-down" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 10L12 15L17 10H7Z"/>
      </svg>
    </button>
  );

  return (
    <DropdownMenu 
      trigger={trigger}
      items={menuItems}
      placement={placement}
      className="user-menu"
    />
  );
};

export default UserMenu;