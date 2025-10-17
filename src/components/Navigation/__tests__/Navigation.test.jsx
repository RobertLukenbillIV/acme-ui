import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from '../Navigation';

describe('Navigation', () => {
  const mockLinks = [
    { label: 'Home', href: '/home' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  test('renders navigation with default company name', () => {
    render(<Navigation />);
    
    // Initially collapsed, so company name should not be visible
    expect(screen.queryByText('Acme Corp')).not.toBeInTheDocument();
    
    // Should have toggle button
    expect(screen.getByRole('button', { name: /toggle navigation/i })).toBeInTheDocument();
  });

  test('renders navigation with custom company name', () => {
    render(<Navigation companyName="Test Corp" links={mockLinks} />);
    
    // Click to expand
    fireEvent.click(screen.getByRole('button', { name: /toggle navigation/i }));
    
    expect(screen.getByText('Test Corp')).toBeInTheDocument();
  });

  test('toggles navigation visibility', () => {
    render(<Navigation companyName="Test Corp" links={mockLinks} />);
    
    const toggleButton = screen.getByRole('button', { name: /toggle navigation/i });
    
    // Initially collapsed - links should not be visible
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    
    // Click to expand
    fireEvent.click(toggleButton);
    
    // Links should now be visible
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    
    // Click to collapse
    fireEvent.click(toggleButton);
    
    // Links should be hidden again
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });

  test('renders navigation links correctly', () => {
    render(<Navigation links={mockLinks} />);
    
    // Expand navigation
    fireEvent.click(screen.getByRole('button', { name: /toggle navigation/i }));
    
    // Check all links are rendered with correct hrefs
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const contactLink = screen.getByRole('link', { name: 'Contact' });
    
    expect(homeLink).toHaveAttribute('href', '/home');
    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  test('handles empty links array', () => {
    render(<Navigation links={[]} />);
    
    // Expand navigation
    fireEvent.click(screen.getByRole('button', { name: /toggle navigation/i }));
    
    // Should not crash and should not show any links
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});