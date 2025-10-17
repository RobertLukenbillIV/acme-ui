import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TabbedCard from '../TabbedCard';

describe('TabbedCard', () => {
  const mockTabs = [
    {
      label: 'Tab 1',
      content: <div>Content 1</div>
    },
    {
      label: 'Tab 2',
      content: <div>Content 2</div>
    },
    {
      label: 'Tab 3',
      content: <div>Content 3</div>
    }
  ];

  test('renders tabbed card with tabs and content', () => {
    render(<TabbedCard tabs={mockTabs} />);
    
    // Check tabs are rendered
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
    
    // Check first tab content is shown by default
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
  });

  test('renders with title when provided', () => {
    render(<TabbedCard title="Test Tabbed Card" tabs={mockTabs} />);
    
    expect(screen.getByText('Test Tabbed Card')).toBeInTheDocument();
  });

  test('switches tabs when clicked', async () => {
    const user = userEvent.setup();
    render(<TabbedCard tabs={mockTabs} />);
    
    // Initially shows first tab content
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    
    // Click second tab
    await user.click(screen.getByText('Tab 2'));
    
    // Should show second tab content
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  test('calls onTabChange callback when tab is switched', async () => {
    const mockOnTabChange = jest.fn();
    const user = userEvent.setup();
    
    render(<TabbedCard tabs={mockTabs} onTabChange={mockOnTabChange} />);
    
    await user.click(screen.getByText('Tab 2'));
    
    expect(mockOnTabChange).toHaveBeenCalledWith(1, mockTabs[1]);
  });

  test('respects defaultTab prop', () => {
    render(<TabbedCard tabs={mockTabs} defaultTab={1} />);
    
    // Should show second tab content initially
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  test('renders tabs with icons', () => {
    const tabsWithIcons = [
      { label: 'Home', icon: '🏠', content: <div>Home content</div> },
      { label: 'Settings', icon: '⚙️', content: <div>Settings content</div> }
    ];
    
    render(<TabbedCard tabs={tabsWithIcons} />);
    
    expect(screen.getByText('🏠')).toBeInTheDocument();
    expect(screen.getByText('⚙️')).toBeInTheDocument();
  });

  test('renders tabs with badges', () => {
    const tabsWithBadges = [
      { label: 'Messages', badge: '5', content: <div>Messages content</div> },
      { label: 'Notifications', badge: 12, content: <div>Notifications content</div> }
    ];
    
    render(<TabbedCard tabs={tabsWithBadges} />);
    
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  test('handles disabled tabs', async () => {
    const tabsWithDisabled = [
      { label: 'Active', content: <div>Active content</div> },
      { label: 'Disabled', content: <div>Disabled content</div>, disabled: true }
    ];
    
    const user = userEvent.setup();
    render(<TabbedCard tabs={tabsWithDisabled} />);
    
    const disabledTab = screen.getByText('Disabled').closest('button');
    expect(disabledTab).toBeDisabled();
    
    // Try to click disabled tab - should not switch
    await user.click(disabledTab);
    expect(screen.getByText('Active content')).toBeInTheDocument();
    expect(screen.queryByText('Disabled content')).not.toBeInTheDocument();
  });

  test('renders tab titles and footers', () => {
    const tabsWithTitleAndFooter = [
      {
        label: 'Tab 1',
        title: 'Tab 1 Title',
        content: <div>Tab 1 content</div>,
        footer: <div>Tab 1 footer</div>
      }
    ];
    
    render(<TabbedCard tabs={tabsWithTitleAndFooter} />);
    
    expect(screen.getByText('Tab 1 Title')).toBeInTheDocument();
    expect(screen.getByText('Tab 1 footer')).toBeInTheDocument();
  });

  test('applies variant classes', () => {
    const { container } = render(<TabbedCard tabs={mockTabs} variant="compact" />);
    
    expect(container.querySelector('.acme-tabbed-card')).toHaveClass('compact');
  });

  test('applies custom className', () => {
    const { container } = render(<TabbedCard tabs={mockTabs} className="custom-class" />);
    
    expect(container.firstChild).toHaveClass('acme-tabbed-card');
    expect(container.firstChild).toHaveClass('custom-class');
  });

  test('handles empty tabs array', () => {
    render(<TabbedCard tabs={[]} />);
    
    expect(document.querySelector('.acme-tabbed-card')).toBeInTheDocument();
    expect(screen.getByText('No tabs provided')).toBeInTheDocument();
  });

  test('handles keyboard navigation with tab key', async () => {
    const user = userEvent.setup();
    render(<TabbedCard tabs={mockTabs} />);
    
    const firstTab = screen.getByText('Tab 1').closest('button');
    const secondTab = screen.getByText('Tab 2').closest('button');
    
    firstTab.focus();
    expect(firstTab).toHaveFocus();
    
    // Press tab to move to next tab button
    await user.keyboard('{Tab}');
    expect(secondTab).toHaveFocus();
  });

  test('tab buttons have correct classes', () => {
    render(<TabbedCard tabs={mockTabs} />);
    
    const firstTab = screen.getByText('Tab 1').closest('button');
    const secondTab = screen.getByText('Tab 2').closest('button');
    
    expect(firstTab).toHaveClass('tab-button', 'active');
    expect(secondTab).toHaveClass('tab-button');
    expect(secondTab).not.toHaveClass('active');
  });

  test('tab content has correct structure', () => {
    render(<TabbedCard tabs={mockTabs} />);
    
    const tabContent = document.querySelector('.tabbed-card-content');
    expect(tabContent).toBeInTheDocument();
    
    const tabBody = document.querySelector('.tab-content-body');
    expect(tabBody).toBeInTheDocument();
  });
});