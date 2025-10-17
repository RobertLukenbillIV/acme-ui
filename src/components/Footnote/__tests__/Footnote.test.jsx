import React from 'react';
import { render, screen } from '@testing-library/react';
import Footnote from '../Footnote';

describe('Footnote', () => {
  const mockSocialLinks = [
    { href: 'https://facebook.com', label: 'Facebook', icon: '📘' },
    { href: 'https://twitter.com', label: 'Twitter', icon: '🐦' }
  ];

  const mockPageLinks = [
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
    { href: '/about', label: 'About' }
  ];

  test('renders footnote with content', () => {
    const content = <p>This is footer content</p>;
    
    render(<Footnote content={content} />);
    
    expect(screen.getByText('This is footer content')).toBeInTheDocument();
  });

  test('renders social media links', () => {
    render(<Footnote socialLinks={mockSocialLinks} />);
    
    const facebookLink = screen.getByRole('link', { name: /facebook/i });
    const twitterLink = screen.getByRole('link', { name: /twitter/i });
    
    expect(facebookLink).toHaveAttribute('href', 'https://facebook.com');
    expect(facebookLink).toHaveAttribute('target', '_blank');
    expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com');
    expect(twitterLink).toHaveAttribute('target', '_blank');
  });

  test('renders page links', () => {
    render(<Footnote pageLinks={mockPageLinks} />);
    
    expect(screen.getByRole('link', { name: 'Privacy' })).toHaveAttribute('href', '/privacy');
    expect(screen.getByRole('link', { name: 'Terms' })).toHaveAttribute('href', '/terms');
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
  });

  test('renders complete footnote with all elements', () => {
    const content = <p>Footer content</p>;
    
    render(
      <Footnote 
        content={content}
        socialLinks={mockSocialLinks}
        pageLinks={mockPageLinks}
      />
    );
    
    expect(screen.getByText('Footer content')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /facebook/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /twitter/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Privacy' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Terms' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
  });

  test('applies custom className and variant', () => {
    const { container } = render(<Footnote className="custom-footer" variant="card" />);
    
    expect(container.firstChild).toHaveClass('acme-footnote');
    expect(container.firstChild).toHaveClass('custom-footer');
    expect(container.firstChild).toHaveClass('card');
  });

  test('defaults to footer variant', () => {
    const { container } = render(<Footnote />);
    
    expect(container.firstChild).toHaveClass('acme-footnote');
    expect(container.firstChild).toHaveClass('footer');
  });

  test('renders empty footnote', () => {
    render(<Footnote />);
    
    expect(document.querySelector('.acme-footnote')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});