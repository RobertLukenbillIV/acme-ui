import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserAvatarMenu from '../UserAvatarMenu';

describe('UserAvatarMenu', () => {
  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://example.com/avatar.jpg',
    role: 'Admin',
    isOnline: true
  };

  const mockMenuItems = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { type: 'divider' },
    { id: 'logout', label: 'Logout', icon: '🚪', action: 'logout' }
  ];

  const mockOnItemClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders user avatar menu', () => {
    render(<UserAvatarMenu user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('opens menu when clicked', async () => {
    const user = userEvent.setup();
    render(<UserAvatarMenu user={mockUser} menuItems={mockMenuItems} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('calls onItemClick when menu item is clicked', async () => {
    const user = userEvent.setup();
    render(<UserAvatarMenu user={mockUser} menuItems={mockMenuItems} onItemClick={mockOnItemClick} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    const profileItem = screen.getByText('Profile');
    await user.click(profileItem);
    
    expect(mockOnItemClick).toHaveBeenCalledWith(mockMenuItems[0]);
  });

  it('displays user initials when no avatar provided', () => {
    const userWithoutAvatar = { ...mockUser, avatar: null };
    render(<UserAvatarMenu user={userWithoutAvatar} />);
    
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('shows online status', () => {
    render(<UserAvatarMenu user={mockUser} showStatus={true} />);
    
    const statusElement = screen.getByLabelText('Online');
    expect(statusElement).toBeInTheDocument();
  });

  it('handles compact variant', () => {
    render(<UserAvatarMenu user={mockUser} variant="compact" />);
    
    // Name should not be visible in compact mode (until menu is opened)
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<UserAvatarMenu user={mockUser} menuItems={mockMenuItems} />);
    
    const button = screen.getByRole('button');
    button.focus();
    
    await user.keyboard('{Enter}');
    expect(screen.getByText('Profile')).toBeInTheDocument();
    
    // Check that dropdown is open by checking the class
    const dropdown = screen.getByRole('menu');
    expect(dropdown).toHaveClass('acme-user-avatar-menu-dropdown-open');
    
    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(dropdown).not.toHaveClass('acme-user-avatar-menu-dropdown-open');
    }, { timeout: 2000 });
  });
});